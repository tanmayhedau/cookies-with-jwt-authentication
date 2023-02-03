const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cookieParser());

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.send("please login again ...");
  }
  try {
    const data = jwt.verify(token, "secret_key");
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

app.get("/", (req, res) => {
  return res.send({ message: "This is a home page🤘" });
});

app.post("/login", (req, res) => {
  const token = jwt.sign({ id: 7, role: "captain" }, "secret_key");
  return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .send({ message: "logged in successfully 👋" });
});

app.post("/protected", authorization, (req, res) => {
  return res.json({ user: { id: req.userId, role: req.userRole } });
});

app.post("/logout", authorization, (req, res) => {
  return res
    .clearCookie("access_token")
    .send({ message: "logged out successfully 👋" });
});

app.listen(3002, () => {
  console.log("express app running on port 3002");
});
