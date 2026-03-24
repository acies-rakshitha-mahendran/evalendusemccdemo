// src/vadInputs.ts
export type InputFieldType = "number" | "text" | "dropdown";

export interface InputField {
  label: string;
  type: InputFieldType;
  placeholder?: string;
  /** If present this value will be used as the initial input value instead of an empty string. */
  defaultValue?: string | number;
  options?: string[];
  defaultUOM?: string;
  /** Used by InputsRenderer to decide if this value should be collected from the user */
  owner?: string; // e.g. "End Customer", "Third Party", "Client"
  /** Shown on Inputs page (Present) for selected VADs only */
  description?: string;
}

export interface VADInputConfig {
  vadName: string;
  fields: InputField[];
}

export const VAD_INPUT_CONFIGS: Record<string, VADInputConfig> = {
  // 1) Increased Value of Recycled Plastic
  "Increased Value of Recycled Plastic": {
    vadName: "Increased Value of Recycled Plastic",
    fields: [
      {
        label: "Annual Procured Plastic Tonnage",
        type: "number",
        placeholder: "e.g. 5100",
        options: ["Tonne", "Number"],
        defaultUOM: "Tonne",
        owner: "End Customer",
        description:
          "Total physical volume of PET plastic used annually across bottle production",
      },
      {
        label: "Current Plastic Waste Percentage",
        type: "number",
        placeholder: "e.g. 20",
        defaultValue: 20,
        options: ["%", "Number"],
        defaultUOM: "%",
        owner: "Third Party",
        description:
          "Percentage of plastic flakes ruined during recycling due to label ink contamination",
      },
      {
        label: "Predicted Plastic Waste Percentage",
        type: "number",
        placeholder: "e.g. 0.5",
        defaultValue: 15,
        options: ["%", "Number"],
        defaultUOM: "%",
        owner: "Client",
        description:
          "Reduced contamination percentage achieved",
      },
      {
        label: "Price of Recycled Plastic per Ton",
        type: "number",
        placeholder: "e.g. 427.69",
        defaultValue: 60,
        options: ["$", "Number"],
        defaultUOM: "$",
        owner: "Third Party",
        description:
          "Current open-market commodity price recyclers earn for high-quality rPET",
      },
    ],
  },

  // 2) Lower Freight Costs
  "Lower Freight Costs": {
    vadName: "Lower Freight Costs",
    fields: [
      {
        label: "Current Weight of Plastic",
        type: "number",
        placeholder: "e.g. 350",
        options: ["lbs", "Number"],
        defaultUOM: "lbs",
        owner: "End Customer",
        description: "Average weight of an incoming pallet using your current thicker labels",
      },
      {
        label: "New Weight of Plastic",
        type: "number",
        placeholder: "e.g. 280",
        defaultValue: 330,
        options: ["lbs", "Number"],
        defaultUOM: "lbs",
        owner: "Client",
        description: "Projected lighter pallet weight using downgauged labels",
      },
      {
        label: "Total Pallets",
        type: "number",
        placeholder: "e.g. 2000",
        options: ["Number"],
        defaultUOM: "Number",
        owner: "End Customer",
        description:
          "Total number of label pallets your company receives annually",
      },
      {
        label: "Freight Cost per lb",
        type: "number",
        placeholder: "e.g. 0.15",
        defaultValue: 0.1,
        options: ["$", "Number"],
        defaultUOM: "$",
        owner: "Third Party",
        description: "Average inbound shipping cost per pound for packaging materials",
      },
    ],
  },

  // 3) Increased Factory Uptime
  "Increased Factory Uptime": {
    vadName: "Increased Factory Uptime",
    fields: [
      {
        label: "Current Production Line Stops",
        type: "number",
        placeholder: "e.g. 5000",
        options: ["Number"],
        defaultUOM: "Number",
        owner: "End Customer",
        description:
          "Number of times per year the bottling line pauses to replace an empty label roll",
      },
      {
        label: "Predicted Production Line Stops",
        type: "number",
        placeholder: "e.g. 3",
        defaultValue: 3600,
        options: ["Number"],
        defaultUOM: "Number",
        owner: "Client",
        description:
          "Reduced number of line stops expected due to higher label count on thinner rolls",
      },
      {
        label: "Avg. Minutes per Stop",
        type: "number",
        placeholder: "e.g. 3",
        options: ["Minutes", "Number"],
        defaultUOM: "Minutes",
        owner: "End Customer",
        description:
          "Average time required for operators to complete a label roll changeover",
      },
      {
        label: "Estimated Downtime Cost per Minute",
        type: "number",
        placeholder: "e.g. 6",
        options: ["$", "Number"],
        defaultUOM: "$",
        owner: "End Customer",
        description:
          "Operational cost incurred per minute when the bottling line is idle",
      },
    ],
  },

  // 4) Lower Environmental Taxes
  "Lower Environmental Taxes": {
    vadName: "Lower Environmental Taxes",
    fields: [
      {
        label: "Total Plastic Weight Produced",
        type: "number",
        placeholder: "e.g. 5100",
        options: ["Tonne", "Number"],
        defaultUOM: "Tonne",
        owner: "End Customer",
        description: "Total weight of plastic packaging placed on the market",
      },
      {
        label: "Current Tax Rate (Grade C)",
        type: "number",
        placeholder: "e.g. 250",
        defaultValue: 200,
        options: ["$/ton", "Number"],
        defaultUOM: "$/ton",
        owner: "Third Party",
        description:
          "Environmental penalty rate currently applied to the packaging",
      },
      {
        label: "Predicted Tax Rate (Grade A)",
        type: "number",
        placeholder: "e.g. 130",
        defaultValue: 190,
        options: ["$/ton", "Number"],
        defaultUOM: "$/ton",
        owner: "Third Party",
        description:
          "Discounted eco-modulation tax rate when packaging achieves Grade A recyclability",
      },
    ],
  },

  // 5) recycLABEL Implementation Cost (Subtractive)
  "recycLABEL Implementation Cost (Subtractive)": {
    vadName: "recycLABEL Implementation Cost (Subtractive)",
    fields: [
      {
        label: "Current Price (per 1000 labels)",
        type: "number",
        placeholder: "e.g. 4",
        options: ["$", "Number"],
        defaultUOM: "$",
        owner: "End Customer",
        description: "Current price paid per thousand labels",
      },
      {
        label: "New Price (per 1000 labels)",
        type: "number",
        placeholder: "e.g.5",
        defaultValue: 5,
        options: ["$", "Number"],
        defaultUOM: "$",
        owner: "Client",
        description: "Premium price per thousand labels",
      },
      {
        label: "Annual Procured Label Volume",
        type: "number",
        placeholder: "e.g. 50000000",
        options: ["Number"],
        defaultUOM: "Number",
        owner: "End Customer",
        description:
          "Total annual label purchasing volume used to calculate cost difference",
      },
      {
        label: "R&D Testing Fees",
        type: "number",
        placeholder: "e.g. 10000",
        defaultValue: 20000,
        options: ["$", "Number"],
        defaultUOM: "$",
        owner: "Client",
        description:
          "One-time testing and validation cost for wash-off labels",
      },
    ],
  },
};
