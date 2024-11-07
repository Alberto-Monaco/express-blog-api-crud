const notFound = (req, res, next) => {
	res.status(404).json({
		status: 404,
		message: 'Not Found middleware'
	})
}

module.exports = notFound
