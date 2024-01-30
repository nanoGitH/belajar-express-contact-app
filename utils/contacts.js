const fs = require('node:fs')

//cek apakah directory exists
if(!fs.existsSync('data')) {
    //buat folder data
    fs.mkdirSync('data')
}
if(!fs.existsSync('data/contacts.json')) {
    fs.writeFileSync('data/contacts.json', '[]')
}

const loadContacts = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
} 

const findContacts = (nama) => {
    const contacts = loadContacts()
    const contact = contacts.find( contact => contact.nama.toLowerCase() === nama.toLowerCase())
    return contact
}

module.exports = {loadContacts, findContacts, }