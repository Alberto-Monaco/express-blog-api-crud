const posts = require('../db/db.js')
const fs = require('fs')

const show = (req, res) => {
	const slug = req.params.slug

	const post = posts.find((post) => post.slug === slug)

	if (!post) {
		return res.status(404).json({
			message: '404! not found'
		})
	}

	res.status(200).json(post)
}

const index = (req, res) => {
	let html = '<ul>'
	posts.forEach((post) => {
		html += `
		<li>
			<h2>${post.title}</h2>
            <img src="/imgs/posts/${post.image}" alt="${post.title}">
            <p>${post.content}</p>           
            <p>${post.tags.join(', ')}</p>
		</li>
		`
	})
	html += '</ul>'
	res.send(html)
}

const store = (req, res) => {
	console.log(req.body)
	const newPost = {
		title: req.body.title,
		slug: req.body.slug,
		content: req.body.content,
		image: req.body.image,
		tags: req.body.tags
	}
	posts.push(newPost)
	fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

	res.json({
		status: 201,
		data: posts,
		counter: posts.length
	})
}

const update = (req, res) => {
	const post = posts.find((post) => post.slug === req.params.slug)
	if (!post) {
		return res.status(404).json({
			message: `Post with slug ${req.params.slug} not found`
		})
	}
	post.title = req.body.title
	post.slug = req.body.slug
	post.content = req.body.content
	post.image = req.body.image
	post.tags = req.body.tags
	fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

	res.status(200).json({
		message: 'Post updated successfully',
		status: 200,
		data: post
	})
}

const destroy = (req, res) => {
	const post = posts.find((post) => post.slug === req.params.slug)
	if (!post) {
		return res.status(404).json({
			message: `Post with slug ${req.params.slug} not found`
		})
	}
	const newPost = posts.filter((post) => post.slug !== req.params.slug)
	fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(newPost, null, 4)}`)
	res.status(200).json({
		message: 'Post deleted successfully',
		data: newPost,
		counter: newPost.length
	})
}

module.exports = { show, index, store, update, destroy }
