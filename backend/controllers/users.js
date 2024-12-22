const usersModel = require("../models/users_model");

async function users(req, res) {
  try {
    const result = await usersModel.users();
    res.json({ data: result });
  } catch (err) {
    console.log(err);
  }
}

async function userDetailByID(req, res) {
  const { id } = req.params;
  const result = await usersModel.usersDetailByID(id);
  if(result.length <= 0) {
    res.json({
      message: "User not found",
    });
    return;
  }
  res.json({
    message: "User found",
    data: result[0],
  });

}

module.exports = {
  users,
  userDetailByID,
};
