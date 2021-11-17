const express =  require("express")
const app = express()
app.use(express.json())
const PORT = process.env.PORT_ONE || 8080
const mongoose =  require("mongoose")
const jwt = require("jsonwebtoken")
const amqp = require("amqplib")
const Product = require("./Product.js")
const isAuthenticated = require("../isAuthenticated")

var channel, connection;

mongoose.connect("mongodb://localhost/auth-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log(`Product-Service DB Connected`)
})

async function connect(){
    const amqpSever = "amqp://localhost:5672"
    connection = await amqp.connect(amqpSever)
    channel = await connection.createChannel()
    await channel.assertQueue("PRODUCT")
}
connect()

// Create a new product
// Buy a product

app.post("/product/create", isAuthenticated, async (req, res) => {
    // req.user.email
    const { name, description, price } = req.body
    const newProduct = new Product({
        name,
        description,
        price,
    })
    return res.json(new Product)
})


app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`)
})