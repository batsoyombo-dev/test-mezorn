import express from "express";
import mainRouter from "./src/routes/api-routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", mainRouter);

// App listen
app.listen(8000, () => {
    console.log("Server started on port: " + 5000);
});
