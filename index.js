import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import { handleValidationErrors, checkAuth } from "./utils/index.js";

import {
  register,
  login,
  getMe,
  create,
  remove,
  update,
  getAll,
  getOne,
  getTags,
} from "./Controllers/index.js";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validation.js";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.gvhafjn.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/auth/login", loginValidation, handleValidationErrors, login);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);

app.get("/auth/me", checkAuth, getMe);

app.get("/posts", getAll);
app.get("/tags", getTags);
app.get("/posts/:id", getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  create
);
app.delete("/posts/:id", remove);
app.patch("/posts/:id", postCreateValidation, handleValidationErrors, update);

app.listen(4444, (err) => {
  if (err) throw err;
  console.log("Listening on port 4444");
});
