const express = require("express");
const { Utility } = require("./utility");

const port = process.env.PORT ?? 3000;
const app = express();

// fetch all characters
app.get("/hogwarts/characters", async function (req, res, next) {
    try {
        const characters = await Utility.fetchCharacters();

        if (characters.length === 0)
            return res.status(404).json({ msg: "data unavailable" });

        return res.status(200).json({
            fromCache: false,
            data: characters,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "!-- the error on our side." });
    }
});

// fetch single character
app.get("/hogwarts/characters/:id", async function (req, res, next) {
    try {
        const character = await Utility.fetchCharacters(req.params.id);

        if (character.length === 0)
            return res.status(404).json({ msg: "data unavailable" });

        return res.status(200).json({
            fromCache: false,
            data: character,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "!-- the error on our side." });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
