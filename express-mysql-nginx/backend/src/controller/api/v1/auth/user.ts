import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../../../utils/constants";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const bearToken = req.headers.authorization;
  console.log(req.headers);

  const bearer = bearToken?.split(" ");
  const token = bearer ? bearer[1] : "";
  console.log(token);

  jwt.verify(token, jwtSecretKey, (error, user) => {
    if (error) {
      return res.json({ message: error.message });
    } else {
      return res.json({ message: "success", user });
    }
  });
});

export default router;
