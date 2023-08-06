const Transections = require("../models/transection");
const Category = require("../models/category");
const { Op } = require("sequelize");

/* -------------------------------------------------------------------------- */
/*                                     ADD                                    */
/* -------------------------------------------------------------------------- */
exports.add = async (req, res) => {
  try {
    const { categoryId, date, time, price, type, name, email } = req.body;
    const dbRes = await Transections.create(
      { categoryId, date, time, price, type, name, email },
      {
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["name"],
          },
        ],
      }
    );

    const categoryRes = await Category.findByPk(categoryId);

    const payload = {
      id: dbRes.id,
      category: { name: categoryRes.name },
      categoryId,
      date,
      time,
      price,
      type,
      name,
    };

    res.send({ error: false, body: payload });
  } catch (error) {
    console.log(error);
    res.send({ error: error.message, body: null });
  }
};

/* -------------------------------------------------------------------------- */
/*                                    EDIT                                    */
/* -------------------------------------------------------------------------- */
exports.edit = async (req, res) => {
  try {
    const { transectionId, categoryId, date, time, price, type, name } =
      req.body;

    const dbRes = await Transections.update(
      { categoryId, date, time, price, type, name },
      {
        where: { id: transectionId },
      }
    );

    res.send({ error: "", body: true });
  } catch (error) {
    console.log(error.message);
    res.send({ error: error.message, body: null });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */
exports.delete = async (req, res) => {
  try {
    const { transectionId } = req.body;
    await Transections.destroy({ where: { id: transectionId } });
    res.send({ error: false, body: true });
  } catch (error) {
    console.log(error.message);
    res.send({ error: error.message, body: null });
  }
};

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */

exports.get = async (req, res) => {
  try {
    const { limit, skip, search, date } = req.params;

    const where = {};

    // Filtering Search Param
    if (search !== "null") {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { price: { [Op.like]: `%${search}%` } },
        { date: { [Op.like]: `%${search}%` } },
        { time: { [Op.like]: `%${search}%` } },
        { type: { [Op.like]: `%${search}%` } },
      ];
    }

    // Filtering Date Param
    if (date !== "null") {
      where.date = date;
    }

    // Finding With Filter
    const dbRes = await Transections.findAll({
      // limit: Number(limit),
      // offset: Number(skip),
      where,
      include: { model: Category, as: "category" },
    });

    // Sending To Frontend
    res.send({ error: null, body: dbRes });
  } catch (error) {
    console.log(error.message);
    res.send({ error: error.message, body: null });
  }
};
