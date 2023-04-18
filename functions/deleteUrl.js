module.exports = async (knex, table, body) => {
    try {
      await knex(table).where(body).del();
      return true;
    } catch (error) {
      console.error(`Error inserting user: ${error.message}`);
      return false;
    }
};
  