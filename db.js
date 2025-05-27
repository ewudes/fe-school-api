let _db = null;

function setDb(client) {
  _db = client.db("eventDatabase");
}

function getDb() {
  if (!_db) throw new Error("Database not initialized");
  return _db;
}

module.exports = { setDb, getDb };
