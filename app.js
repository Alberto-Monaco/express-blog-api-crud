const express = require('express')
const app = express()
const notFound = require('./middleware/notmiddle.js')
const logger = require('./middleware/logger.js')
app.use(express.json())
const PORT = process.env.PORT
const HOST = process.env.HOST
app.use(express.static('public'))

app.use('/posts', (req, res, next) => {
	throw new Error('something went wrong')
})

app.use('/posts', logger)
const postsRouter = require('./routes/posts.js')

app.listen(PORT, (req, res) => {
	console.log(`Server is running in ${HOST}:${PORT}`)
})
app.use('/posts', postsRouter)
app.use(notFound)

app.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({ message: 'Internal Server Error' })
})
