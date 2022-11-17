/*
Use the following instructions: 

npm init -y
npm i express
npm install request
nodemon
*/

const express = require("express");
const app = express();
const PORT = 3000 // localhost:3000
const fs = require('fs') // this engine requires the fs module
const pages = ["bold", "italic", "orderedlist", "unorderedlist", "list", "break", "link"]

app.set("view engine", "page") // view engine
app.engine('page', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err)
        const rendered = content.toString()
            .replace('#title#',    '<title>' + options.title    + '</title>')
            .replace('#message#',  '<h1>'    + options.message  + '</h1>')
            .replace('#content#',  '<div>'   + options.content  + '</div>')
            .replace('#htmlcode#', '<div>'   + options.htmlcode + '</div>')
          return callback(null, rendered)
    })
})

app.get("/", (req, res) => {
    res.render("templateOne", { title: "Main Page", message: "<center><strong>HTML Code - Menu</strong></center>", content: 
    `<center><table style='border: 7px solid brown'>
<tr><td><a href="/pages/0">bold</a></td></tr>
<tr><td><a href="/pages/1">italic</a></td></tr>
<tr><td><a href="/pages/2">orderedlist</a></td></tr>
<tr><td><a href="/pages/3">unorderedlist</a></td></tr>
<tr><td><a href="/pages/4">list</a></td></tr>
<tr><td><a href="/pages/5">break</a></td></tr>
<tr><td><a href="/pages/6">link</a></td></tr>
    </table></center>`
    })
})

app.get("/pages/:indexOfPages", (req, res) => {
    res.render("templateOne", { title: pages[req.params.indexOfPages], message: pages[req.params.indexOfPages], content: `<ul><li> <a href="/${pages[req.params.indexOfPages]}">${pages[req.params.indexOfPages]}</a></li></ul>` })
})

app.get("/bold", (req, res) => {
    res.render("templateTwo", { title: "Bold", message: "The HTML code for Bold text", htmlcode: "<pre><code> &lt;b> Bold text &lt;/b></code></pre>" })
})

app.get("/italic", (req, res) => {
    res.render("templateTwo", { title: "Italic", message: "The HTML code for Italic text", htmlcode: "<pre><code> &lt;i> This text is italic &lt;/i></code></pre>" })
})

app.get("/orderedlist", (req, res) => {
    res.render("templateTwo", { title: "Orderedlist", message: "The HTML code for Ordered list", htmlcode: "<pre><code> &lt;ol> Tag for ordered or numbered list of items &lt;/ol></code></pre>" })
})

app.get("/unorderedlist", (req, res) => {
    res.render("templateTwo", { title: "Unorderedlist", message: "The HTML code for Unordered list", htmlcode: "<pre><code> &lt;ul> Tag for unordered list of items &lt;/ul></code></pre>" })
})

app.get("/list", (req, res) => {
    res.render("templateTwo", { title: "List", message: "The HTML code for a List", htmlcode: "<pre><code> &lt;li> Individual item as part of a list &lt;/li></code></pre>" })
})

app.get("/break", (req, res) => {
    res.render("templateTwo", { title: "Break", message: "The HTML code for a Break", htmlcode: "<pre><code> &lt;br> A new line &lt;/br></code></pre>" })
})

app.get("/link", (req, res) => {
    res.render("templateTwo", { title: "Link", message: "The HTML code for a Link", htmlcode: "<pre><code> &lt;a href=”https://”> A new line &lt;/a></code></pre>" })
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on ${PORT}`)
})