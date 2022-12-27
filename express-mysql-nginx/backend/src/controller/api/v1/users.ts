import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { passwordHash } from "../../../utils/crypt";

const prisma = new PrismaClient();
const router = Router();

/**
 * GET /users
 * TODO: バリデーション
 * TODO: 返り値からパスワード削除：`findMany()`で返すカラムが選択できるはず
 */
router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
});

/**
 * GET /users/:id
 * TODO: バリデーション
 * * TODO: 返り値からパスワード削除：`findUnique()`で返すカラムが選択できるはず
 */
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  });
  res.json({ user });
});

/**
 * POST /users
 * TODO: バリデーション
 * TODO: メールアドレス重複時の処理
 */
//
router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = passwordHash(password);
  const data = { name: name, email: email, password: hashedPassword };
  try {
    const user = await prisma.user.create({ data });
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // TODO: エラーにせず登録前にチェックする
      // メールアドレス重複エラー
      res.json({ error });
    }
  }
});

/**
 * PUT /users/:id
 * TODO: バリデーション
 * TODO: 今は名前とメールアドレスが必須だが、必要な項目だけ更新できるようにする
 * TODO: パスワードも更新できるようにする
 */
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email }
    });
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.json({ error: `User with ID ${id} does not exist in the database` });
  }
});

/**
 * DELETE /users/:id
 * TODO: バリデーション
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(req.params?.id) }
    });
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.json({ error });
  }
});

export default router;
