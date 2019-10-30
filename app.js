const express = require('express')//this imports the express module
const app = express();
const fetch = require('node-fetch')//this imports the node fetch module to be used in the code
const fs = require('fs')//this imports the filehandler module
const bodyParser = require('body-parser')//this is the body parser module which is used to pass the data to the body of the page
const helmet = require('helmet')//this is the helmet module which is used to protect the security of the code
var favMusic = require('./favoritesMusic.json')//this is the variable for the json file where all the favorites of the music will be stored
var favBooks = require('./favoritesBooks.json')//this is the variable for the json file where all the favorites of the books will be stored

//this makes use of all the modules imported in the above code
app.use(bodyParser.json())
app.use(express.json())
app.use(helmet())

//this uses the app.get method to get the api used to fetch any song the user types in.
app.get('/music', (req, res) => {
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(req.query.search)}&limit=10&entity=song`)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            res.send((data.results))
        })
})

//this uses the app.post method to add whatever song the user chooses to the favorites json file
app.post('/favoritesMusic', (req, res) => {
    favMusic.push(req.body)
    fs.writeFile('favoritesMusic.json', JSON.stringify(favMusic), (err) => {
        if (err) {
            console.log("Your file was not added to the json file", err)
        } else {
            console.log("Your file was added to the json file")
        }
    })
})

//this uses the app.get method to get the song the user added to the json file and displays it on the page
app.get('/favoritesMusic', (req, res) => {
    fs.readFile('./favoritesBooks.json', (err, data) => {
        if (err) {
            console.log('Does not work')
        } else {
            res.send(favMusic)
        }
    })
})

//this uses the app.delete method to delete whatever song the user wants to be deleted from the favorites json file
app.delete('/favoritesMusic', (req, res) => {
    console.log('access')
    favMusic = favMusic.filter((i) => {
        return i.id != req.body.deleted
    })
    fs.writeFile('favoritesMusic.json', JSON.stringify(favMusic), (err) => {
        if (err) {
            console.log(" it not working", err)
        } else {
            console.log("It is working")
        }
    })
})

//this uses the app.get method to get the api used to fetch any book the user types in.
app.get('/book', (req, res) => {
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(req.query.search)}&limit=10&entity=ebook`)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            res.send((data.results))
        })
})
//this uses the app.post method to add whatever book the user chooses to the favorites json file
app.post('/favoritesBooks', (req, res) => {
    favBooks.push(req.body)
    fs.writeFile('favoritesBooks.json', JSON.stringify(favBooks), (err) => {
        if (err) {
            console.log("It's not working", err)
        } else {
            console.log("It's working")
        }
    })
})

//this uses the app.get method to get the book the user added to the json file and displays it on the page
app.get('/favoritesBooks', (req, res) => {
    fs.readFile('./favoritesBooks.json', (err, data) => {
        if (err) {
            console.log('cant read')
        } else {
            res.send(favBooks)
        }
    })
})

//this uses the app.delete method to delete whatever book the user wants to be deleted from the favorites json file
app.delete('/favoritesBooks', (req, res) => {
    console.log('access')
    favBooks = favBooks.filter((i) => {
        return i.id != req.body.deleted
    })
    fs.writeFile('favoritesBooks.json', JSON.stringify(favBooks), (err) => {
        if (err) {
            console.log("It's not working", err)
        } else {
            console.log("It Works")
        }
    })
})

const path = require("path");
if (process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

app.get("*", (req,res)=> {
    res.sendFile(path.resolve(__dirname,"client", "build", "index.html"))
})

//this is the port which the back end of the code is run on 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Sever is listening on port ${PORT}`)
})

