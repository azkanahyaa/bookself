const books = require('../books')

const route = {
  method: 'PUT',
  path: '/books/{id}',
  handler: (request, h) => {
    const { id } = request.params

    const data = request.payload
    const updatedAt = new Date().toISOString()

    const index = books.findIndex((book) => book.id === id)

    if (index !== -1) {
      books[index] = {
        ...books[index],
        ...data,
        updatedAt,
      }

      const response = h.response({
        status: 'succes',
        message: 'Buku berhasil ditambahkan',
      })
      response.code(200)
      return response
    }

    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbaharui data buku. Id tidak ditemukan',
    })
    response.code(404)
    return response
  },
}

module.exports = route
