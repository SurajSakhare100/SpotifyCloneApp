import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Manually load .env file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_SPOTIFY_CLIENT_ID': JSON.stringify(process.env.VITE_SPOTIFY_CLIENT_ID),
    'import.meta.env.VITE_REDIRECT_URI': JSON.stringify(process.env.VITE_REDIRECT_URI),
  },
});
