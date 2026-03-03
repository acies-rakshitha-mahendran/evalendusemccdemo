// src/present/InputsRenderer.tsx
import React, { useEffect, useMemo, useState } from "react";
import { VAD_INPUT_CONFIGS } from "../vadInputs";
import type { VADInputValue } from "../evalContext";

interface InputsRendererProps {
  vadNames: string[]; // List of VAD names to render
  onInputsChange?: (inputs: VADInputValue) => void;
  initialInputs?: VADInputValue;
}

const buildSeedInputs = (vadNames: string[], base?: VADInputValue): VADInputValue => {
  const next: VADInputValue = {};
  vadNames.forEach((vadName) => {
    const config = VAD_INPUT_CONFIGS[vadName];
    const existing = base?.[vadName] ?? {};
    next[vadName] = {};
    if (config) {
      config.fields.forEach((field, idx) => {
        const prevEntry = existing[idx];
        next[vadName][idx] = {
          value: prevEntry?.value ?? "",
          uom: prevEntry?.uom ?? field.defaultUOM ?? "$",
        };
      });
    }
  });
  return next;
};

export const InputsRenderer: React.FC<InputsRendererProps> = ({ vadNames, onInputsChange, initialInputs }) => {
  const initialSeed = useMemo(() => buildSeedInputs(vadNames, initialInputs), [vadNames, initialInputs]);
  const [inputs, setInputs] = useState<VADInputValue>(initialSeed);

  // Keep inputs stable across tab switches and VAD selection changes.
  useEffect(() => {
    setInputs((prev) => buildSeedInputs(vadNames, initialInputs ?? prev));
  }, [vadNames, initialInputs]);

  const handleValueChange = (vadName: string, fieldIndex: number, value: string | number) => {
    setInputs((prev) => {
      const updated: VADInputValue = { ...prev };
      updated[vadName] = { ...(updated[vadName] ?? {}) };
      updated[vadName][fieldIndex] = { ...(updated[vadName][fieldIndex] ?? { value: "", uom: "$" }) };
      updated[vadName][fieldIndex].value = value;
      onInputsChange?.(updated);
      return updated;
    });
  };

  const handleUOMChange = (vadName: string, fieldIndex: number, uom: string) => {
    setInputs((prev) => {
      const updated: VADInputValue = { ...prev };
      updated[vadName] = { ...(updated[vadName] ?? {}) };
      updated[vadName][fieldIndex] = { ...(updated[vadName][fieldIndex] ?? { value: "", uom: "$" }) };
      updated[vadName][fieldIndex].uom = uom;
      onInputsChange?.(updated);
      return updated;
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  } as const;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "60rem",
        margin: "0 auto",
      }}
    >
      {vadNames.map((vadName) => {
        const config = VAD_INPUT_CONFIGS[vadName];
        if (!config) return null;

        return (
          <div key={vadName} className="glass-card" style={{ padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "0.75rem", color: "#55883B" }}>
              {vadName}
            </div>

            {config.fields.map((field, fieldIndex) => (
              <div key={`${vadName}-${fieldIndex}`} style={{ marginBottom: "0.9rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    marginBottom: "0.35rem",
                    fontWeight: 500,
                  }}
                >
                  {field.label}
                </label>
                {field.description && (
                  <p
                    style={{
                      margin: "0 0 0.4rem 0",
                      fontSize: "11px",
                      color: "var(--text-muted, #6b7280)",
                      lineHeight: 1.4,
                      maxWidth: "42rem",
                    }}
                  >
                    {field.description}
                  </p>
                )}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="number"
                    placeholder={field.placeholder}
                    value={inputs[vadName]?.[fieldIndex]?.value || ""}
                    onChange={(e) => handleValueChange(vadName, fieldIndex, e.target.value)}
                    style={{
                      ...inputStyle,
                      flex: 1,
                    }}
                  />

                  {field.options && (
                    <select
                      value={inputs[vadName]?.[fieldIndex]?.uom || field.defaultUOM || "$"}
                      onChange={(e) => handleUOMChange(vadName, fieldIndex, e.target.value)}
                      style={{
                        ...inputStyle,
                        flex: 1,
                      }}
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
