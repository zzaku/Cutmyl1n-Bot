module.exports = async (db, req, table, body) => {
    try {
      const result = await db.select(db.raw(req)).from(table).where(body).first();
      return result.message_id;
    } catch (err) {
      throw err;
    }
  };