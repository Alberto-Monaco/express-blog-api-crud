/*Esercizio
Usando l'array dei post fornito con le relative immagini, 
creare un file di routing (routers/posts.js) che conterrà le rotte necessario per l'entità post.
Tutte le risposte saranno in json.
All'interno creare le seguenti rotte:
/ - index: ritornerà un html con una ul che stamperà la lista dei post
/:slug - show: tramite il parametro dinamico che rappresenta lo slug del post, 
ritornerà un json con i dati del post
Scrivere tutte le funzioni delle rotte nel controller dedicato
Registrare il router dentro app.js con il prefisso posts/.
*/
const express = require('express')
const app = express()
app.use(express.json())
const PORT = process.env.PORT
const HOST = process.env.HOST
app.use(express.static('public'))

const postsRouter = require('./routes/posts.js')

app.use('/posts', postsRouter)

app.listen(PORT, (req, res) => {
	console.log(`Server is running in ${HOST}:${PORT}`)
})
