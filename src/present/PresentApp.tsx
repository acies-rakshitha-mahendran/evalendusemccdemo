// src/present/PresentApp.tsx
import React, { useEffect, useMemo, useState } from "react";
import { loadBuildConfig } from "../api";
import type { ProjectBuildConfig, ThemeConfig } from "../types";
import { HomePage } from "./HomePage";
import { InputPage } from "./InputPage";
import { ResultsPage } from "./ResultsPage";
import type { VADInputValue } from "../evalContext";
import { detectSelectedVADsFromLayout } from "../vadSelection";
import { VAD_INPUT_CONFIGS } from "../vadInputs";
import { usePersistentState } from "../hooks/usePersistentState";

type PresentTab = "home" | "vads" | "results";

// Apply theme to document
const applyTheme = (theme: ThemeConfig | null) => {
  if (!theme) return;
  const body = document.body;
  
  if (theme.mode === "light") {
    body.removeAttribute("data-theme");
    body.style.backgroundColor = "#f5f5f5";
    body.style.color = "#000000";
  } else {
    body.setAttribute("data-theme", "dark");
    body.style.backgroundColor = "#1a1a1a";
    body.style.color = "#ffffff";
  }
  
  // Remove old style if it exists
  const existingStyle = document.getElementById("theme-style");
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Create and inject CSS rule for canvas frames
  const styleEl = document.createElement("style");
  styleEl.id = "theme-style";
  
  if (theme.mode === "light") {
    styleEl.textContent = `
      .canvas-frame {
        background-color: #ffffff !important;
      }
      .canvas-frame input,
      .canvas-frame textarea,
      .canvas-frame select {
        background-color: #f5f5f5 !important;
        color: #000000 !important;
        border-color: rgba(85, 136, 59, 0.2) !important;
      }
    `;
  } else {
    styleEl.textContent = `
      .canvas-frame {
        background-color: #2a2a2a !important;
      }
      .canvas-frame input,
      .canvas-frame textarea,
      .canvas-frame select {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
        border-color: rgba(85, 136, 59, 0.3) !important;
      }
    `;
  }
  
  document.head.appendChild(styleEl);
};

export const PresentApp: React.FC = () => {
  const [active, setActive] = useState<PresentTab>("home");
  const [config, setConfig] = useState<ProjectBuildConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Record<string, number> | null>(null);
  // Raw inputs coming from the InputsRenderer (keyed by VAD name and field index)
  const [inputValues, setInputValues] = usePersistentState<VADInputValue>("vad-inputs", {});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get("projectId") ?? "demo-project";
    loadBuildConfig(pid).then((c) => {
      setConfig(c);
      if (c?.theme) {
        applyTheme(c.theme);
      }
      setLoading(false);
    });
  }, []);

  const theme: ThemeConfig | null = config?.theme ?? null;
  const homeLayout = config?.homeLayout ?? null;
  const vadLayout = config?.vadLayout ?? null;
  const resultsLayout = config?.resultsLayout ?? null;

  const selectedVADs = useMemo(() => {
    const fromLayout = detectSelectedVADsFromLayout(vadLayout);
    return fromLayout.length ? fromLayout : Object.keys(VAD_INPUT_CONFIGS);
  }, [vadLayout]);

  // Simple helper to safely extract a number from InputsRenderer's structure
  const getFieldNumber = (
    fields: { [fieldIndex: number]: { value: string | number; uom: string } },
    index: number
  ): number => {
    const entry = fields[index];
    if (!entry) return 0;
    const raw = entry.value;
    const n = typeof raw === "number" ? raw : parseFloat(String(raw ?? ""));
    return isNaN(n) ? 0 : n;
  };

  const calculateResultsFromInputs = (values: VADInputValue): Record<string, number> | null => {
    if (!values || Object.keys(values).length === 0) return null;

    const res: Record<string, number> = {};

    Object.entries(values).forEach(([vadName, fields]) => {
      const f = fields as { [fieldIndex: number]: { value: string | number; uom: string } };
      let total = 0;

      // Per‑VAD formulas based on the provided Excel spec
      switch (vadName) {
        case "Increased Value of Recycled Plastic": {
          // Value = Annual Procurred Plastic Tonnage * (Old Plastic Waste % - New Plastic Waste %) * Price per Ton
          const totalPlastic = getFieldNumber(f, 0);
          const oldWastePct = getFieldNumber(f, 1);
          const newWastePct = getFieldNumber(f, 2);
          const pricePerTon = getFieldNumber(f, 3);
          const deltaPct = (oldWastePct - newWastePct) / 100;
          total = totalPlastic * deltaPct * pricePerTon;
          break;
        }

        case "Lower Freight Costs": {
          // Value = ((Current Weight of Plastic - New Pallet Weight) * Total Pallets) * Freight Cost per lb
          const oldWeight = getFieldNumber(f, 0);
          const newWeight = getFieldNumber(f, 1);
          const totalPallets = getFieldNumber(f, 2);
          const freightCost = getFieldNumber(f, 3);
          total = (oldWeight - newWeight) * totalPallets * freightCost;
          break;
        }

        case "Increased Factory Uptime": {
          // Value = (Current Production Line Stops - New Machine Stops) * Avg minutes per Stop * Cost of Downtime per Min
          const oldStops = getFieldNumber(f, 0);
          const newStops = getFieldNumber(f, 1);
          const minutesPerStop = getFieldNumber(f, 2);
          const downtimeCostPerMinute = getFieldNumber(f, 3);
          total = (oldStops - newStops) * minutesPerStop * downtimeCostPerMinute;
          break;
        }

        case "Lower Environmental Taxes": {
          // Value = Annual Procurred Plastic Tonnage * (Old Tax Rate - New Tax Rate)
          const plasticWeight = getFieldNumber(f, 0);
          const oldRate = getFieldNumber(f, 1);
          const newRate = getFieldNumber(f, 2);
          total = plasticWeight * (oldRate - newRate);
          break;
        }

        case "recycLABEL Implementation Cost (Subtractive)": {
          // (Target Price per 1000 labels - Baseline Price per 1000 labels) * (Annual Procurred Label Volume / 1000) + R&D Testing Fees
          const baselinePrice = getFieldNumber(f, 0);
          const targetPrice = getFieldNumber(f, 1);
          const annualVolume = getFieldNumber(f, 2);
          const rdFees = getFieldNumber(f, 3);
          total = (targetPrice - baselinePrice) * (annualVolume / 1000) + rdFees;
          break;
        }

        default: {
          // Fallback: sum all numeric fields
          total = Object.values(f).reduce((acc, field) => {
            const raw = field.value;
            const n =
              typeof raw === "number" ? raw : parseFloat(String(raw ?? ""));
            return acc + (isNaN(n) ? 0 : n);
          }, 0);
          break;
        }
      }

      res[vadName] = total;
    });

    // Aggregate headline metrics (these keys match the default ResultCard labels)
    const totalAnnualValue = Object.values(res).reduce((acc, n) => acc + (Number.isFinite(n) ? n : 0), 0);
    const totalInvestments = totalAnnualValue * 0.3; // demo assumption
    const netBenefit = totalAnnualValue - totalInvestments;
    const roi = totalInvestments === 0 ? 0 : netBenefit / totalInvestments;

    return {
      ...res,
      "Total Annual Value": totalAnnualValue,
      "Total Investments": totalInvestments,
      "Net Benefit (Year 1)": netBenefit,
      ROI: roi,
    };
  };

  const handleCalculate = () => {
    if (!inputValues || Object.keys(inputValues).length === 0) {
      return;
    }

    const computed = calculateResultsFromInputs(inputValues);
    setResults(computed);
    setActive("results");
  };

  // If results are already being shown, keep them live as inputs are edited.
  useEffect(() => {
    if (!results && active !== "results") return;
    const computed = calculateResultsFromInputs(inputValues);
    if (computed) setResults(computed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues]);

  if (loading) {
    return (
      <div className="present-shell">
        <div style={{ padding: 24 }}>Loading build config…</div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="present-shell">
        <div style={{ padding: 24 }}>
          No build configuration found. Publish from the Build app.
        </div>
      </div>
    );
  }

  const bg = theme?.background ?? "#020617";
  const text = theme?.text ?? "#e5e7eb";

  const tab = (id: PresentTab, label: string) => {
    const activeTab = active === id;
    return (
      <button
        key={id}
        className={`nav-tab ${activeTab ? "active" : ""}`}
        onClick={() => {
          if (id === "results") {
            const computed = calculateResultsFromInputs(inputValues);
            if (computed) setResults(computed);
          }
          setActive(id);
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className="present-shell"
      style={{
        background: bg,
        color: text,
      }}
    >
      <div
        style={{
          padding: "0.5rem 0.75rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div className="nav-tabs">
          {tab("home", "Home")}
          {tab("vads", "Inputs")}
          {tab("results", "Results")}
        </div>
      </div>

      {active === "home" && <HomePage layout={homeLayout} />}
      {active === "vads" && (
        <InputPage
          vadNames={selectedVADs}
          onCalculate={handleCalculate}
          // Capture live input changes from the InputsRenderer so we can calculate later
          onInputsChange={setInputValues}
          initialInputs={inputValues}
        />
      )}
      {active === "results" && (
        <ResultsPage
          results={results}
          layout={resultsLayout}
          selectedVADs={selectedVADs}
          inputs={inputValues}
        />
      )}
    </div>
  );
};
