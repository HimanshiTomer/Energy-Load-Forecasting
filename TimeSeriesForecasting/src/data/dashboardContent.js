export const overviewStats = [
  { label: "Total Months", value: "125", sub: "(April 2015 - August 2025)" },
  { label: "Models Compared", value: "3", sub: "(ARIMA, SARIMA, SARIMAX)" },
  { label: "Evaluation Metrics", value: "5", sub: "(MAE, RMSE, MAPE, R², Directional Accuracy)" },
  { label: "Total Visualizations", value: "13", sub: "Images" },
];

export const dataSplitInfo = [
  { title: "Training Set", period: "April 2015 - June 2022", months: "87", pct: "70%", purpose: "Model learning and parameter estimation" },
  { title: "Validation Set", period: "July 2022 - January 2024", months: "19", pct: "15%", purpose: "Hyperparameter tuning (grid search)" },
  { title: "Test Set", period: "February 2024 - August 2025", months: "19", pct: "15%", purpose: "Final model evaluation on unseen data" },
];

export const modelSpecs = [
  {
    name: "ARIMA",
    fullName: "AutoRegressive Integrated Moving Average",
    details: [
      { label: "Best Parameters", value: "(p, d, q) values from grid search" },
      { label: "Grid Search", value: "36 combinations tested" }
    ]
  },
  {
    name: "SARIMA",
    fullName: "Seasonal ARIMA",
    details: [
      { label: "Best Parameters", value: "(p, d, q) × (P, D, Q, m)" },
      { label: "Seasonality", value: "m=12 (monthly)" },
      { label: "Grid Search", value: "216 combinations tested" }
    ]
  },
  {
    name: "SARIMAX",
    fullName: "SARIMA with eXogenous regressors",
    details: [
      { label: "Best Parameters", value: "(p, d, q) × (P, D, Q, m)" },
      { label: "Exogenous Variables", value: "Festival Index, Temperature (°C), IIP YoY%" },
      { label: "Grid Search", value: "216 combinations tested" }
    ]
  }
];

export const dataSources = [
  { title: "Electricity Requirement", source: "NITI Aayog", unit: "Megawatt Units (MU)", type: "Monthly aggregated" },
  { title: "Festival Index", source: "Custom calculation", unit: "Index", type: "Coverage: 25+ major festivals" },
  { title: "Temperature", source: "Climate data", unit: "Celsius (°C)", type: "All-India monthly average" },
  { title: "IIP YoY%", source: "Economic indicators", unit: "Percentage", type: "Industrial output growth metric" },
];

export const metricsExplanation = [
  { acronym: "MAE", name: "Mean Absolute Error", desc: "Average absolute difference between actual and predicted" },
  { acronym: "RMSE", name: "Root Mean Squared Error", desc: "Penalizes large errors" },
  { acronym: "MAPE", name: "Mean Absolute Percentage Error", desc: "Percentage error, scale-independent" },
  { acronym: "R²", name: "R-Squared", desc: "Proportion of variance explained (-∞ to 1)" },
  { acronym: "DA", name: "Directional Accuracy", desc: "Percentage of correct trend predictions" },
];