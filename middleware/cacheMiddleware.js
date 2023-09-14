const redis = require("redis");

// singleton class for redis client
class RedisClientSingleton {
    static _instance = null;

    static async getInstance() {
        if (!RedisClientSingleton._instance) {
            RedisClientSingleton._instance =
                await RedisClientSingleton.__makeConn();
        }

        return RedisClientSingleton._instance;
    }

    static async __makeConn() {
        const redisClient = redis.createClient();

        redisClient.on("error", function (error) {
            console.log(`Error with redis client: ${error}`);
        });

        await redisClient.connect();
        console.log("-- connected to redis server");

        return redisClient;
    }
}

async function cacheRequest(req, res, next) {
    try {
        const redisClient = await RedisClientSingleton.getInstance();

        const redisKey = req.params.id
            ? `hogwarts-characters-${req.params.id}`
            : "hogwarts-characters";

        const cachedResult = await redisClient.get(redisKey);
        if (cachedResult) {
            console.log("-- request served with cached data");

            return res.status(200).json({
                fromCache: true,
                data: JSON.parse(cachedResult),
            });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "the error on our side." });
    }
}

module.exports = { cacheRequest, RedisClientSingleton };
