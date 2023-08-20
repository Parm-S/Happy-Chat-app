import e from "express";
import cors from "cors";
import { PORT } from "./config/index.js";
import { connectDB } from "./DB/connection.js";
import colors from "colors";
import { router } from "./route/index.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

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

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-production-domain.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(e.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started on Port - ${PORT}`.info));
