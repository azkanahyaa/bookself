// const nanoid = require('nanoid')

const route = {
  method: 'GET',
  path: '/books',
  handler: (request) => {
    console.log(request.payload)
  },
}

module.exports = route
