import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный электронный адрес").isEmail(),
  body("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
  body("fullName", "Минимальная длина имени 2 символа").isLength({ min: 2 }),
  body("avatarUrl", "Неверная ссылка на аватар").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный электронный адрес").isEmail(),
  body("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Введите теги статьи").optional().isString(),
  body("imageUrl", "Неверная ссылка на картинку").optional().isString(),
];
