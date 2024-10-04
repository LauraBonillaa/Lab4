import * as components from "./components/index"
import Character, { Attribute } from "./components/character/character"
import { getCharacters } from "./services/dataFetch"

class AppContainer extends HTMLElement {

    cards: Character[] = [];
    dataApi: any[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.dataApi = await getCharacters();
        this.render();
    }

    async getEpisodeName(episodeUrl: string): Promise<string> {
        try {
            const response = await fetch(episodeUrl);
            const episodeData = await response.json();
            return episodeData.name;
        } catch (error) {
            console.error("Error fetching episode:", error);
            return "Unknown";
        }
    }

    async createCardsRickandMorty(cardCount: number) {
        this.cards = [];

        // Iteramos sobre los primeros "cardCount" elementos de dataApi
        for (const element of this.dataApi.slice(0, cardCount)) {
            const card = this.ownerDocument.createElement("card-character") as Character;
            
            // Asignar atributos del personaje
            card.setAttribute(Attribute.image, element.image);
            card.setAttribute(Attribute.name, element.name);
            card.setAttribute(Attribute.status, element.status);
            card.setAttribute(Attribute.species, element.species);
            card.setAttribute(Attribute.type, element.type);
            card.setAttribute(Attribute.origin, element.origin.name);

            // Llamada adicional para obtener el nombre del primer episodio
            const episodeName = await this.getEpisodeName(element.episode[0]);
            card.setAttribute(Attribute.episode, episodeName);

            this.cards.push(card);
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div>
                    <input id="cardCount" type="number" placeholder="Enter number of cards" min="1" max="${this.dataApi.length}" />
                    <button id="renderButton">Render Cards</button>
                </div>
                <div id="cardContainer"></div>
            `;

            const renderButton = this.shadowRoot.querySelector("#renderButton") as HTMLButtonElement;
            const cardCountInput = this.shadowRoot.querySelector("#cardCount") as HTMLInputElement;
            const cardContainer = this.shadowRoot.querySelector("#cardContainer") as HTMLDivElement;

            renderButton.addEventListener("click", () => {
                const cardCount = parseInt(cardCountInput.value) || 0;
                cardContainer.innerHTML = "";
                
                // Llamada a la función para crear las tarjetas
                this.createCardsRickandMorty(cardCount).then(() => {
                    this.cards.forEach((card) => {
                        cardContainer.appendChild(card);
                    });
                });
            });
        }
    }
}

customElements.define("app-container", AppContainer);
