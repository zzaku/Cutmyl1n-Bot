module.exports = async (db, req, table, column, body) => {
    try {
      const result = await db.select(db.raw(req)).from(table).where(column, body).first();
      return result.count > 0;
    } catch (err) {
      throw err;
    }
  };