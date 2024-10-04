export const getCharacters = async () => {
    try {
        const characterdata = await fetch("https://rickandmortyapi.com/api/character").then(res => res.json());
     
        return characterdata.results ;
    } catch (error) {
        console.error(error);
    }
}

async function getFirstEpisodeByCharacterName(characterName: string): Promise<string> {
    const baseUrl = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(characterName)}`;
  
    try {
      // Fetch character data by name
      const characterResponse = await fetch(baseUrl);
      const characterData = await characterResponse.json();
  
      if (characterData.results.length === 0) {
        throw new Error("No character found with the given name.");
      }
  
      // Get the first character from the results
      const character = characterData.results[0];
  
      if (!character.episode || character.episode.length === 0) {
        throw new Error("No episodes found for this character.");
      }
  
      // Get the URL of the first episode
      const firstEpisodeUrl = character.episode[0];
  
      // Fetch the episode details
      const episodeResponse = await fetch(firstEpisodeUrl);
      const episodeData = await episodeResponse.json();
  
      return episodeData.name; // Return the name of the first episode
    } catch (error) {
      console.error("Error fetching episode data:", error);
      throw error;
    }
  }
  
  
  