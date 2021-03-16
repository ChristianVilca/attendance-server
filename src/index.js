import express from 'express'
import jwt from 'jsonwebtoken'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema'
import { resolvers } from './resolvers/resolvers'
import { UserDS } from './datasources/attendance-mongoDB/db'
//import config from './index.config'
import https from 'https'
var fs = require('fs')

//console.log(typeDefs)
//
const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    // Obtener el token
    const token = req.headers['authorization']

    // console.log(token)

    if(token !== "null"){
      try {
        // Verirficar el token del cliente
        const userCurrent = await jwt.verify(token, process.env.NODE_APP_SECRET)

        // Agregando el usuario actual al request
        req.userCurrent = userCurrent
        //console.log("userCurrent index: ",userCurrent)

        return {
          userCurrent: await UserDS.findOne({usuario: userCurrent.usuario})
        }
      } catch (err) {
        // console.error(err)
      }
    }
  }
})

server.applyMiddleware({ app })

/* app.listen({ port: 4000 }, '192.168.0.3' , () => console.log(`El servidor esta funcionando http://localhost:4000${server.graphqlPath}`))
 */
https.createServer({
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.cert')
}, app)
.listen(4000, '192.168.0.3', function () {
  console.log('Example app listening on port 3000! Go to https://192.168.0.3:4000/')
})
