module.exports = async (knex, table, body) => {
    try {
      await knex(table).insert(body);
      return true;
    } catch (error) {
      console.error(`Error inserting user: ${error.message}`);
      return false;
    }
};