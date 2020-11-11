const express = require('express');
var bodyParser = require('body-parser')
const fs = require('fs')
var app = express();


var jsonParser = bodyParser.json()
app.use(jsonParser)
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.set('view engine', 'pug')

app.use(express.static('public'));
app.get('/styles-example-path', function (req, res) {
  res.render('styles-example')
})

app.get('/css-part/:part', function (req, res) {
  var partNumber = req.params.part
  console.log(partNumber, 'partNumber');
  var data = {}
  switch (partNumber) {
    case '1':
      data.list_minimum = [
        '30 CSS selectors to memorize',
        'властивість display: [block|inline|inline-block|flex]',
        'подивитися як себе поводять елементи block|inline|inline-block з заданими padding margin',
        'пограти декілька раз у Flex Grog',
        'color background border border radius',
      ]
      break;
    default:
      return res.redirect('/')
  }
  console.log(data);
  res.render('css-rules', data)
})

app.get('/', function (req, res) {
  const path =  __dirname + '/lists/contacts.json'
  var list = []
  try {
    if (fs.existsSync(path)) {
      list = fs.readFileSync(path, "utf8")
      list = JSON.parse(list)
    }
  } catch(err) {
    console.error(err)
  }
  res.render('form-for-name', {
    contacts: list
  })
})

app.post('/phone-action', function (req, res) {
  res.render('form-for-phone', {
    "name": req.body.name
  })
})



app.get('/edit/:id', function (req, res) {
  const path =  __dirname + '/lists/contacts.json'
  var list = []
  try {
    if (fs.existsSync(path)) {
      list = fs.readFileSync(path, "utf8")
      list = JSON.parse(list)
    }
  } catch(err) {
    console.error(err)
  }
  var contact = list[req.params.id]
  contact.id = req.params.id
  res.render('edit-form', {
    contact
  })
})

app.post('/update', function (req, res) {
  const path =  __dirname + '/lists/contacts.json'
  var list = []
  try {
    if (fs.existsSync(path)) {
      list = fs.readFileSync(path, "utf8")
      list = JSON.parse(list)
    }
  } catch(err) {
    console.error(err)
  }
  var contact_new_data = {
    "name": req.body.name,
    "phone": req.body.phone,
  }
  list[req.body.contact_id] = contact_new_data
  fs.writeFileSync(path, JSON.stringify(list))
  res.redirect('/')
})



app.post('/delete/:id', function (req, res) {
  const path =  __dirname + '/lists/contacts.json'
  var list = []
  try {
    if (fs.existsSync(path)) {
      list = fs.readFileSync(path, "utf8")
      list = JSON.parse(list)
    }
  } catch(err) {
    console.error(err)
  }
  list.splice(req.params.id, 1);
  fs.writeFileSync(path, JSON.stringify(list))
  res.redirect('/')
})
app.post('/save-user', function (req, res) {
  const path =  __dirname + '/lists/contacts.json'
  var list = []
  try {
    if (fs.existsSync(path)) {
      list = fs.readFileSync(path, "utf8")
      list = JSON.parse(list)
    }
  } catch(err) {
    console.error(err)
  }
  console.log(list);
  list.push(req.body)
  fs.writeFileSync(path, JSON.stringify(list))
  res.redirect('/')
})

app.listen(8000)
