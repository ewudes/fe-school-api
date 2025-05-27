const express = require("express");
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const { setDb } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Подключаем маршруты
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname, "public")));

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

(async () => {
  try {
    await client.connect();
    setDb(client); // установка базы

    // Роуты API
    app.use("/api/auth", authRoutes);
    app.use("/api/events", eventRoutes);

    // Отдача index.html при заходе на корень
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    // Запуск сервера
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on http://localhost:" + (process.env.PORT || 3000));
    });
  } catch (err) {
    console.error("Ошибка подключения к MongoDB:", err);
  }
})();
