import express from "express";
import mainRouter from "./src/routes/api-routes";

const app = express();

// Routes
app.use("/", mainRouter);

app.listen(8000, () => {
    console.log("Server started on port: " + 5000);
});
