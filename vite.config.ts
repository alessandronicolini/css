import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
    if (command === "serve") {
        return {
            root: "showcase",
        };
    }

    return {
        build: {
            lib: {
                entry: "src/index.ts",
                name: "CustomUI",
                fileName: "custom-ui",
            }
        }
    };
});