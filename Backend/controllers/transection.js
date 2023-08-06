const Transections = require("../models/transection");
const Category = require("../models/category");

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
    const { limit, skip } = req.params;

    const dbRes = await Transections.findAll({
      // limit: Number(limit),
      // offset: Number(skip),
      include: { model: Category, as: "category" },
    });

    res.send({ error: null, body: dbRes });
  } catch (error) {
    console.log(error.message);
    res.send({ error: error.message, body: null });
  }
};
