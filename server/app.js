/*console.log("Inizializzo il server!");*/

const express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var sqlite = require("./module/sqlite.js");
const sqlite3 = require('sqlite3').verbose();
const database = './Prodotti.db';
const app = express();
app.use(logger('dev'));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());

app.use(methodOverride());
app.use(cors());
// app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/prodotti', function (req, res) {
  sqlite.getProdotti(function (Prodotti){
    var prodotti ={};
    var Arraynomi= {};
    var ArrayCodice={};
    var ArrayScadenza={};
    var productList={};
    prodotti.Prodotti =Prodotti;
    //res.json(JSON.stringify(prodotti.Prodotti));// cancella questo commento per inviare come risposta json stringiflati del db
    var stringProdotti=JSON.stringify(prodotti);// prodotto stringato del db da parsare 
    //parso il risultato del db
    var allProductJsonParsed= JSON.parse(stringProdotti);
    //console.log("parsed product",allProductJsonParsed);leva questo commento se vuoi vedere il prodotto del parse di stringProdotti
    var obj = allProductJsonParsed;
    productList=allProductJsonParsed;
    //console.log("ParsedArrayDb",obj);Se vuoi mostrare a console il parsed array db cancella questo commento 
    var prodottiList=JSON.stringify(obj);
    res.json(productList);
    console.log("res /prodotti inviata");
  })
});


app.post('/modIdoneo', function(req, res){
        //JSON.parse(res.body);
        console.log(req.body);
        let codice =[];
        
        for(c in req.body){
        codice.push(req.body[c]);
        console.log(codice);
        sqlite.IdoneoSN(codice);
        }
       /*  db.run(sql,codice, function(err){
        if (err) {
            console.error(err.message);
            }
        console.log('Cambiamenti effettuati');

        });}
        db.close(); */
      
  });
//Inizializza il server
app.listen(8080, function() {
    console.log('listening on 8080');
  });