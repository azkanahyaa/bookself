const booksData = require('../books')

const route = {
  method: 'GET',
  path: '/books',
  handler: (request) => {
    const { name, reading, finished } = request.query
    let tempBooks = [ ...booksData ]

    if (reading !== undefined) {
      console.log(tempBooks.map((book) => book.reading === Boolean(parseInt(reading))))
      tempBooks = tempBooks.filter((book) => book.reading === Boolean(parseInt(reading)))
    }
    if (finished !== undefined) {
      console.log(tempBooks.map((book) => book.finished === Boolean(parseInt(reading))))
      tempBooks = tempBooks.filter((book) => book.finished === Boolean(parseInt(finished)))
    }
    if (name !== undefined) {
      tempBooks = tempBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
    }

    const books = tempBooks.map((book) => {
      const { id, name, publisher } = book
      return { id, name, publisher }
    })

    return {
      status: 'success',
      data: {
        books,
      },
    }
  },
}

module.exports = route
