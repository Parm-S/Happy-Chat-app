import e from "express";
import { PORT } from "./config/index.js";

const app = e();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, console.log(`Server started on Port - ${PORT}`));
