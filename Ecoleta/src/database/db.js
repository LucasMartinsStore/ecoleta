//Importação da depedencia do DB
const sqlite3 = require("sqlite3").verbose()

//Invocando o object de  DB
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//Utilizar  o objeto  de banco  , para  nossa operações


/*db.serialize(() =>{
    //Criação de tabela no js ( template String)
   /* db.run(`
        CREATE TABLE  IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `) 


    // Insert into em js
    
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
        "http://localhost/image/bas-emmen-EXpa6pyXkHA-unsplash.jpg",
        "Papersider",
        " guilherme Gemballa , Jardim América ",
        " N°250 ",
        "Santa Catarina",
        "Rio do Sul ",
        "Papéis & Papelão"
    ]    
    
    function afterInsertData(err) {
        if(err){
            return  console.log(err)
        }

            console.log("Cadastrado com sucesso!")
            console.log(this)
    }
    
    db.run(query,values, afterInsertData)

    //Select em js
    
    db.all(`SELECT * FROM places` , function (err , rows) { // rows vão ser os registros da tabela
        if(err){
            return  console.log(err)
        }

        console.log("Listamento de tabelas: ")
        console.log(rows)
    }) 



    //Delete em js 
    
    db.run(`DELETE FROM places WHERE id = ?`, [1],function(err) {
        if(err){
            return  console.log(err)
        }

            console.log("Registro deletado com sucesso!")
            console.log(this)        
    } ) 
}) */