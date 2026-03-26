import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

import bcrypt from "bcryptjs";

import User from "../models/User.js";

describe("Auth User", function () {
  this.timeout(5000);

  beforeEach(async () => {
    await User.deleteMany({});

    const hash = await bcrypt.hash("123456", 10);

    await User.create({
      email: "test@example.com",
      password: hash,
    });
  });

  it("Debería registrar un usuario", async function () {
    const res = await request(app).post("/auth/register").send({
      email: "new.user@example.com",
      password: "123456",
    });

    expect(res.status).to.equal(201);
  });

  it("Debería poder obtener un token", async function () {
    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });

  it("Debería enviar un status 401 si no envió el token", async function () {
    const res = await request(app).get("/auth/profile");

    expect(res.status).to.equal(401);
  });

  it("Debería retornar el profile con el token valido", async function () {
    const login = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const token = login.body.token;

    const res = await request(app)
      .get("/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    // console.log(res.status, res.body);

    expect(res.status).to.equal(200);
  });
});
