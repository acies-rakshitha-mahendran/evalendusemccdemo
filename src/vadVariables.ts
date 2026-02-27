export interface VADVariable {
  label: string;
  defaultValue: number;
  defaultUOM: string;
  isUserInput: boolean;
  // Index into VAD_INPUT_CONFIGS[vadName].fields for user-entered values
  inputFieldIndex?: number;
}

export const VAD_VARIABLES: Record<string, VADVariable[]> = {
  // Avoided Eco-Modulation Malus via Grade A DfR Compliance
  "Avoided Eco-Modulation Malus via Grade A DfR Compliance": [
    {
      label: "Total Annual Tonnage",
      defaultValue: 5000,
      defaultUOM: "tonne",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Grade C Malus Rate (Baseline)",
      defaultValue: 250,
      defaultUOM: "$/tonne",
      isUserInput: false,
    },
    {
      label: "Grade A Bonus Rate (Target)",
      defaultValue: 130,
      defaultUOM: "$/tonne",
      isUserInput: false,
    },
  ],

  // Reduced inbound freight via film downgauging and optimized dimensional weight
  "Reduced inbound freight via film downgauging and optimized dimensional weight": [
    {
      label: "Baseline lbs per pallet",
      defaultValue: 400,
      defaultUOM: "lbs",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Target lbs per pallet",
      defaultValue: 280,
      defaultUOM: "lbs",
      isUserInput: false,
    },
    {
      label: "Total Pallets",
      defaultValue: 2000,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 1,
    },
    {
      label: "Freight Rate per lb",
      defaultValue: 0.15,
      defaultUOM: "$",
      isUserInput: false,
    },
  ],

  // Fewer roll changeovers due to higher label count per reel on downgauged film
  "Fewer roll changeovers due to higher label count per reel on downgauged film": [
    {
      label: "Baseline Stops",
      defaultValue: 5000,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Target Stops (recycLABEL)",
      defaultValue: 3333,
      defaultUOM: "Number",
      isUserInput: false,
    },
    {
      label: "Minutes per Stop",
      defaultValue: 5,
      defaultUOM: "Mins",
      isUserInput: true,
      inputFieldIndex: 1,
    },
    {
      label: "Downtime Cost per Minute",
      defaultValue: 21,
      defaultUOM: "$",
      isUserInput: true,
      inputFieldIndex: 2,
    },
  ],

  // Increased value of uncontaminated food-grade rPET flakes (no ink bleed)
  "Increased value of uncontaminated food-grade rPET flakes (no ink bleed)": [
    {
      label: "Total PET Tonnage",
      defaultValue: 5000,
      defaultUOM: "tonne",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Baseline Flake Contamination Loss Percentage",
      defaultValue: 20,
      defaultUOM: "%",
      isUserInput: false,
    },
    {
      label: "Target Flake Contamination Loss Percentage",
      defaultValue: 0.5,
      defaultUOM: "%",
      isUserInput: false,
    },
    {
      label: "Price per Ton of Food Grade rPET",
      defaultValue: 427.69,
      defaultUOM: "$",
      isUserInput: false,
    },
  ],

  // recycLABEL Implementation Cost
  "recycLABEL Implementation Cost": [
    {
      label: "Baseline Price (per 1000 labels)",
      defaultValue: 4,
      defaultUOM: "$",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Target Price (per 1000 labels)",
      defaultValue: 6.5,
      defaultUOM: "$",
      isUserInput: false,
    },
    {
      label: "Annual Volume",
      defaultValue: 100000000,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 1,
    },
    {
      label: "R&D Testing Fees",
      defaultValue: 10000,
      defaultUOM: "$",
      isUserInput: false,
    },
  ],
};

