import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config as dotenvConfig } from 'dotenv';
import fs from 'fs';

dotenvConfig();

const commonConfig = {
  plugins: [react()],
};

const config =
  process.env.ENVIRONMENT !== 'development'
    ? {
        ...commonConfig,
        server: {
          https: {
            key: fs.readFileSync(process.env.LOCATION_KEY_FILE),
            cert: fs.readFileSync(process.env.LOCATION_CERTIFICATE_FILE),
          },
        },
      }
    : commonConfig;

export default defineConfig(config);
