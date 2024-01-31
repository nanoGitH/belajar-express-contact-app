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

//menimpa data contacts.json dengan data baru
const saveContact = contacts => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

//menambah data baru
const addContact = (contact) => {
    const contacts = loadContacts()
    contacts.push(contact)
    saveContact(contacts)
}

//cek nama yang duplikat
const cekDuplikat = nama => {
    const contacts = loadContacts()
    return contacts.find(contact => contact.nama === nama)
}

const deleteContact = nama => {
    const contacts = loadContacts()
    const filteredContact = contacts.filter(c => c.nama !== nama)
    saveContact(filteredContact)
}

const updateContact = contactBaru => {
    const contacts = loadContacts()
    //hilangkan kontak lama yang namanya sama dengan oldName
    const filteredContact = contacts.filter(c => c.nama !== contactBaru.oldName)
    
    delete contactBaru.oldName
    filteredContact.push(contactBaru)

    saveContact(filteredContact)    
}

module.exports = {loadContacts, findContacts, addContact, cekDuplikat, deleteContact, updateContact}