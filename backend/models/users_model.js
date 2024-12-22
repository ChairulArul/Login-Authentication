const connection = require("../db");

async function users() {
  const [result] = await connection.execute("select * from tbl_users");
  return result;
}

async function usersDetailByID(id) {
  try {
    const [result] = await connection.execute(
      "select * from tbl_users where id =?",
      [id]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  users,
  usersDetailByID
};
