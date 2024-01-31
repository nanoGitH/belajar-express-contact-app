const express = require('express')
const {loadContacts, findContacts, addContact, cekDuplikat, deleteContact, updateContact, } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000


//template engine
app.set('view engine', 'ejs')

//build-in middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//konfigurasi flash AAAAAAAAAAAAAAAAAAAAAAA CUMA BUAT FLASH DONG RIBET BGTTTT!!!
app.use(cookieParser('secret'))
app.use(session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

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
        msg: req.flash('msg')
    })
})

//halaman tambah
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'form tambah kontak'
    })
})

//proses tambah data
app.post(
    '/contact', 
    [
    body('nama').custom(value => {
        const duplikat = cekDuplikat(value)
        if (duplikat) {
            throw new Error('nama kontak sudah ada')
        }
        return true
    }),
        check('email', 'email tidak valid').isEmail(),
        check('nohp', 'nohp tidak valid').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(400).json({errors: errors.array()})
            res.render('add-contact', {
                title: 'form tambah kontak',
                errors: errors.array()
            })
        }else {
            addContact(req.body)
            //kirim flash massage AAAAAAAAAAAAAAAAAAAAA
            req.flash('msg', 'data kontak berhasil ditambahkan')
            res.redirect('/contact')
        }
})

//proses hapus data
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContacts(req.params.nama)

    if(!contact) {
        res.status(404)
        res.send('<h1>404</h1>')
    }else {
        deleteContact(req.params.nama)
        req.flash('msg', 'data kontak berhasil diihapus')
        res.redirect('/contact')
    }
})

//halaman ubah
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContacts(req.params.nama)
    res.render('edit-contact', {
        title: 'form ubah kontak',
        contact,
    })
})

//proses ubah data
app.post(
    '/contact/update', 
    [
    body('nama').custom((value, {req}) => {
        const duplikat = cekDuplikat(value)
        if (value !== req.body.oldName && duplikat) {
            throw new Error('nama kontak sudah ada')
        }
        return true
    }),
        check('email', 'email tidak valid').isEmail(),
        check('nohp', 'nohp tidak valid').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(400).json({errors: errors.array()})
            res.render('edit-contact', {
                title: 'form ubah kontak',
                errors: errors.array(),
                contact: req.body
            })
        }else {
            updateContact(req.body)
            //kirim flash massage AAAAAAAAAAAAAAAAAAAAA
            req.flash('msg', 'data kontak berhasil diubah')
            res.redirect('/contact')
        }
})

//halaman detail
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









