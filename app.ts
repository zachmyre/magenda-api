import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { mongo } from "./config/mongodb";

const userRoutes = require("./routes/user.routes");

const app = express();
const port = 8080;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "templates")));
app.use("./templates/images", express.static(__dirname + "/templates/images"));
app.use(cors());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.sendFile("templates/index.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
  mongo();
});
