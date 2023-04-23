module.exports = async (db, req, table, column, body) => {
    try {
      const result = await db.select(db.raw(req)).from(table).where(column, body);
      return result[0].count < 3;
    } catch (err) {
      throw err;
    }
  };