export interface VADVariable {
  label: string;
  defaultValue: number;
  defaultUOM: string;
  isUserInput: boolean;
  // Index into VAD_INPUT_CONFIGS[vadName].fields for user-entered values
  inputFieldIndex?: number;
}

export const VAD_VARIABLES: Record<string, VADVariable[]> = {
  // Increased Value of Recycled Plastic
  "Increased Value of Recycled Plastic": [
    {
      label: "Total Plastic Weight",
      defaultValue: 5000,
      defaultUOM: "tonne",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Old Plastic Waste Percentage",
      defaultValue: 20,
      defaultUOM: "%",
      isUserInput: true,
      inputFieldIndex: 1,
    },
    {
      label: "New Plastic Waste Percentage",
      defaultValue: 0.5,
      defaultUOM: "%",
      isUserInput: true,
      inputFieldIndex: 2,
    },
    {
      label: "Price of Recycled Plastic per Ton",
      defaultValue: 427.69,
      defaultUOM: "$",
      isUserInput: true,
      inputFieldIndex: 3,
    },
  ],

  // Lower Freight Costs
  "Lower Freight Costs": [
    {
      label: "Old Pallet Weight",
      defaultValue: 400,
      defaultUOM: "lbs",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "New Pallet Weight",
      defaultValue: 280,
      defaultUOM: "lbs",
      isUserInput: true,
      inputFieldIndex: 1,
    },
    {
      label: "Total Pallets",
      defaultValue: 2000,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 2,
    },
    {
      label: "Freight Cost per lb",
      defaultValue: 0.15,
      defaultUOM: "$",
      isUserInput: true,
      inputFieldIndex: 3,
    },
  ],

  // Increased Factory Uptime
  "Increased Factory Uptime": [
    {
      label: "Old Machine Stops",
      defaultValue: 5000,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "New Machine Stops",
      defaultValue: 3333,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 1,
    },
    {
      label: "Avg. Minutes per Stop",
      defaultValue: 5,
      defaultUOM: "Mins",
      isUserInput: true,
      inputFieldIndex: 2,
    },
    {
      label: "Downtime Cost per Minute",
      defaultValue: 21,
      defaultUOM: "$",
      isUserInput: true,
      inputFieldIndex: 3,
    },
  ],

  // Lower Environmental Taxes
  "Lower Environmental Taxes": [
    {
      label: "Plastic Weight Total",
      defaultValue: 5000,
      defaultUOM: "tonne",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Old Tax Rate",
      defaultValue: 250,
      defaultUOM: "$/ton",
      isUserInput: true,
      inputFieldIndex: 1,
    },
    {
      label: "New Tax Rate",
      defaultValue: 130,
      defaultUOM: "$/ton",
      isUserInput: true,
      inputFieldIndex: 2,
    },
  ],

  // recycLABEL Implementation Cost (Subtractive)
  "recycLABEL Implementation Cost (Subtractive)": [
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
      isUserInput: true,
      inputFieldIndex: 1,
    },
    {
      label: "Annual Volume",
      defaultValue: 100000000,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 2,
    },
    {
      label: "R&D Testing Fees",
      defaultValue: 10000,
      defaultUOM: "$",
      isUserInput: true,
      inputFieldIndex: 3,
    },
  ],
};

