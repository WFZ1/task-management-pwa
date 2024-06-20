import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: manifest as Partial<ManifestOptions>,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
