const axios = require("axios");

class Utility {
    // fetch data from harry potter character api
    static async fetchCharacters(characterId) {
        const apiUrl = "http://hp-api.onrender.com/api";

        if (characterId) {
            apiUrl = `${apiUrl}/characters/${characterId}`;
        } else {
            apiUrl = `${apiUrl}/characters`;
        }

        const response = await axios.get(apiUrl);

        console.log("-- request to " + apiUrl + " was successful");

        return response.data;
    }
}

module.exports = {
    Utility,
};
