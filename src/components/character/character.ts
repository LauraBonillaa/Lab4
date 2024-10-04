export enum Attribute {
    "name" = "name",
    "status" = "status",
    "species" = "species",
    "type" = "type",
    "origin" = "origin",
    "image" = "image",
    "episode" = "episode"
}


class Character extends HTMLElement {

    name?: string;
    status?: string;
    species?: string;
    type?: string;
    origin?: string;
    image?: string;
    episode?: string;



    static get observedAttributes() {
        return Object.keys(Attribute)
    }
    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string) {
        this[propName] = newValue
        this.render()
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <section>
            <img id="img" src="${this.image ? this.image : 'Not found'}">
            <p>${this.name}</p>
            <p>${this.status}</p>
            <p>${this.species}</p>
            <p>${this.type}</p>
            <p>${this.origin}</p>
            <p>${this.episode}</p>

            
            </section>
            `;
        }
    }
}

customElements.define('card-character', Character);
export default Character;