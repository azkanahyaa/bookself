const { customAlphabet } = require('nanoid')
const books = require('../books')

const route = {
  method: 'POST',
  path: '/books',
  handler: (request, h) => {
    const body = request.payload
    const { name, pageCount, readPage } = body

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    const nanoId = customAlphabet(alphabet, 8)
    const id = nanoId()
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const newBook = { ...body, id, finished, insertedAt, updatedAt }
    console.log(newBook)
    if (name && pageCount >= readPage) books.push(newBook)

    const isSuccess = books.some((book) => book.id === id)

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      response.code(201)
      return response
    }

    let failMsg = 'Buku gagal ditambahkan'
    let code = 500

    if (!name) {
      failMsg = 'Gagal menambahkan buku. Mohon isi nama buku'
      code = 400
    } else if (readPage > pageCount) {
      failMsg = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
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
