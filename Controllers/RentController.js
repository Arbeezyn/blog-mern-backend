import RentModel from "../models/Rent.js";

export const getAllRent = async (req, res) => {
  try {
    const rents = await RentModel.find().exec();
    res.json(rents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

export const getOneRent = async (req, res) => {
  try {
    const rentId = req.params.id;
    const doc = await RentModel.findOne({ _id: rentId }).exec();

    if (!doc) {
      res.status(404).json({ message: "Не найден заказ" });
    } else {
      res.json(doc);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

export const removeRent = async (req, res) => {
  try {
    const rentId = req.params.id;

    const doc = await RentModel.findOneAndDelete({ _id: rentId }).exec();

    if (!doc) {
      res.status(404).json({ message: "Не найден заказ" });
    } else {
      res.json({ message: "Заказ удален" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

export const createRent = async (req, res) => {
  try {
    const doc = new RentModel({
      name: req.body.name,
      area: req.body.area,
      phone: req.body.phone,
      email: req.body.email,
    });

    const rent = await doc.save();

    res.json(rent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};
