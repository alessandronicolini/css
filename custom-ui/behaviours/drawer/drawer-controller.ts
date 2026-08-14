export class DrawerController {
    private root: HTMLElement;
    private trigger: HTMLElement | undefined;
    private backdrop?: HTMLElement | undefined;

    constructor(element: HTMLElement) {
        this.root = element;
        this.initialize();
    }

    initialize() {
        console.log("Drawer Instantiated!");
        this.initializeTrigger();
        this.initializeBackdrop();
    }

    private initializeTrigger() {
        const triggerId = this.root.dataset.behaviourTrigger;
        if (!triggerId) {
            return;
        }

        this.trigger = document.getElementById(triggerId) ?? undefined;
        if (!this.trigger) {
            console.log("trigger not found");
        }

        this.trigger?.addEventListener('click', this.onTriggerClick);
    }

    private initializeBackdrop() {
        this.backdrop = this.root.querySelector<HTMLElement>(".ui-drawer__backdrop") ?? undefined;
        if (!this.backdrop) {
            this.backdrop = document.createElement("div");
            this.backdrop.classList.add("ui-drawer__backdrop");

            this.root.prepend(this.backdrop);
        }

        this.backdrop.addEventListener(
            "click",
            this.onBackdropClick
        );
    }

    private onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            this.close();
        }
    }
    
    private onTriggerClick = () => {
        this.open();
    }

    private onBackdropClick = () => {
        this.close();
    }

    get isOpen(): boolean {
        return this.root.hasAttribute("open");
    }

    open() {
        if (this.isOpen) {
            return;
        }

        this.root.classList.add("is-animating")
        this.root.setAttribute("open", "");

        document.addEventListener("keydown", this.onKeyDown);

        requestAnimationFrame(() => {
            this.root.classList.remove("is-animating");
        });
    }

    close() {
        if (!this.isOpen) {
            return;
        }
        this.root.classList.add("is-animating")
        this.root.removeAttribute("open");

        document.removeEventListener("keydown", this.onKeyDown);

        setTimeout(() => {
            this.root.classList.remove("is-animating");
        }, 250);
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    destroy() {
        this.trigger?.removeEventListener("click", this.onTriggerClick);
        this.backdrop?.removeEventListener("click", this.onBackdropClick);
        document.removeEventListener("keydown", this.onKeyDown);
    }
}

