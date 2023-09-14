const express = require("express");
const characterRouter = require("./routes");

const port = process.env.PORT ?? 3000;
const app = express();

app.use("/hogwarts/characters", characterRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
