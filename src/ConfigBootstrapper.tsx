import React, { useEffect, useMemo, useState } from "react";
import { Editor, Element, Frame, useEditor } from "@craftjs/core";
import { BUILD_CONFIG_STORAGE_KEY, saveBuildConfig } from "./api";
import type { ProjectBuildConfig } from "./types";
import { defaultTheme } from "./theme";
import { craftResolver } from "./builder/craft/craftResolver";
import {
  ButtonBlock,
  Container,
  ImageBlock,
  LogoBlock,
  ResultCard,
  SubtitleBlock,
  TitleBlock,
  VADBlock,
  VADResultsList,
} from "./builder/craft/craftNodes";
import { VAD_INPUT_CONFIGS } from "./vadInputs";
import { useBootstrap } from "./BootstrapContext";

const DEMO_PROJECT_ID = "demo-project";
const PRODUCT_IMAGE_URL =
  "https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEUJiwK3ShdqpDLzjCn4JOJ%2BZd6t0TmKQMckyewneAL1z0VWESo9YoOaUOYw5VPucELeo39KzG7JLibVw%2BMDXN%2BvSdDSXq0GZl4QhzZrt%2FtNjxbS1FT%2F21alcTNKDw2LQE2AZvLcWD5qmz%2Fpr7mSnZFezf2B1Qeg0Mwuh%2BQCtXZRXMN9PdFo7LENolHXdBjfj0Tlpgz%2BN8%2BocMIAAIlnZ6Pgzp%2Bep%2BiM3ggt%2FBr9rq9Z7C5HsNjD%2Fj%2BetbUb1Z7GDZqv0sp7AWIn98fNxV14K5EXChswJZYxFLuT48ZwT6UsoqcWjn3b%2BCtMfbW1X0IFXEofP%2Fwo1gELzxRszy2N67DsdyhMQc0DEZFHWUqcXGeS5540NFF9X1%2BlQxseEhzo%2BbpGpi9Few5LHjdmWt4nA5hVlY0RJ5bYNWEZjsq4Ceg7%2BoeVENEJRozdYBVV0iz55bw3CRCsiYV0CwtlkO9D%2BFC8nA%2B0PewLGWv3ERvTwRZRbFkzWwr6wD9f1nlul7TeF2dwH%2FSfaS6u8%2FaLb4XjKVhY8VtDKvuSEY6AeIzJbOiv5X4ADT7mKx52SXEimqOOzPp6DCRG5H9QQ2ztjOqV5Pw%3D&allow_caching=true&sz=w512";

const readStoredConfig = (): ProjectBuildConfig | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(BUILD_CONFIG_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProjectBuildConfig;
  } catch {
    return null;
  }
};

const getRootNodeCount = (layout: string | null | undefined): number => {
  if (!layout || typeof layout !== "string") return 0;
  try {
    const parsed = JSON.parse(layout) as { ROOT?: { nodes?: unknown } };
    const nodes = parsed?.ROOT?.nodes;
    return Array.isArray(nodes) ? nodes.length : 0;
  } catch {
    return 0;
  }
};

const isLayoutEffectivelyBlank = (layout: string | null | undefined): boolean => {
  return getRootNodeCount(layout) === 0;
};

const SerializeOnMount: React.FC<{ onSerialized: (json: string) => void }> = ({ onSerialized }) => {
  const { query } = useEditor();
  useEffect(() => {
    let cancelled = false;
    let tries = 0;

    const attempt = () => {
      if (cancelled) return;
      const json = query.serialize();
      // Craft may need a tick before Frame children are fully registered.
      if (!isLayoutEffectivelyBlank(json) || tries >= 10) {
        onSerialized(json);
        return;
      }
      tries += 1;
      window.setTimeout(attempt, 50);
    };

    attempt();
    return () => {
      cancelled = true;
    };
  }, [onSerialized, query]);
  return null;
};

type SeedMode = "home" | "vads" | "results";

const SeedLayout: React.FC<{ mode: SeedMode; onSerialized: (json: string) => void }> = ({
  mode,
  onSerialized,
}) => {
  const allVads = useMemo(() => Object.keys(VAD_INPUT_CONFIGS), []);

  const frame = (() => {
    if (mode === "home") {
      return (
        <Element
          is={Container}
          canvas
          padding={28}
          align="left"
          borderRadius={28}
          minHeight={880}
          backgroundColor="radial-gradient(circle at 12% 12%, rgba(85,136,59,0.18), rgba(255,255,255,0) 55%), radial-gradient(circle at 90% 30%, rgba(56,189,248,0.14), rgba(255,255,255,0) 55%), linear-gradient(135deg, rgba(2,6,23,0.02), rgba(85,136,59,0.05))"
        >
          <LogoBlock text="XYZ Beverage" />
          <div style={{ height: 14 }} />
          <TitleBlock
            text="Unlock the Future of Sustainable Packaging"
            fontSize={28}
            color="#0f172a"
          />
          <SubtitleBlock
            text="Transitioning PET Beverage Packaging for ABC Beverage Co."
            fontSize={13}
            color="#334155"
          />

          <div style={{ height: 16 }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 0.9fr)",
              gap: 18,
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: 18,
                border: "1px solid rgba(85,136,59,0.18)",
                background: "rgba(255,255,255,0.78)",
                boxShadow: "0 18px 55px rgba(2,6,23,0.08)",
                padding: 18,
              }}
            >
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#166534",
                    background: "rgba(34,197,94,0.12)",
                    border: "1px solid rgba(34,197,94,0.25)",
                  }}
                >
                  Roll Fed Labels
                </span>
                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#0f172a",
                    background: "rgba(15,23,42,0.04)",
                    border: "1px solid rgba(15,23,42,0.10)",
                  }}
                >
                  Certified Sustainable
                </span>
              </div>

              <div style={{ fontSize: 13, lineHeight: 1.6, color: "#0f172a", opacity: 0.88 }}>
                recycLABEL™ is designed to help enable recycling, reduce waste, and improve manufacturing throughput—without compromising label performance.
              </div>

              <div style={{ height: 14 }} />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
                {[
                  { k: "Enable", v: "Recycling" },
                  { k: "Eliminate", v: "Waste" },
                  { k: "Improve", v: "Throughput" },
                ].map((item) => (
                  <div
                    key={item.k}
                    style={{
                      borderRadius: 14,
                      border: "1px solid rgba(148,163,184,0.35)",
                      background: "rgba(255,255,255,0.65)",
                      padding: 10,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#55883B" }}>{item.k}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{item.v}</div>
                  </div>
                ))}
              </div>

              <div style={{ height: 16 }} />
              <ButtonBlock label="START YOUR SUSTAINABILITY JOURNEY" fontSize={12} padding={12} borderRadius={999} />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <ImageBlock src={PRODUCT_IMAGE_URL} alt="recycLABEL roll-fed bottle" />
            </div>
          </div>
        </Element>
      );
    }

    if (mode === "vads") {
      return (
        <Element is={Container} canvas padding={28} align="left" borderRadius={24} minHeight={880}>
          <TitleBlock text="Inputs" fontSize={26} color="#0f172a" />
          <SubtitleBlock
            text="All Value Added Drivers (VADs) are included by default. Remove any VADs you don’t want to collect inputs for."
            fontSize={13}
            color="#334155"
          />
          <div style={{ height: 10 }} />
          {allVads.map((vadName) => (
            <VADBlock key={vadName} title={vadName} />
          ))}
        </Element>
      );
    }

    return (
      <Element is={Container} canvas padding={28} align="left" borderRadius={24} minHeight={880}>
        <TitleBlock text="Value Estimation" fontSize={26} color="#0f172a" />
        <SubtitleBlock
          text="Review results and refine inputs. Updates reflect immediately as inputs change."
          fontSize={13}
          color="#334155"
        />
        <div style={{ height: 10 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
          <ResultCard label="Total Annual Value" value="Enter value" />
          <ResultCard label="Total Investments" value="Enter value" />
          <ResultCard label="Net Benefit (Year 1)" value="Enter value" />
          <ResultCard label="ROI" value="Enter value" />
        </div>
        <VADResultsList columns={2} />
      </Element>
    );
  })();

  return (
    <div
      style={{
        position: "fixed",
        left: -10000,
        top: 0,
        width: 1400,
        height: 900,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0,
      }}
      aria-hidden="true"
    >
      <Editor enabled={false} resolver={craftResolver}>
        <SerializeOnMount onSerialized={onSerialized} />
        <Frame>{frame}</Frame>
      </Editor>
    </div>
  );
};

export const ConfigBootstrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { notifyBootstrapComplete } = useBootstrap();
  const [existing] = useState<ProjectBuildConfig | null>(() => readStoredConfig());
  const needsSeed = (cfg: ProjectBuildConfig | null) => {
    if (!cfg || cfg.projectId !== DEMO_PROJECT_ID) return true;
    if (!cfg.homeLayout || isLayoutEffectivelyBlank(cfg.homeLayout)) return true;
    if (!cfg.vadLayout || isLayoutEffectivelyBlank(cfg.vadLayout)) return true;
    if (!cfg.resultsLayout || isLayoutEffectivelyBlank(cfg.resultsLayout)) return true;
    return false;
  };

  const [ready, setReady] = useState<boolean>(() => {
    const cfg = readStoredConfig();
    return !needsSeed(cfg);
  });

  const [seed, setSeed] = useState<{ home?: string; vads?: string; results?: string }>({});

  useEffect(() => {
    if (ready) return;
    const base = existing;
    const needsHome = !base?.homeLayout;
    const needsVads = !base?.vadLayout;
    const needsResults = !base?.resultsLayout;

    if ((needsHome && !seed.home) || (needsVads && !seed.vads) || (needsResults && !seed.results)) return;

    const cfg: ProjectBuildConfig = {
      projectId: DEMO_PROJECT_ID,
      theme: base?.theme ?? defaultTheme,
      homeLayout: base?.homeLayout ?? seed.home ?? null,
      vadLayout: base?.vadLayout ?? seed.vads ?? null,
      resultsLayout: base?.resultsLayout ?? seed.results ?? null,
    };

    saveBuildConfig(cfg).then(() => {
      setReady(true);
      // Notify that bootstrap is complete so BuildApp can reload
      notifyBootstrapComplete();
    });
  }, [existing, ready, seed.home, seed.vads, seed.results, notifyBootstrapComplete]);

  if (ready) return <>{children}</>;

  const needsHome = !existing?.homeLayout || isLayoutEffectivelyBlank(existing.homeLayout);
  const needsVads = !existing?.vadLayout || isLayoutEffectivelyBlank(existing.vadLayout);
  const needsResults = !existing?.resultsLayout || isLayoutEffectivelyBlank(existing.resultsLayout);

  return (
    <>
      {needsHome ? <SeedLayout mode="home" onSerialized={(json) => setSeed((s) => ({ ...s, home: json }))} /> : null}
      {needsVads ? <SeedLayout mode="vads" onSerialized={(json) => setSeed((s) => ({ ...s, vads: json }))} /> : null}
      {needsResults ? <SeedLayout mode="results" onSerialized={(json) => setSeed((s) => ({ ...s, results: json }))} /> : null}
      <div style={{ padding: 24, fontSize: 13, opacity: 0.8 }}>Preparing demo…</div>
    </>
  );
};

