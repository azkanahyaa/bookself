const books = require('../books')

const route = {
  method: 'PUT',
  path: '/books/{id}',
  handler: (request, h) => {
    const { id } = request.params

    const data = request.payload
    const updatedAt = new Date().toISOString()
    const { name, pageCount, readPage } = data
    const index = books.findIndex((book) => book.id === id)

    const isSucces = index !== -1 && name && readPage <= pageCount

    if (isSucces) {
      books[index] = {
        ...books[index],
        ...data,
        updatedAt,
      }

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      response.code(200)
      return response
    }

    let failMsg = 'Gagal memperbarui buku. Id tidak ditemukan'
    let code = 404

    if (!name) {
      failMsg = 'Gagal memperbarui buku. Mohon isi nama buku'
      code = 400
    } else if (readPage > pageCount) {
      failMsg = 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      code = 400
    }
    const response = h.response({
      status: 'fail',
      message: failMsg,
    })
    response.code(code)
    return response
  },
}

module.exports = route
