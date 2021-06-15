const books = require('../books')

const route = {
  method: 'GET',
  path: '/books/{id}',
  handler: (request, h) => {
    const { id } = request.params
    const book = books.find((book) => book.id === id)
		console.log(book)

    if (book) {
      return {
        status: 'success',
        data: {
          book,
        },
      }
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    response.code(404)
    return response
  },
}

module.exports = route
