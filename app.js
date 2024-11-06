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
