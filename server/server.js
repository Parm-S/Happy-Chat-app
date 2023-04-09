import e from "express";
import { PORT } from "./config/index.js";
import { connectDB } from "./DB/connection.js";
import colors from "colors";
import { router } from "./route/index.js";

colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "green",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red",
});

const app = e();
connectDB();

app.use(e.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", router);

app.listen(PORT, console.log(`Server started on Port - ${PORT}`.info));
