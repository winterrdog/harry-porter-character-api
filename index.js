const express = require("express");
const { cacheRequest, RedisClientSingleton } = require("./cacheMiddleware");
const { Utility } = require("./utility");

const port = process.env.PORT ?? 3000;
const app = express();

// connect to redis
let redisClient;
(async function () {
    redisClient = await RedisClientSingleton.getInstance();
})();

// fetch all characters
app.get("/hogwarts/characters", cacheRequest, async function (req, res, next) {
    try {
        const results = await Utility.fetchCharacters();
        if (results.length === 0) {
            return res.status(404).json({ msg: "data unavailable" });
        }

        // store in redis cache
        const redisKey = "hogwarts-characters";
        await redisClient.set(redisKey, JSON.stringify(results), {
            EX: 2 * 60, // 2 minutes
            NX: true, // only set if key does not exist
        });

        return res.status(200).json({
            fromCache: false,
            data: results,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "the error on our side." });
    }
});

// fetch single character
app.get(
    "/hogwarts/characters/:id",
    cacheRequest,
    async function (req, res, next) {
        try {
            const character = await Utility.fetchCharacters(req.params.id);
            if (character.length === 0) {
                return res.status(404).json({ msg: "data unavailable" });
            }

            // store in redis cache
            const redisKey = `hogwarts-characters-${req.params.id}`;
            await redisClient.set(redisKey, JSON.stringify(character), {
                EX: 2 * 60, // 2 minutes
                NX: true, // only set if key does not exist
            });

            return res.status(200).json({
                fromCache: false,
                data: character,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "the error on our side." });
        }
    }
);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
