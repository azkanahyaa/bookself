const books = require('../books')

const route = {
  method: 'GET',
  path: '/books/{id}',
  handler: (request, h) => {
    const { id } = request.params
    const book = books.find((book) => book.id === id)

    if (book) {
      return {
        status: 'success',
        data: {
          note,
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
