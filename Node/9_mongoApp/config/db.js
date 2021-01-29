if(process.env.NODE_ENV == "production")
    module.exports = {mongoURI: "mongodb+srv://admin:admin@cluster0.o6ozy.mongodb.net/Cluster0?retryWrites=true&w=majority"}
else
    module.exports = {mongoURI: "mongodb://localhost/blogapp"}