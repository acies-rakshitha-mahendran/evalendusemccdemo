// src/vadInputs.ts
export type InputFieldType = "number" | "text" | "dropdown";

export interface InputField {
  label: string;
  type: InputFieldType;
  placeholder?: string;
  options?: string[];
  defaultUOM?: string;
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
        label: "Total Plastic Weight",
        type: "number",
        placeholder: "e.g. 5000",
        options: ["Tons", "Number"],
        defaultUOM: "Tons",
        description:
          "Total physical volume of PET plastic used annually across your bottle production",
      },
      {
        label: "Old Plastic Waste Percentage",
        type: "number",
        placeholder: "e.g. 20",
        options: ["%", "Number"],
        defaultUOM: "%",
        description:
          "Percentage of plastic flakes currently ruined during recycling without label inks bleeding into wash water",
      },
      {
        label: "New Plastic Waste Percentage",
        type: "number",
        placeholder: "e.g. 0.5",
        options: ["%", "Number"],
        defaultUOM: "%",
        description:
          "Reduced contamination percentage achieved by using MCC labels engineered to wash off completely",
      },
      {
        label: "Price of Recycled Plastic per Ton",
        type: "number",
        placeholder: "e.g. 427.69",
        options: ["$", "Number"],
        defaultUOM: "$",
        description:
          "Current open-market commodity price recyclers earn for selling high-quality rPET",
      },
    ],
  },

  // 2) Lower Freight Costs
  "Lower Freight Costs": {
    vadName: "Lower Freight Costs",
    fields: [
      {
        label: "Old Pallet Weight",
        type: "number",
        placeholder: "e.g. 400",
        options: ["lbs", "Number"],
        defaultUOM: "lbs",
        description: "Average weight of an incoming pallet using your current thicker labels",
      },
      {
        label: "New Pallet Weight",
        type: "number",
        placeholder: "e.g. 280",
        options: ["lbs", "Number"],
        defaultUOM: "lbs",
        description: "Projected lighter weight of an incoming pallet using downgauged MCC labels",
      },
      {
        label: "Total Pallets",
        type: "number",
        placeholder: "e.g. 2000",
        options: ["Number"],
        defaultUOM: "Number",
        description:
          "Total no. of label pallets your company receives annually to calculate exact reduction in freight footprint",
      },
      {
        label: "Freight Cost per lb",
        type: "number",
        placeholder: "e.g. 0.15",
        options: ["$", "Number"],
        defaultUOM: "$",
        description: "Average inbound shipping cost per pound for your packaging materials",
      },
    ],
  },

  // 3) Increased Factory Uptime
  "Increased Factory Uptime": {
    vadName: "Increased Factory Uptime",
    fields: [
      {
        label: "Old Machine Stops",
        type: "number",
        placeholder: "e.g. 5000",
        options: ["Number"],
        defaultUOM: "Number",
        description:
          "No. of times per year the bottling line currently pauses to swap out an empty label roll",
      },
      {
        label: "New Machine Stops",
        type: "number",
        placeholder: "e.g. 3333",
        options: ["Number"],
        defaultUOM: "Number",
        description:
          "Reduced no. of line stops expected due to the higher label count on MCC's thinner film rolls",
      },
      {
        label: "Avg. Minutes per Stop",
        type: "number",
        placeholder: "e.g. 5",
        options: ["Mins", "Number"],
        defaultUOM: "Mins",
        description:
          "Average no. of minutes it takes factory operators to complete a single label roll changeover",
      },
      {
        label: "Downtime Cost per Minute",
        type: "number",
        placeholder: "e.g. 21",
        options: ["$", "Number"],
        defaultUOM: "$",
        description:
          "Fully burdened operational cost for every minute the bottling line sits idle",
      },
    ],
  },

  // 4) Lower Environmental Taxes
  "Lower Environmental Taxes": {
    vadName: "Lower Environmental Taxes",
    fields: [
      {
        label: "Plastic Weight Total",
        type: "number",
        placeholder: "e.g. 5000",
        options: ["Tons", "Number"],
        defaultUOM: "Tons",
        description: "Total weight of plastic packaging your company places on the market",
      },
      {
        label: "Old Tax Rate",
        type: "number",
        placeholder: "e.g. 250",
        options: ["$/ton", "Number"],
        defaultUOM: "$/ton",
        description:
          "Standard financial penalty rate currently applied to your packaging by EU PROs",
      },
      {
        label: "New Tax Rate",
        type: "number",
        placeholder: "e.g. 130",
        options: ["$/ton", "Number"],
        defaultUOM: "$/ton",
        description:
          "Discounted eco-modulation fee applied when wash-off labels elevate the bottle to Grade A recyclability rating",
      },
    ],
  },

  // 5) recycLABEL Implementation Cost (Subtractive)
  "recycLABEL Implementation Cost (Subtractive)": {
    vadName: "recycLABEL Implementation Cost (Subtractive)",
    fields: [
      {
        label: "Baseline Price (per 1000 labels)",
        type: "number",
        placeholder: "e.g. 4",
        options: ["$", "Number"],
        defaultUOM: "$",
        description: "Current price you pay per thousand units for your standard labels",
      },
      {
        label: "Target Price (per 1000 labels)",
        type: "number",
        placeholder: "e.g. 6.5",
        options: ["$", "Number"],
        defaultUOM: "$",
        description: "Premium price per thousand units for MCC recycLABEL",
      },
      {
        label: "Annual Volume",
        type: "number",
        placeholder: "e.g. 100000000",
        options: ["Number"],
        defaultUOM: "Number",
        description:
          "Total annual label purchasing volume to calculate direct cost difference",
      },
      {
        label: "R&D Testing Fees",
        type: "number",
        placeholder: "e.g. 10000",
        options: ["$", "Number"],
        defaultUOM: "$",
        description:
          "One-time transitional cost for laboratory wash-off testing & line trials to validate the new labels on your equipment",
      },
    ],
  },
};
