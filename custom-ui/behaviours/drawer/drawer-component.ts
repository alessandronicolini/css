import { DrawerController } from "./drawer-controller";

export class UIDrawer extends HTMLElement {
    private controller: DrawerController;

    constructor() {
        super();
        this.controller = new DrawerController(this);
    }

    connectedCallback() {
       this.controller.initialize();
    }
}

customElements.define("ui-drawer", UIDrawer);