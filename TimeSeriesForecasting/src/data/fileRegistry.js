export const visualizationRegistry = {
  "EDA (Exploratory Data Analysis)": [
    { title: "Time Series Overview", src: "/results/visualizations/01_time_series_overview.png" },
    { title: "Correlation Matrix", src: "/results/visualizations/02_correlation_matrix.png" },
    { title: "Distributions", src: "/results/visualizations/03_distributions.png" },
    { title: "Seasonal Decomposition", src: "/results/visualizations/04_seasonal_decomposition.png" },
    { title: "Train/Val/Test Split", src: "/results/visualizations/05_train_val_test_split.png" },
    { title: "ACF & PACF Plots", src: "/results/visualizations/06_acf_pacf_plots.png" },
  ],
  "Model Performance": [
    { title: "Model Comparison Metrics", src: "/results/evaluations/10_model_comparison.png" },
    { title: "Actual vs Predicted (Individual)", src: "/results/visualizations/11_actual_vs_predicted_individual.png" },
    { title: "Actual vs Predicted (All)", src: "/results/visualizations/12_actual_vs_predicted_all_models.png" },
    { title: "Test Set Comparison", src: "/results/visualizations/13_test_set_comparison.png" },
  ],
  "Diagnostics & Forecasts": [
    { title: "ARIMA Residuals", src: "/results/visualizations/07_ARIMA_residuals.png" },
    { title: "SARIMA Residuals", src: "/results/visualizations/08_SARIMA_residuals.png" },
    { title: "SARIMAX Residuals", src: "/results/visualizations/09_SARIMAX_residuals.png" },
    { title: "Future Forecasts (6 Months)", src: "/results/forecasts/14_future_forecasts.png" },
  ]
};

//every actual result thing
export const datasetRegistry = [
  { id: "metrics", name: "1. Model Comparison Metrics", path: "/results/evaluations/model_comparison_metrics.csv" },
  { id: "forecasts", name: "2. Future Forecasts", path: "/results/forecasts/future_forecasts_6months.csv" },
  { id: "stationarity", name: "3. Stationarity Tests", path: "/reports/stationarity_tests.csv" },
  { id: "arima_grid", name: "4. ARIMA Grid Search Results", path: "/reports/ARIMA_grid_search_results.csv" },
  { id: "sarima_grid", name: "5. SARIMA Grid Search Results", path: "/reports/SARIMA_grid_search_results.csv" },
  { id: "sarimax_grid", name: "6. SARIMAX Grid Search Results", path: "/reports/SARIMAX_grid_search_results.csv" },
];

//raw data
export const rawDataRegistry = [
  { 
    id: "electricity", 
    name: "Electricity Requirement", 
    path: "/data/raw/electricity_requirement_mu_2015_2025.csv",
    sourceUrl: "https://iced.niti.gov.in/energy/electricity/distribution/national-level-consumption",
    type: "redirect"
  },
  { 
    id: "weather", 
    name: "Temperature Data", 
    path: "/data/raw/temperature_india_monthly_2015_2025.csv",
    sourceUrl: "https://www.data.gov.in/resource/seasonal-and-annual-mean-temperature-series-period-1901-2021",
    type: "redirect"
  },
  { 
    id: "iip", 
    name: "IIP YoY%", 
    path: "/data/raw/iip_yoy_2014_2025.csv",
    sourceUrl: "https://in.investing.com/economic-calendar/indian-industrial-production-435",
    type: "redirect"
  },
  { 
    id: "festival", 
    name: "Festival Index", 
    path: "/data/raw/monthly_festival_index_detailed_2015_2025.csv",
    type: "download"
  }
];