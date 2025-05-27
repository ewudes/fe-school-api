let _db;

function setDb(client) {
  _db = client.db('eventDatabase');
}

function getDb() {
  if (!_db) throw new Error('База данных не инициализирована');
  return _db;
}

module.exports = { setDb, getDb };
