class UIDrawer extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const triggerId = this.getAttribute("trigger");
        const drawerTrigger = document.querySelector(`#${triggerId}`);
        const drawerBackdrop = this.querySelector(".backdrop");

        this.onKeyDown = this.onKeyDown.bind(this);
        drawerTrigger.addEventListener('click', () => this.open());
        drawerBackdrop.addEventListener('click', () => this.close());
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

    onKeyDown(event) {
        if (event.key == "Escape") {
            this.close();
        }
    }
}

customElements.define("ui-drawer", UIDrawer);

