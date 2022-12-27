import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecretKey, logInOptions } from "../../../../utils/constants";

const prisma = new PrismaClient();
const router = Router();

/**
 * Post /auth/login
 * TODO: バリデーション
 * TODO: パラメーターの存在チェック（バリデーション）
 * TODO: prismaのエラー処理
 */
router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    return res.json({ message: "email not found", token: "" });
  } else {
    bcrypt.compare(password, user.password, (error, results) => {
      if (error) {
        return res.status(400).json({ message: error.message, token: "" });
      }
      if (!results) {
        return res.json({ message: "password is incorrect.", token: "" });
      }
      const payload = { id: user.id, name: user.name, email: user.email };
      // TODO `expiresIn`は`util`に入れて定数化したい
      const token = jwt.sign(payload, jwtSecretKey, logInOptions);
      return res.json({ message: "log in", token: token });
    });
  }
});

export default router;
