const { customAlphabet } = require('nanoid')
const books = require('../books')

const route = {
  method: 'POST',
  path: '/books',
  handler: (request, h) => {
    const body = request.payload
    const { pageCount, readPage } = body

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    const nanoId = customAlphabet(alphabet, 8)
		const id = nanoId()
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const newBook = { ...body, id, finished, insertedAt, updatedAt }
    console.log(newBook)

    books.push(newBook)

    const isSucces = books.some((book) => book.id = id)

    if (isSucces) {
      const response = h.response({
        status: 'success',
        message: 'Buku baru berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      response.code(201)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    })
    response.code('500')
    return response
  },
}

module.exports = route
