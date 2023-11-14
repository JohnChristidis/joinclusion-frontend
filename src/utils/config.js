let config;

if (import.meta.env.VITE_ENVIRONMENT === 'development') {
  config = {
    backendUrl: "http://localhost:3000",
  };
} else {
  config = {
    backendUrl: import.meta.env.VITE_BACKENDURL,
  };
}

export { config };
