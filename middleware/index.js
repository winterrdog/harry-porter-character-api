const { cacheRequest, RedisClientSingleton } = require("./cacheMiddleware");

module.exports = {
    cacheRequest,
    RedisClientSingleton,
};
