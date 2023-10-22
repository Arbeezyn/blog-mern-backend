import jws from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jws.verify(token, "flugegenheimen");

      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Нет доступа" });
    }
  } else {
    return res.status(401).json({ message: "Пользователь не авторизован" });
  }
};
