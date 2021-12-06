const express =  require("express")
const app = express()
const PORT = process.env.PORT_ONE || 8080
const mongoose =  require("mongoose")
const jwt = require("jsonwebtoken")
const amqp = require("amqplib")
const Product = require("./Product.js")
const isAuthenticated = require("../isAuthenticated")

var channel, connection, order;
app.use(express.json())

mongoose.connect("mongodb://localhost/product-service", {
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



//User sends a list of products IDs to buy
//Creating an order with those products and a tolal value of sum product-s prices
app.post("/product/buy", isAuthenticated, async (req, res) => {
    const { ids } = req.body
    console.log("/product/buy ")
    console.log(req.body)
    const products = await Product.find({ _id: {$in : ids} })

    channel.sendToQueue(
        "ORDER",
        Buffer.from(
            JSON.stringify({
                products,
                userEmail: req.user.email,
            })
        )
    )
    channel.consume("PRODUCT", data => {
        console.log("Consuming PRODUCT queue")
        order = JSON.parse(data.content)
        channel.ack(data)
    })
    return res.json(order)
})

app.post("/product/create", isAuthenticated, async (req, res) => {
    // req.user.email
    const { name, description, price } = req.body
    const newProduct = new Product({
        name,
        description,
        price,
    })
    newProduct.save()
    return res.json(newProduct)
})

app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`)
})