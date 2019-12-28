const express = require('express');
//const bodyParser = require('body-parser');
//const morgan = require('morgan');
const app = express();
//app.use(morgan('dev'));

//app.use(bodyParser('json/server.js'));

app.use(express.static(`${__dirname}/public`));

app.listen(2000, () => {
  console.log(`Server Running on http://localhost:2000`);
});

const fs = require('fs');

app.post('/upload_json', (req, res)=>{
    let csv = jsonCSV(JSON.stringify(req.body))
    fs.writeFile(__dirname + '/client/' + 'csv.csv', csv, (err, data) =>{
      res.send(csv);
    })
  });

var jsonCSV = (string) =>{
  let jsonData = JSON.parse(string);
  let attributes = {};
  let records = [];
  var parseData = (obj) => {
    for(let key in obj){
      if(key !== 'children'){
        attributes[key] = true;
      }
    }
    records.push(obj)
    if(obj.children){
      for(let child of obj.children){
        parseData(child);
      }
    }
  }
  if(Array.isArray(jsonData)){
    for(let obj of jsonData) parseData(obj)
  } else{
    parseData(jsonData);
  }
  let increment = 0;
  attributes = Object.keys(attributes);
  csv = attributes.reduce((acc, attribute) => {
    return acc += `,${attribute}`;
  }, 'id') + '\r\n';
  records.forEach(record => {
    let str = String(increment++);
    attributes.forEach(attribute => {
      str += record[attribute] ? `,${record[attribute]}` : `,null`;
    })
    csv += `${str}\r\n`;
  })
  return csv;
}