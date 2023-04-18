module.exports = async (db, req, table, originalUrl, shortUrl) => {
    try {
      const result = await db.select(db.raw(req)).from(table).where(originalUrl).orWhere(shortUrl).first();
      return result.count > 0;
    } catch (err) {
      throw err;
    }
  };