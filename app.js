const express = require('express')
const {loadContacts, findContacts, } = require('./utils/contacts')

const app = express()
const port = 3000


//template engine
app.set('view engine', 'ejs')

//build-in middleware
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {nama: 'aaaaaaaaaaaaaaaaa', title: 'home index'})
})
app.get('/about', (req, res) => {
    res.render('about', {title: 'about'})
})
app.get('/contact', (req, res) => {
    const contacts = loadContacts()
    res.render('contact', {
        title: 'contact',
        contacts,
    })
})
app.get('/contact/:nama', (req, res) => {
    const contact = findContacts(req.params.nama)
    res.render('detail', {
        title: 'halaman detailcontact',
        contact,
    })
})

app.use('/', (req, res) => {
    res.status(404)
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})









