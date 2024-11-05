/*
Esercizio
Per il nostro blog, concentriamoci sul creare una rotta:
la rotta dovrà rispondere al verbo POST e delegare un metodo store del controller dei posts per effettuare le operazioni di creazione della risorsa.
Questa dovrà riceve i dati in formato json e dovrà restituire l'elenco dei posts in formato json incluso il nuovo elemento appena creato
Tutte le funzioni delle rotte dovranno essere scritte nel controller dedicato.
Testare le rotte tramite Postman.
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
