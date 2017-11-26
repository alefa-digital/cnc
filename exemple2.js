const express = require('express')
const app = express()

app.get('/page1', function (req, res) {
  res.send('Je suis sur la page1')
})

app.listen(3000, function () {
  console.log('Demmarage du serveur sur le port 3000')
})
