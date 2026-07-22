const API_BASE = "https://catalogue-slip-chances-addressed.trycloudflare.com/api";
export const endpoints = {
  overview: `${API_BASE}/overview`,
  dashboard: `${API_BASE}/dashboard`,
  security: `${API_BASE}/security`,
  projects: `${API_BASE}/projects`,
  activity: `${API_BASE}/activity`,

  // We'll implement these in Flask later
  images: `${API_BASE}/images`,
  deployments: `${API_BASE}/deployments`,
  compliance: `${API_BASE}/compliance`,
  alerts: `${API_BASE}/alerts`,
};