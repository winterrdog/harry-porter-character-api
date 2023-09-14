# Harry-porter-character-api

## description
- This is a simple api to get harry porter characters by making external requests to [harry porter api](http://hp-api.onrender.com/api).
- This api is built using `nodejs`, `expressjs`, and `redis`
- I developed this api to learn how to use `redis` as a cache to improve performance and user experience

## prerequisites
_These technologies should be installed on your machine if you attempt to use this API_
- [nodejs](https://nodejs.org/en/download/)
- [redis](https://redis.io/download)


## usage
- install dependencies
    ```bash
    npm install
    ```
- run server in production mode
    ```bash
    npm start
    ```
- run in development mode
    ```bash
    npm run start:dev
    ```
- run test
    ```bash
    npm test
    ```

## api
- get all characters
    ```bash
    GET /hogwarts/characters
    ```
- get character by id
    ```bash
    GET /hogwarts/characters/:id
    ```

## why use `redis`?
- `redis` is used as a cache to improve performance and user experience
- `redis` is used to store data from api in order to reduce the number of requests to the api since it'd be expensive to make a request to the api every time a user requests a character and also there could be a rate limit on the api
- Before storing data into redis, i first converted it into json string using `JSON.stringify()` and then stored it into redis and on retrieval, i converted it back to json object using `JSON.parse()`

## contributors
- [winterrdog](
    https://github.com/winterrdog
)

## license
- [MIT](https://opensource.org/licenses/MIT)