module.exports = async (db, table, req, body) => {
    try {
        const result = await db.table(table).where(req).update(body);
        return result.webhook;
    } catch (err) {
        throw err;
    }
  };