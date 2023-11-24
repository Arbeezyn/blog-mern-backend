import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1000;
  const skip = (page - 1) * limit;

  try {
    const data = await PostModel.find().skip(skip).limit(limit);
    res.json(data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOne({ _id: postId }).exec();

    if (!doc) {
      res.status(404).json({ message: "Статья не найдена" });
    } else {
      res.json(doc);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndDelete({ _id: postId }).exec();

    if (!doc) {
      res.status(404).json({ message: "Статья не найдена" });
    } else {
      res.json({ message: "Статья удалена" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
      },
      {
        returnDocument: "after",
      }
    ).exec();

    if (!doc) {
      res.status(404).json({ message: "Статья не найдена" });
    } else {
      res.json(doc);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};
