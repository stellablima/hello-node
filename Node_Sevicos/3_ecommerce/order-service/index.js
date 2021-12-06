const express =  require("express")
const app = express()
const PORT = process.env.PORT_ONE || 9090
const mongoose =  require("mongoose")
const amqp = require("amqplib")
const Order = require("./Order")
const isAuthenticated = require("../isAuthenticated")

var channel, connection;

mongoose.connect("mongodb://localhost/order-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log(`Order-Service DB Connected`)
})
app.use(express.json())

function createOrder(products, userEmail){
    let total = 0
    for (const product of products) {
        total+=product.price
    }
    const newOrder = new Order({
        products,
        user: userEmail,
        total_price: total
    })
    newOrder.save()
    return newOrder
}

async function connect(){
    const amqpSever = "amqp://localhost:5672"
    connection = await amqp.connect(amqpSever)
    channel = await connection.createChannel()
    await channel.assertQueue("ORDER")
}



connect().then(() => {
    channel.consume("ORDER", data => {
        const { products, userEmail } = JSON.parse(data.content)
        const newOrder = createOrder(products, userEmail)
        channel.ack(data)
        channel.sendToQueue(
            "PRODUCT",
            Buffer.from(JSON.stringify({ newOrder }))

        )
    })
})

app.listen(PORT, () => {
    console.log(`Order-Service at ${PORT}`)
})