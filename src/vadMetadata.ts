/**
 * VAD Properties shown in Build → Inputs when a VAD block is selected on the canvas.
 * Keys must match the full VAD names used in VADBlock title (CraftEditorShell VADS_LIST.full).
 */
export interface VADMeta {
  category: string;
  dimension: string;
  variables: string[];
  expression: string;
}

export const VAD_METADATA: Record<string, VADMeta> = {
  "recycLABEL Implementation Cost": {
    category: "Implementation Cost",
    dimension: "Implementation Cost",
    variables: [
      "Baseline Price (per 1000 labels)",
      "Target Price (per 1000 labels)",
      "Annual Volume",
      "R&D Testing Fees",
    ],
    expression:
      "-1 * (Target Price per 1000 labels - Baseline Price per 1000 labels) * (Annual Volume / 1000) + R&D Testing Fees",
  },
  "Avoided Eco-Modulation Malus via Grade A DfR Compliance": {
    category: "Regulatory Compliance",
    dimension: "Avoided Cost",
    variables: [
      "Total Annual Tonnage",
      "Grade C Malus Rate (Baseline)",
      "Grade A Bonus Rate (Target)",
    ],
    expression: "Total Tonnage * (Baseline Rate - Target Rate)",
  },
  "Reduced inbound freight via film downgauging and optimized dimensional weight": {
    category: "Supply Chain Efficiency",
    dimension: "Reduced Freight Cost",
    variables: [
      "Baseline lbs per pallet",
      "Target lbs per pallet",
      "Total Pallets",
      "Freight Rate per lb",
    ],
    expression: "((Baseline lbs - Target lbs) * Total Pallets) * Freight Rate per lb",
  },
  "Fewer roll changeovers due to higher label count per reel on downgauged film": {
    category: "Operational Efficiency",
    dimension: "Reduced Line Stops",
    variables: [
      "Baseline Stops",
      "Target Stops (recycLABEL)",
      "Minutes per Stop",
      "Downtime Cost per Minute",
    ],
    expression:
      "(Baseline Stops - Target Stops) * Minutes per Stop * Downtime Cost per Minute",
  },
  "Increased value of uncontaminated food-grade rPET flakes (no ink bleed)": {
    category: "Circular Economy Yield",
    dimension: "Reduced Flake Contamination",
    variables: [
      "Total PET Tonnage",
      "Baseline Flake Contamination Loss Percentage",
      "Target Flake Contamination Loss Percentage",
      "Price per Tonne of Food Grade rPET",
    ],
    expression:
      "Total PET Tonnage * (Baseline Flake Contamination Loss Percentage - Target Flake Contamination Loss Percentage) * Price per Ton of Food Grade rPET",
  },
  "Direct Label Price Premium and Transition Costs": {
    category: "Implementation Cost",
    dimension: "Implementation Cost",
    variables: [
      "Baseline Price (per 1000 labels)",
      "Target Price (per 1000 labels)",
      "Annual Volume",
      "R&D Testing Fees",
    ],
    expression:
      "-1 * (Target Price per 1000 labels - Baseline Price per 1000 labels) * (Annual Volume / 1000) + R&D Testing Fees",
  },
};
