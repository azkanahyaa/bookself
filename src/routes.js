const fs = require('fs')

const routesFolder = fs.readdirSync('./src/routes')
const routesFiles = routesFolder.filter((file) => file.endsWith('.js'))

const routes = routesFiles.map((file) => {
  const route = require(`./routes/${file}`)
  return route
})

console.log(routes)

module.exports = routes
