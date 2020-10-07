const express = require("express") // importação do express
const server = express() // para execução do express

// Importar  o banco de dados
const db = require("./database/db")


//Habilitar uso do req.body
server.use(express.urlencoded({extended: true}))

//Configura pasta publica 
server.use(express.static("public"))


//Utitlizando Template Engine 
const nunjucks = require("nunjucks")

nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//Configura as rotas  da aplicação

//req : Required
//Res: Response
// Index
server.get("/", (req,res) =>{
    return res.render("index.html")
})

server.get("/create-point", (req,res) =>{
    
    //Receber todas as informações do front-end
    //console.log(req.query)
    
    return res.render("create-point.html")
})


server.post("/savepoint", (req,res)=>{
      //req.body: Corpo do formulário
     // console.log(req.body)

     //inserir dados no banco de dados

     const query = `
     INSERT INTO places (
         image,
         name, 
         address,
         address2,
         state,
         city ,
         items
     ) VALUES (?,?,?,?,?,?,?);
 `
 const values = [
     req.body.image,
     req.body.name,
     req.body.adress,
     req.body.address2,
     req.body.state,
     req.body.city,
     req.body.items

 ]    
 
 function afterInsertData(err) {
     if(err){
           console.log(err)

         return res.send("Erro no cadastro!! ")
     }

         console.log("Cadastrado com sucesso!")
         console.log(this)

         return res.render("create-point.html", {saved: true})
 
 }

    db.run(query,values, afterInsertData)
   
 
    
 

})

server.get("/search", (req,res) =>{


    const search = req.query.search

    if (search == ""){
        // pesquisa vazia
               return res.render("search-results.html" ,{total:0})
        
    }

    // Pegar  os dados  do banco de  dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'` , function (err , rows) { // rows vão ser os registros da tabela
        if(err){
            return  console.log(err)
        }

        const total = rows.length // criadar para contar quanto elementos vai ter
        

        //mostra a página html com os dados do banco  de dados
        return res.render("search-results.html", {places: rows , total: total})
 

    }) 
    
})



// Para ativação do servidor
server.listen(80)
