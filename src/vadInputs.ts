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
  // 1) Avoided Eco-Modulation Malus via Grade A DfR Compliance
  "Avoided Eco-Modulation Malus via Grade A DfR Compliance": {
    vadName: "Avoided Eco-Modulation Malus via Grade A DfR Compliance",
    fields: [
      {
        label: "Total Annual Tonnage",
        type: "number",
        placeholder: "e.g. 5000",
        options: ["Tons", "Number"],
        defaultUOM: "Tons",
        description: "Total weight of plastic packaging your company places on the market",
      },
    ],
  },

  // 2) Reduced inbound freight via film downgauging and optimized dimensional weight
  "Reduced inbound freight via film downgauging and optimized dimensional weight": {
    vadName: "Reduced inbound freight via film downgauging and optimized dimensional weight",
    fields: [
      {
        label: "Baseline lbs per pallet",
        type: "number",
        placeholder: "e.g. 400",
        options: ["lbs", "Number"],
        defaultUOM: "lbs",
        description: "Average weight of an incoming pallet using your current thicker labels",
      },
      {
        label: "Total Pallets",
        type: "number",
        placeholder: "e.g. 2000",
        options: ["Number"],
        defaultUOM: "Number",
        description: "Total no. of label pallets you receive annually to calculate exact reduction in freight footprint",
      },
    ],
  },

  // 3) Fewer roll changeovers due to higher label count per reel on downgauged film
  "Fewer roll changeovers due to higher label count per reel on downgauged film": {
    vadName: "Fewer roll changeovers due to higher label count per reel on downgauged film",
    fields: [
      {
        label: "Baseline Stops",
        type: "number",
        placeholder: "e.g. 5000",
        options: ["Number"],
        defaultUOM: "Number",
        description: "No. of times per year your bottling line currently has to pause simply to swap out an empty roll of labels",
      },
      {
        label: "Minutes per Stop",
        type: "number",
        placeholder: "e.g. 5",
        options: ["Mins", "Number"],
        defaultUOM: "Mins",
        description: "Average minutes it takes your factory operators to complete a single label roll changeover",
      },
      {
        label: "Downtime Cost per Minute",
        type: "number",
        placeholder: "e.g. 21",
        options: ["$", "Number"],
        defaultUOM: "$",
        description: "Facility's fully burdened cost for every min the bottling line sits idle",
      },
    ],
  },

  // 4) Increased value of uncontaminated food-grade rPET flakes (no ink bleed)
  "Increased value of uncontaminated food-grade rPET flakes (no ink bleed)": {
    vadName: "Increased value of uncontaminated food-grade rPET flakes (no ink bleed)",
    fields: [
      {
        label: "Total PET Tonnage",
        type: "number",
        placeholder: "e.g. 5000",
        options: ["Tons", "Number"],
        defaultUOM: "Tons",
        description: "Total volume of PET plastic use annually - total bottle production data",
      },
    ],
  },

  // 5) Direct Label Price Premium and Transition Costs
  "Direct Label Price Premium and Transition Costs": {
    vadName: "Direct Label Price Premium and Transition Costs",
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
        label: "Annual Volume",
        type: "number",
        placeholder: "e.g. 100000000",
        options: ["Number"],
        defaultUOM: "Number",
        description: "Total annual label purchasing volume to calculate direct cost difference",
      },
    ],
  },
};
