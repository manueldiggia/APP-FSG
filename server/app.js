/*console.log("Inizializzo il server!");*/

const express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var sqllite = require("./module/sqlite.js");

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
  sqllite.getProdotti(function (Prodotti){
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
    //console.log("",prodottiList);log dei prodotti
    /*for (var x in obj.Prodotti) {
      console.log("NomeProdotto: ",obj.Prodotti[x].nome," codiceProdoto: ",obj.Prodotti[x].codice," Scadenza: ",obj.Prodotti[x].datascadenza);
      Arraynomi[x]=obj.Prodotti[x].nome;
      ArrayCodice[x]=obj.Prodotti[x].codice;
      ArrayScadenza[x]=obj.Prodotti[x].datascadenza;
      console.log('ArrayNomi',Arraynomi[x]);
      console.log('ArrayCodice',ArrayCodice[x]);
      console.log('ArrayDataScadenza',ArrayScadenza[x]);
      console.log('Array productList',productList[x]);
      var risposta=JSON.stringify(Arraynomi[x]);
      console.log('var response',risposta);
  }questo ciclo mi estrapola le proprietà e le inserisce in 3 array differenti(3 perche le prop di ogni record db sono 3)*/
res.json(productList);
console.log("res /prodotti inviata");
  })
});
//Inizializza il server
app.listen(8080, function() {
    console.log('listening on 8080');
  });