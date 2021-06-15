const books = require('../books')

const route = {
  method: 'GET',
  path: '/books',
  handler: () => ({
    status: 'success',
    data: {
      books,
    },
  }),
}

module.exports = route
