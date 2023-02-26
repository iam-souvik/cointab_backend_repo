const express = require("express")
const cors = require("cors")

const app = express()

const env = require("dotenv")
const ConnectDB = require("./config/connect")
const UserModel = require("./Model/UserModel")

env.config()
app.use(express.json())
app.use(cors())


let PORT = process.env.PORT || 8080


app.get("/", (req, res) => {

  res.send("Api start")
})

app.post("/api", async (req, res) => {
  // console.log(req.body,"body");
  const Users = await UserModel.create(req.body)
  //   await Users.save() 

  res.send(Users)

})



app.get("/api", async (req, res) => {
  const { page = 1, gender,age } = req.query;
 let obj = {};
 if(gender){
  obj.gender = gender;
 }
  const userdata = await UserModel.find(obj).limit(10).skip((page - 1) * 10)
  res.send(userdata)

})






app.delete("/delete", (req, res) => {
  const userDelete = UserModel.db.dropCollection()
  res.send(userDelete)
})



app.listen(PORT, async () => {
  await ConnectDB()
  console.log(`server start on Port ${PORT}`);
})