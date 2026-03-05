/**
 * VAD Properties shown in Build → Inputs when a VAD block is selected on the canvas.
 * Keys must match the full VAD names used in VADBlock title (CraftEditorShell VADS_LIST.full).
 */
export interface VADMeta {
  category: string;
  dimension: string;
  variables: string[];
  expression: string;
  description?: string; // short summary for builder UI
}

export const VAD_METADATA: Record<string, VADMeta> = {
  "Increased Value of Recycled Plastic": {
    category: "Circular Economy Yield",
    dimension: "Circular Economy Yield",
    variables: [
      "Annual Procurred Plastic Tonnage",
      "Current Plastic Waste Percentage",
      "Predicted Plastic Waste Percentage",
      "Price of Recycled Plastic per Ton",
    ],
    expression:
      "Value = Annual Procurred Plastic Tonnage * (Old Plastic Waste % - New Plastic Waste %) * Price of Recycled Plastic per Ton",
    description:
      "Added revenue from recovering more high-quality, uncontaminated food-grade plastic during the recycling process.",
  },
  "Lower Freight Costs": {
    category: "Supply Chain Efficiency",
    dimension: "Reduced Freight Cost",
    variables: [
      "Current Weight of Plastic",
      "New Weight of Plastic",
      "Total Pallets",
      "Freight Cost per lb",
    ],
    expression:
      "Value = ((Current Weight of Plastic - New Weight of Plastic) * Total Pallets) * Freight Cost per lb",
    description:
      "Reduction in inbound shipping expenses due to the lighter weight and smaller footprint of thinner label rolls.",
  },
  "Increased Factory Uptime": {
    category: "Operational Efficiency",
    dimension: "Reduced Line Stops",
    variables: [
      "Current Production Line Stops",
      "Predicted Production Line Stops",
      "Avg minutes per Stop",
      "Estimated Downtime Cost per Minute",
    ],
    expression:
      "Value = (Current Production Line Stops - Predicted Production Line Stops) * Avg minutes per Stop * Cost of Downtime per Min",
    description:
      "Operational cost savings gained by reducing bottling line stoppages because thinner films fit more labels onto a single roll.",
  },
  "Lower Environmental Taxes": {
    category: "Regulatory Compliance",
    dimension: "Avoided Cost",
    variables: [
      "Total Plastic Weight Produced",
      "Current Tax Rate (Grade C)",
      "Predicted Tax Rate (Grade A)",
    ],
    expression:
      "Value = Annual Procurred Plastic Tonnage * (Current Tax Rate (Grade C) - Predicted Tax Rate (Grade A))",
    description:
      "Financial savings from avoiding regulatory penalties by elevating the bottles to Grade A recyclability rating.",
  },
  "recycLABEL Implementation Cost (Subtractive)": {
    category: "Implementation Cost",
    dimension: "Implementation Cost",
    variables: [
      "Current Price (per 1000 labels)",
      "New Price (per 1000 labels)",
      "Annual Procurred Label Volume",
      "R&D Testing Fees",
    ],
    expression:
      "-1 * (Target Price per 1000 labels - Baseline Price per 1000 labels) * (Annual Procurred Label Volume / 1000) + R&D Testing Fees",
    description:
      "Net investment required to purchase the premium sustainable labels & validate them on factory lines.",
  },
};
