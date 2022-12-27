import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecretKey, logOutOptions } from "../../../../utils/constants";

const router = Router();

/**
 * Post /auth/logout
 * TODO: バリデーション
 * TODO: パラメーターの存在チェック（バリデーション）
 * TODO: prismaのエラー処理
 */
router.delete("/", function(req, res) {
  if (!("authorization" in req.headers)) {
    res.send({ message: "You need an authorization header!", token: "" });
  }
  const authHeader = req.headers["authorization"] as string;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, jwtSecretKey, (error, decode) => {
    if (error) {
      return res.send({ message: error.message, token: "" });
    }
    const obj = decode as JwtPayload;
    const payload = { id: obj.id, name: obj.name, email: obj.email };
    jwt.sign(payload, jwtSecretKey, logOutOptions, (error, token) => {
      if (error) {
        res.send({ message: error.message, token: "" });
      }
      res.send({ message: "Log out", token: token });
    });
  });
});

export default router;
