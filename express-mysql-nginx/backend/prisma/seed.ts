import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  const taroData = {
    email: "taro@example.com",
    name: "taro",
    password: bcrypt.hashSync("taro", saltRounds)
  };
  await prisma.user.upsert({
    where: { email: "taro@example.com" },
    update: {},
    create: taroData
  });

  const jiroData = {
    email: "jiro@example.com",
    name: "jiro",
    password: bcrypt.hashSync("jiro", saltRounds)
  };
  await prisma.user.upsert({
    where: { email: "jiro@example.com" },
    update: {},
    create: jiroData
  });
}

main()
  .catch((_e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
