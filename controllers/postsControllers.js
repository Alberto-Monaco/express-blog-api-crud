const posts = require('../db/db.js')

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

	res.json({
		status: 201,
		data: posts,
		counter: posts.length
	})
}

module.exports = { show, index, store }
