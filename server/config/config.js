import { connect, connection } from 'mongoose'
connect('mongodb://user:user123@cluster0-shard-00-00.arwzj.mongodb.net:27017,cluster0-shard-00-01.arwzj.mongodb.net:27017,cluster0-shard-00-02.arwzj.mongodb.net:27017/r3d_app?ssl=true&replicaSet=atlas-f3wnz1-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const dbConnection = connection
dbConnection.on('error', (err) => console.log(`Connection error ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))