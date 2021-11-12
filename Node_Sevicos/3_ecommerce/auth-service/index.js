const express =  require("express")
const app = express()
const PORT = process.env.PORT_ONE || 7070
const mongoose =  require("mongoose")
const User = require("./User.js")
const jwt = require("jsonwebtoken")



/*
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.wqnfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("myFirstDatabase").collection("User");
  // perform actions on the collection object
  client.close();
});*/




mongoose.connect("mongodb://localhost/auth-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log(`Auth-Service DB Connected`)
})





//register
//login
app.use(express.json())
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if(!user)
        return res.json({ message: " User doesn't exist" })
    else {

        //Check if the entered password id valid.
        if(password !== user.password){
            return res.json({ message: "Password Incorrect" })
        }

        const payload = {
            email,
            name : user.name
        }
        jwt.sign(payload, "secret", (err, token) => {
            if(err) 
                console.log(err)
            else
                return res.json({ token: token })
        })
    }

})

app.post("/auth/register", async(req, res) => {
    const { name, email, password } =  req.body
    const userExists = await User.findOne({ email })
    if(userExists)
        return res.json({ message: "User already exists" })
    else {
        const newUser = new User({
            name,
            email,
            password
        })
        newUser.save()
        return res.json(newUser)
    }
})



app.listen(PORT, () => {
    console.log(`Auth-Service at ${PORT}`)
})