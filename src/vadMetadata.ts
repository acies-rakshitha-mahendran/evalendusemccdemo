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
  "Increased Value of Recycled Plastic": {
    category: "Circular Economy Yield",
    dimension: "Circular Economy Yield",
    variables: [
      "Total Plastic Weight",
      "Old Plastic Waste Percentage",
      "New Plastic Waste Percentage",
      "Price of Recycled Plastic per Ton",
    ],
    expression:
      "Value = Total Plastic Weight * (Old Plastic Waste % - New Plastic Waste %) * Price of Recycled Plastic per Ton",
  },
  "Lower Freight Costs": {
    category: "Supply Chain Efficiency",
    dimension: "Reduced Freight Cost",
    variables: [
      "Old Pallet Weight",
      "New Pallet Weight",
      "Total Pallets",
      "Freight Cost per lb",
    ],
    expression:
      "Value = ((Old Pallet Weight - New Pallet Weight) * Total Pallets) * Freight Cost per lb",
  },
  "Increased Factory Uptime": {
    category: "Operational Efficiency",
    dimension: "Reduced Line Stops",
    variables: [
      "Old Machine Stops",
      "New Machine Stops",
      "Avg minutes per Stop",
      "Downtime Cost per Minute",
    ],
    expression:
      "Value = (Old Machine Stops - New Machine Stops) * Avg minutes per Stop * Cost of Downtime per Min",
  },
  "Lower Environmental Taxes": {
    category: "Regulatory Compliance",
    dimension: "Avoided Cost",
    variables: [
      "Plastic Weight Total",
      "Old Tax Rate",
      "New Tax Rate",
    ],
    expression:
      "Value = Total Plastic Weight * (Old Tax Rate - New Tax Rate)",
  },
  "recycLABEL Implementation Cost (Subtractive)": {
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
