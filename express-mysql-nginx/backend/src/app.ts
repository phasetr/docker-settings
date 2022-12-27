import express from "express";
import helmet from "helmet";
import login from "./controller/api/v1/auth/login";
import logout from "./controller/api/v1/auth/logout";
import users from "./controller/api/v1/users";
import authUser from "./controller/api/v1/auth/user";

const app = express();
app.use(express.json());
app.use(helmet());

app.use("/api/v1/users", users);
app.use("/api/v1/auth/login", login);
app.use("/api/v1/auth/logout", logout);
app.use("/api/v1/auth/user", authUser);

app.get("/api/v1/", (req, res) => {
  res.json({ data: "Check: api/v1 root!" });
});

app.get("/", (req, res) => {
  res.json({ data: "Check: express booted!" });
});

export default app;
