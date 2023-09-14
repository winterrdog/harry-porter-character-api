const express = require("express");
const { charactersRoutes } = require("./routes");

const port = process.env.PORT ?? 3000;
const app = express();

app.use("/hogwarts/characters", charactersRoutes);

app.listen(port, () => {
    console.log(`-- server listening on port ${port}`);
});
