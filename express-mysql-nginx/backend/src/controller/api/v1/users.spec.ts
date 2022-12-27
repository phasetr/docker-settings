import { PrismaClient } from "@prisma/client";
import supertest from "supertest";
import app from "../../../app";
import { passwordHash } from "../../../utils/crypt";
import { resetTable } from "../../../utils/resetTable";

const userRootUri = "/api/v1/users";
const prisma = new PrismaClient();

describe("user test", () => {
  beforeEach(async () => {
    await resetTable(["User"]);
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe(`GET ${userRootUri}`, () => {
    test("response with success", async () => {
      for (let i = 0; i < 3; i++) {
        const data = { id: i, name: `user${i}`, email: `user${i}@example.com`, password: passwordHash(`user${i}`) };
        prisma.user.create({ data });
      }
      const users = await prisma.user.findMany();

      const response = await supertest(app).get(userRootUri);
      expect(response.status).toBe(200);
      expect(response.body.users).toEqual(users);
    });
  });

  describe(`GET ${userRootUri}/:id`, () => {
    test("response with success", async () => {
      const data = { id: 1, name: "user1", email: "user1@example.com", password: passwordHash("user1") };
      const user = await prisma.user.create({ data });

      const response = await supertest(app).get(`${userRootUri}/1`);
      expect(response.status).toBe(200);
      expect(response.body.user).toEqual(user);
    });
  });

  describe(`POST ${userRootUri}`, () => {
    test("response with success", async () => {
      const body = { id: 1, name: "user1", email: "user1@example.com", password: "user1" };
      const response = await supertest(app).post(`${userRootUri}`).send(body);
      expect(response.status).toBe(200);
      expect(response.body.user).toEqual({ id: body.id, name: body.name, email: body.email });

      const users = await prisma.user.findMany();
      expect(users.length).toBe(1);
    });
  });

  describe(`PUT ${userRootUri}/:id`, () => {
    test("response with success", async () => {
      const data = { id: 1, name: "user1", email: "user1@example.com", password: passwordHash("user1") };
      await prisma.user.create({ data });

      const body = { name: "updated", email: "updated@example.com" };
      const response = await supertest(app).put(`${userRootUri}/1`).send(body);
      expect(response.status).toBe(200);
      expect(response.body.user.name).toEqual(body.name);
      expect(response.body.user.email).toEqual(body.email);

      const after = await prisma.user.findUnique({ where: { id: 1 } });
      expect(after?.name).toEqual(body.name);
      expect(after?.email).toEqual(body.email);
    });
  });

  describe(`DELETE ${userRootUri}/:id`, () => {
    test("response with success", async () => {
      const data = { id: 1, name: "user1", email: "user1@example.com", password: passwordHash("user1") };
      const user = await prisma.user.create({ data });

      const response = await supertest(app).delete(`${userRootUri}/1`);
      expect(response.status).toBe(200);
      expect(response.body.user).toEqual({ id: user.id, name: user.name, email: user.email });

      const users = await prisma.user.findMany();
      expect(users.length).toBe(0);
    });
  });
});
