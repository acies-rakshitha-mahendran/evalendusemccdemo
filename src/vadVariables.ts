export interface VADVariable {
  label: string;
  defaultValue: number;
  defaultUOM: string;
  owner?: string;
  isUserInput: boolean;
  // Index into VAD_INPUT_CONFIGS[vadName].fields for user-entered values
  inputFieldIndex?: number;
}

export const VAD_VARIABLES: Record<string, VADVariable[]> = {
  // Increased Value of Recycled Plastic
  "Increased Value of Recycled Plastic": [
    {
      label: "Annual Procurred Plastic Tonnage",
      defaultValue: 0, // user will supply
      defaultUOM: "tonne",
      owner: "End Customer",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Current Plastic Waste Percentage",
      defaultValue: 20,
      defaultUOM: "%",
      owner: "Third Party",
      isUserInput: false,
      inputFieldIndex: 1,
    },
    {
      label: "Predicted Plastic Waste Percentage",
      defaultValue: 0.5,
      defaultUOM: "%",
      owner: "Client (MCC)",
      isUserInput: false,
      inputFieldIndex: 2,
    },
    {
      label: "Price of Recycled Plastic per Ton",
      defaultValue: 427.69,
      defaultUOM: "$",
      owner: "Third Party",
      isUserInput: false,
      inputFieldIndex: 3,
    },
  ],

  // Lower Freight Costs
  "Lower Freight Costs": [
    {
      label: "Current Weight of Plastic",
      defaultValue: 0,
      defaultUOM: "lbs",
      owner: "End Customer",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "New Weight of Plastic",
      defaultValue: 280,
      defaultUOM: "lbs",
      owner: "Client (MCC)",
      isUserInput: false,
      inputFieldIndex: 1,
    },
    {
      label: "Total Pallets",
      defaultValue: 0,
      defaultUOM: "Number",
      owner: "End Customer",
      isUserInput: true,
      inputFieldIndex: 2,
    },
    {
      label: "Freight Cost per lb",
      defaultValue: 0.15,
      defaultUOM: "$",
      owner: "Third Party",
      isUserInput: false,
      inputFieldIndex: 3,
    },
  ],

  // Increased Factory Uptime
  "Increased Factory Uptime": [
    {
      label: "Current Production Line Stops",
      defaultValue: 0,
      defaultUOM: "Number",
      owner: "End Customer",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Predicted Production Line Stops",
      defaultValue: 3,
      defaultUOM: "Mins",
      owner: "Client (MCC)",
      isUserInput: false,
      inputFieldIndex: 1,
    },
    {
      label: "Avg. Minutes per Stop",
      defaultValue: 0,
      defaultUOM: "Mins",
      owner: "End Customer",
      isUserInput: true,
      inputFieldIndex: 2,
    },
    {
      label: "Estimated Downtime Cost per Minute",
      defaultValue: 0,
      defaultUOM: "$",
      owner: "End Customer",
      isUserInput: true,
      inputFieldIndex: 3,
    },
  ],

  // Lower Environmental Taxes
  "Lower Environmental Taxes": [
    {
      label: "Total Plastic Weight Produced",
      defaultValue: 0,
      defaultUOM: "tonne",
      owner: "End Customer",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Current Tax Rate (Grade C)",
      defaultValue: 250,
      defaultUOM: "$/ton",
      owner: "Third Party",
      isUserInput: false,
      inputFieldIndex: 1,
    },
    {
      label: "Predicted Tax Rate (Grade A)",
      defaultValue: 130,
      defaultUOM: "$/ton",
      owner: "Third Party",
      isUserInput: false,
      inputFieldIndex: 2,
    },
  ],

  // recycLABEL Implementation Cost (Subtractive)
  "recycLABEL Implementation Cost (Subtractive)": [
    {
      label: "Current Price (per 1000 labels)",
      defaultValue: 0,
      defaultUOM: "$",
      owner: "End Customer",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "New Price (per 1000 labels)",
      defaultValue: 6.5,
      defaultUOM: "$",
      owner: "Client (MCC)",
      isUserInput: false,
      inputFieldIndex: 1,
    },
    {
      label: "Annual Procurred Label Volume",
      defaultValue: 0,
      defaultUOM: "Number",
      owner: "End Customer",
      isUserInput: true,
      inputFieldIndex: 2,
    },
    {
      label: "R&D Testing Fees",
      defaultValue: 10000,
      defaultUOM: "$",
      owner: "Client (MCC)",
      isUserInput: false,
      inputFieldIndex: 3,
    },
  ],
};

