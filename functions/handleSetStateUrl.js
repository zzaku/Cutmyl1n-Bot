module.exports = async (knex, table, req, body) => {
    try {
      await knex(table).where(req).update(body);
      return true;
    } catch (error) {
      console.error(`Error inserting url into database: ${error.message}`);
      return false;
    }
  };