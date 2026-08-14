export * from "./drawer";

import { DrawerController } from "./drawer";

const controllers = {
    drawer: DrawerController,
};

export function bootstrap(root: ParentNode = document) {
    root.querySelectorAll<HTMLElement>("[data-behaviour]").forEach((element) => {
        const name = element.dataset.behaviour;
        if (!name) {
            return;
        }

        const Controller = controllers[name as keyof typeof controllers];
        if (!Controller) {
            console.warn(`Unknown UI controller: ${name}`);
            return;
        }

        new Controller(element);
    });
}