const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/8mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("Conectado");
}).catch((erro)=>{
    console.log("Erro: " + erro);
});


//model - definição

const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    }
});

//collection
mongoose.model("usuarios", UserSchema);

//inserir documento

const newUser =  mongoose.model('usuarios');

new newUser({
    nome: "Stella",
    sobrenome: "Lima",
    email: "email@email.com",
    idade: 23,
    pais: "Brasil"
}).save().then(()=>{
    console.log("Usuário inserido com sucesso");
}).catch((erro)=>{
    console.log("erro: " + erro);
});

