module.exports = async (db, req, table, body) => {
    try {
      const result = await db.select(db.raw(req)).from(table).where(body);
      return result;
    } catch (err) {
      throw err;
    }
};