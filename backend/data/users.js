import bcrypt from "bcryptjs";

export const users = [
  {
    name: "Admin user",
    email: "admin@test.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Bohdan Bilyk",
    email: "bohdan@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Oleg Slusarenko",
    email: "oleg@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Roman Dzen",
    email: "roman@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
