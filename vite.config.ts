import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
    if (mode === "library") {
        return {
            build: {
                lib: {
                    entry: "custom-ui/index.ts",
                    name: "CustomUI",
                    fileName: "custom-ui",
                },

                outDir: "dist/lib",
                emptyOutDir: true,
            },
        }
    };

    return {
        root: "showcase",
        build: {
            outDir: "../dist/showcase",
            emptyOutDir: true,
        },
    };

});