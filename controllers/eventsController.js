const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

async function getEvents(req, res) {
  const db = getDb();
  const collection = db.collection("events");
  const events = await collection.find({}).toArray();
  res.send(events);
}

async function getEventById(req, res) {
  const db = getDb();
  const collection = db.collection("events");
  const id = new ObjectId(req.params.id);
  const event = await collection.findOne({ _id: id });
  res.send(event);
}

async function createEvent(req, res) {
  const db = getDb();
  const collection = db.collection("events");
  const { theme, comment, date, favorite, archive } = req.body;
  const event = { theme, comment, date, favorite, archive };
  await collection.insertOne(event);
  res.send(event);
}

async function updateEvent(req, res) {
  const db = getDb();
  const collection = db.collection("events");
  const { id, theme, comment, date, favorite, archive } = req.body;
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { theme, comment, date, favorite, archive } },
    { returnDocument: "after" }
  );
  res.send(result.value);
}

async function deleteEvent(req, res) {
  const db = getDb();
  const collection = db.collection("events");
  const id = new ObjectId(req.params.id);
  const result = await collection.findOneAndDelete({ _id: id });
  res.send(result.value);
}

async function deleteArchivedEvents(req, res) {
  const db = getDb();
  const collection = db.collection("events");
  const result = await collection.deleteMany({ archive: true });
  res.send({ deletedCount: result.deletedCount });
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  deleteArchivedEvents,
};
