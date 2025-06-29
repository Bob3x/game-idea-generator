import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: ["lucide-react"]
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Separate vendor chunks for better caching
                    "pdf-libs": ["jspdf", "html2canvas"],
                    supabase: ["@supabase/supabase-js"],
                    lucide: ["lucide-react"],
                    "react-vendor": ["react", "react-dom"]
                }
            }
        },
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 600
    }
});
