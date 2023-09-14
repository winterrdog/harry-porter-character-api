const axios = require("axios");

class Utility {
    // fetch data from harry potter character api
    static async fetchCharacters(characterId) {
        let apiUrl = "http://hp-api.onrender.com/api";

        if (characterId) {
            apiUrl = `${apiUrl}/character/${characterId}`;
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
