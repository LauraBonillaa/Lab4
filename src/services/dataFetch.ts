export const getCharacters = async () => {
    try {
        const characterdata = await fetch("https://rickandmortyapi.com/api/character").then(res => res.json());
     
        return characterdata.results ;
    } catch (error) {
        console.error(error);
    }
}

