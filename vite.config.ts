import { build, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
    const { VITE_CHAT_MODULE_SERVER } = loadEnv(mode, ".");

    return {
        plugins: [
            react(),
            federation({
                remotes: {
                    chatModule: "/chat/assets/remoteEntry.js",
                },
                shared: ["react", "react-dom"],
            }),
        ],
        build: {
            target: "esnext",
            modulePreload: true,
            minify: false,
        },
        server: {
            proxy: {
                "/chat": {
                    target: VITE_CHAT_MODULE_SERVER,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/chat/, ""),
                },
            },
        },
    };
});
