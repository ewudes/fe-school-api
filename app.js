const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const objectId = require("mongodb").ObjectId;
require('dotenv').config();
    
const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 
app.use(express.static(__dirname + "/public"));
 
 
(async () => {
     try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("eventDatabase").collection("events");
        await app.listen(process.env.PORT || 3000);
        console.log("Сервер ожидает...");
    }catch(err) {
        return console.log(err);
    } 
})();
 
 
app.get("/api/events", async(req, res) => {
         
    const collection = req.app.locals.collection;
    try{
        const events = await collection.find({}).toArray();
        res.send(events);
    }
    catch(err){return console.log(err);}
      
});
app.get("/api/events/:id", async(req, res) => {
         
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    try{
        const event = await collection.findOne({_id: id});
        res.send(event);
    }
    catch(err){return console.log(err);}
});
    
app.post("/api/events", jsonParser, async(req, res)=> {
        
    if(!req.body) return res.sendStatus(400);
        
    const eventTheme = req.body.theme;
    const eventComment = req.body.comment;
    const eventDate = req.body.date;
    let event = {theme: eventTheme, comment: eventComment, date: eventDate};
        
    const collection = req.app.locals.collection;
     
    try{
        await collection.insertOne(event);
        res.send(event);
    }
    catch(err){return console.log(err);}
});
     
app.delete("/api/events/:id", async(req, res)=>{
         
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    try{
        const result = await collection.findOneAndDelete({_id: id});
        const event = result.value;
        res.send(event);
    }
    catch(err){return console.log(err);}
});
    
app.put("/api/events", jsonParser, async(req, res)=>{
         
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const eventTheme = req.body.theme;
    const eventComment = req.body.comment;
    const eventDate = req.body.date;
        
    const collection = req.app.locals.collection;
    try{
        const result = await collection.findOneAndUpdate({_id: id}, { $set: {date: eventDate, comment: eventComment, theme: eventTheme}},
         {returnDocument: "after" });
        const event = result.value;
        res.send(event);
    }
    catch(err){return console.log(err);}
});
  
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async() => {
     
    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});