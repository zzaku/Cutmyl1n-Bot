module.exports = async (db, req, table, column, body) => {
    try {
      const result = await db.select(db.raw(req)).from(table).where(column, body);
      return result;
    } catch (err) {
      throw err;
    }
  };