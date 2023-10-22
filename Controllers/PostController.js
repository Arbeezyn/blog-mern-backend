import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate({ path: "user", select: ["fullName", "avatarUrl"] })
      .exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
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
      tags: req.body.tags,
      user: req.userId,
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
        user: req.userId,
        tags: req.body.tags,
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

export const getTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((post) => {
        return post.tags;
      })
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};
