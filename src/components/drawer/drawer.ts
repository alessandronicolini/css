import "./drawer.scss";

class Drawer extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        console.log("drawer created!");
        const triggerId = this.getAttribute("trigger");
        if (triggerId) {
            const drawerTrigger = document.querySelector<HTMLElement>(`#${triggerId}`);
            if (drawerTrigger) {
                drawerTrigger.addEventListener('click', () => this.open());
            }
        }
        
        const drawerBackdrop = this.querySelector<HTMLElement>(".backdrop");
        if (drawerBackdrop) {
            drawerBackdrop.addEventListener('click', () => this.close());
        }

        this.onKeyDown = this.onKeyDown.bind(this);

    }

    open() {
        this.classList.add("is-animating")
        this.setAttribute("open", "");
        document.addEventListener("keydown", this.onKeyDown);

        requestAnimationFrame(() => {
            this.classList.remove("is-animating");
        });
    }

    close() {
        this.classList.add("is-animating")
        this.removeAttribute("open");
        document.removeEventListener("keydown", this.onKeyDown);

        setTimeout(() => {
            this.classList.remove("is-animating");
        }, 250);
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.key == "Escape") {
            this.close();
        }
    }
}

customElements.define("ui-drawer", Drawer);

