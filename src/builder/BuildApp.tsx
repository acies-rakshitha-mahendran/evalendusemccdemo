import React, { useEffect, useMemo, useState } from "react";
import { loadBuildConfig, saveBuildConfig } from "../api";
import type { ProjectBuildConfig, CraftLayout, ThemeConfig } from "../types";
import { defaultTheme, lightTheme, darkTheme } from "../theme";
import { HomeBuilderPage } from "./HomeBuilderPage";
import { VadBuilderPage } from "./VadBuilderPage";
import { ResultsBuilderPage } from "./ResultsBuilderPage";
import { detectSelectedVADsFromLayout } from "../vadSelection";
import { useNavigate } from "react-router-dom";
import { useBootstrap } from "../BootstrapContext";

const DEMO_PROJECT_ID = "demo-project";

const applyTheme = (theme: ThemeConfig) => {
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

  const existingStyle = document.getElementById("theme-style");
  if (existingStyle) {
    existingStyle.remove();
  }

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

export const BuildApp: React.FC = () => {
  const navigate = useNavigate();
  const { isBootstrapReady } = useBootstrap();
  const [active, setActive] = useState<"home" | "vads" | "results">("home");
  const [homeData, setHomeData] = useState<CraftLayout>(null);
  const [vadData, setVadData] = useState<CraftLayout>(null);
  const [resultsData, setResultsData] = useState<CraftLayout>(null);
  const [homeHistory, setHomeHistory] = useState<CraftLayout[]>([]);
  const [homeFuture, setHomeFuture] = useState<CraftLayout[]>([]);
  const [vadHistory, setVadHistory] = useState<CraftLayout[]>([]);
  const [vadFuture, setVadFuture] = useState<CraftLayout[]>([]);
  const [resultsHistory, setResultsHistory] = useState<CraftLayout[]>([]);
  const [resultsFuture, setResultsFuture] = useState<CraftLayout[]>([]);
  const [theme, setTheme] = useState(defaultTheme);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Load persisted build config (and default-seeded config from bootstrapper) on first mount.
  useEffect(() => {
    loadBuildConfig(DEMO_PROJECT_ID).then((cfg) => {
      if (!cfg) return;
      setTheme(cfg.theme ?? defaultTheme);
      setHomeData(cfg.homeLayout ?? null);
      setVadData(cfg.vadLayout ?? null);
      setResultsData(cfg.resultsLayout ?? null);
    });
  }, []);

  // Reload config after bootstrap is complete (seed layouts have been saved)
  useEffect(() => {
    if (!isBootstrapReady) return;
    loadBuildConfig(DEMO_PROJECT_ID).then((cfg) => {
      if (!cfg) return;
      setTheme(cfg.theme ?? defaultTheme);
      setHomeData(cfg.homeLayout ?? null);
      setVadData(cfg.vadLayout ?? null);
      setResultsData(cfg.resultsLayout ?? null);
    });
  }, [isBootstrapReady]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const isPageBuilt = (data: CraftLayout) => !!data;

  const canPublish = useMemo(
    () => isPageBuilt(homeData) && isPageBuilt(vadData) && isPageBuilt(resultsData),
    [homeData, vadData, resultsData]
  );

  const selectedVADs = useMemo(() => detectSelectedVADsFromLayout(vadData), [vadData]);

  const persistConfig = async () => {
    const cfg: ProjectBuildConfig = {
      projectId: DEMO_PROJECT_ID,
      theme,
      homeLayout: homeData,
      vadLayout: vadData,
      resultsLayout: resultsData,
    };
    await saveBuildConfig(cfg);
  };

  // Auto-persist edits so switching Build/Preview or reload keeps changes.
  useEffect(() => {
    const t = window.setTimeout(() => {
      void persistConfig();
    }, 500);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, homeData, vadData, resultsData]);

  const pushHistory = (
    page: "home" | "vads" | "results",
    prev: CraftLayout | null
  ) => {
    const trim = (arr: CraftLayout[]) => (arr.length > 20 ? arr.slice(arr.length - 20) : arr);
    if (page === "home") {
      setHomeHistory((h) => trim([...h, prev]));
      setHomeFuture([]);
    } else if (page === "vads") {
      setVadHistory((h) => trim([...h, prev]));
      setVadFuture([]);
    } else {
      setResultsHistory((h) => trim([...h, prev]));
      setResultsFuture([]);
    }
  };

  const handleUndo = () => {
    if (active === "home") {
      setHomeHistory((hist) => {
        if (!hist.length) return hist;
        const prev = hist[hist.length - 1];
        setHomeFuture((f) => [homeData, ...f]);
        setHomeData(prev);
        return hist.slice(0, -1);
      });
    } else if (active === "vads") {
      setVadHistory((hist) => {
        if (!hist.length) return hist;
        const prev = hist[hist.length - 1];
        setVadFuture((f) => [vadData, ...f]);
        setVadData(prev);
        return hist.slice(0, -1);
      });
    } else {
      setResultsHistory((hist) => {
        if (!hist.length) return hist;
        const prev = hist[hist.length - 1];
        setResultsFuture((f) => [resultsData, ...f]);
        setResultsData(prev);
        return hist.slice(0, -1);
      });
    }
  };

  const handleRedo = () => {
    if (active === "home") {
      setHomeFuture((future) => {
        if (!future.length) return future;
        const [next, ...rest] = future;
        setHomeHistory((h) => [...h, homeData]);
        setHomeData(next);
        return rest;
      });
    } else if (active === "vads") {
      setVadFuture((future) => {
        if (!future.length) return future;
        const [next, ...rest] = future;
        setVadHistory((h) => [...h, vadData]);
        setVadData(next);
        return rest;
      });
    } else {
      setResultsFuture((future) => {
        if (!future.length) return future;
        const [next, ...rest] = future;
        setResultsHistory((h) => [...h, resultsData]);
        setResultsData(next);
        return rest;
      });
    }
  };

  const canUndo =
    (active === "home" && homeHistory.length > 0) ||
    (active === "vads" && vadHistory.length > 0) ||
    (active === "results" && resultsHistory.length > 0);

  const canRedo =
    (active === "home" && homeFuture.length > 0) ||
    (active === "vads" && vadFuture.length > 0) ||
    (active === "results" && resultsFuture.length > 0);

  const handleSave = async () => {
    setSaving(true);
    await persistConfig();
    setSaving(false);
  };

  const handlePublish = async () => {
    if (!canPublish) return;
    setPublishing(true);
    await persistConfig();
    setPublishing(false);
    navigate(`/present?projectId=${DEMO_PROJECT_ID}`);
  };

  const handleThemeChange = (mode: "light" | "dark") => {
    if (mode === "light") {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  };

  const getViewportWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      case "desktop":
      default:
        return "100%";
    }
  };

  const steps: { id: "home" | "vads" | "results"; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "vads", label: "Inputs" },
    { id: "results", label: "Results" },
  ];

  // Previously the progress indicator marked a step complete simply if a layout existed,
  // which meant freshly seeded/default pages showed as "complete" immediately. The user
  // wanted the checkmark only once they actually made a change (dragged a component, edited
  // text, etc.). We can infer that from the history arrays maintained for undo/redo – the
  // first time a page is edited we push the previous layout into history. So a non-empty
  // history means the user interacted with the page.
  // NOTE: Progress map removed - all steps are now always clickable buttons
  const isStepCompleted = (id: "home" | "vads" | "results") => {
    return true; // Always show as completed for button styling
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      <div
        style={{
          padding: "0.5rem 0.75rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div className="builder-steps">
          {steps.map((step, index) => {
            const isActive = active === step.id;
            const isCompleted = isStepCompleted(step.id);
            const isClickable = true; // All steps are now always clickable
            return (
              <div key={step.id} className="builder-step-wrapper">
                <button
                  type="button"
                  className={[
                    "builder-step",
                    isActive ? "builder-step-active" : "",
                    "builder-step-clickable", // Always clickable now
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    if (isClickable) setActive(step.id);
                  }}
                  title="Click to edit this step"
                >
                  <span className="builder-step-index">
                    {index + 1}
                  </span>
                  <span className="builder-step-label">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={[
                      "builder-step-connector",
                      "builder-step-connector-active", // Always active now
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <button
              className="glass-button secondary"
              onClick={handleUndo}
              disabled={!canUndo}
              style={{ padding: "0.35rem 0.6rem", fontSize: "11px", opacity: canUndo ? 1 : 0.5 }}
              title="Undo last change on this screen"
            >
              ↺
            </button>
            <button
              className="glass-button secondary"
              onClick={handleRedo}
              disabled={!canRedo}
              style={{ padding: "0.35rem 0.6rem", fontSize: "11px", opacity: canRedo ? 1 : 0.5 }}
              title="Redo change on this screen"
            >
              ↻
            </button>
          </div>
          <div className="theme-toggle">
            <span className="theme-toggle-label">Theme</span>
            <label className="theme-switch">
              <input
                type="checkbox"
                checked={theme.mode === "dark"}
                onChange={(e) => handleThemeChange(e.target.checked ? "dark" : "light")}
              />
              <span className="theme-switch-slider" />
              <span className="theme-switch-icons">
                <span className="theme-switch-icon-light">☼</span>
                <span className="theme-switch-icon-dark">☾</span>
              </span>
            </label>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <button
              className="glass-button secondary"
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              style={{ padding: "0.35rem 0.5rem", fontSize: "11px" }}
            >
              −
            </button>
            <span style={{ fontSize: "11px", minWidth: "40px", textAlign: "center", opacity: 0.8 }}>
              {zoom}%
            </span>
            <button
              className="glass-button secondary"
              onClick={() => setZoom(Math.min(150, zoom + 10))}
              style={{ padding: "0.35rem 0.5rem", fontSize: "11px" }}
            >
              +
            </button>
          </div>
          <select
            className="view-mode-select"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as "desktop" | "tablet" | "mobile")}
          >
            <option value="mobile">📱 Mobile</option>
            <option value="tablet">📱 Tablet</option>
            <option value="desktop">🖥 Desktop</option>
          </select>
          <button
            className="glass-button secondary"
            onClick={handleSave}
            disabled={saving}
            style={{ padding: "0.35rem 0.75rem" }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            className="glass-button"
            onClick={handlePublish}
            disabled={!canPublish || publishing}
            title={!canPublish ? "Complete all 3 screens (Home, Inputs, Results) to publish" : "Publish to present view"}
            style={{ 
              padding: "0.35rem 0.75rem",
              opacity: canPublish ? 1 : 0.5,
              cursor: canPublish ? "pointer" : "not-allowed"
            }}
          >
            {publishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {active === "home" && (
        <HomeBuilderPage
          data={homeData}
          onChange={(next) => {
            pushHistory("home", homeData);
            setHomeData(next);
          }}
          onThemeChange={handleThemeChange}
          zoom={zoom}
          viewportWidth={getViewportWidth()}
        />
      )}
      {active === "vads" && (
        <VadBuilderPage
          data={vadData}
          onChange={(next) => {
            pushHistory("vads", vadData);
            setVadData(next);
          }}
          zoom={zoom}
          viewportWidth={getViewportWidth()}
        />
      )}
      {active === "results" && (
        <ResultsBuilderPage
          data={resultsData}
          onChange={(next) => {
            pushHistory("results", resultsData);
            setResultsData(next);
          }}
          selectedVADs={selectedVADs}
          zoom={zoom}
          viewportWidth={getViewportWidth()}
        />
      )}
    </div>
  );
};
