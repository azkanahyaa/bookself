const books = require('../books')

const route = {
  method: 'DELETE',
  path: '/books/{id}',
  handler: (request, h) => {
    const { id } = request.params

    const index = books.findIndex((book) => book.id === id)

    if (index !== -1) {
      books.splice(index, 1)
      const response = h.response({
        status: 'success',
        message: 'Buku berhasul dihapus',
      })
      response.code(200)
      return response
    }

    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    })
    response.code(404)
    return response
  },
}

module.exports = route
