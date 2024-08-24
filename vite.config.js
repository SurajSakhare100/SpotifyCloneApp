import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Manually load .env file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    https: false, // Ensure HTTPS is disabled
    port: 5173, // Make sure the port is correct
  },
});
