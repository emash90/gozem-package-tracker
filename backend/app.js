const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { errorHandler } = require('./middlewares/errorMiddleware')
require('dotenv').config()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
//const corsOptions = {
//     origin:'*', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//  }
const server = http.createServer(app)
const path =  require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const urlencoded = require('body-parser/lib/types/urlencoded')

const io = new Server(server, {
    cors: {
        "origin": "http://localhost:3000",
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    }
})


io.on('connection', (socket)=> {
    console.log(`${socket.id} connected`);
})


const port = process.env.PORT || 9000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json());
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views') )
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/package', require('./routes/packageRoutes'))
app.use('/api/delivery', require('./routes/deliveryRoutes'))
if(process.env.NODE_ENV === 'production'){app.use(express.static(path.join(__dirname, '../frontend/build')))} else {
    app.get('/', (req, res) => {
        res.send('set to "production"')
    })
}

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
app.use(errorHandler)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


mongoose.connect(process.env.MONGO_URI, {

})
.then((result) => {
    console.log('connected to the db');
    server.listen(port, () => {
        console.log(`app listening on port ${port}`);
    })
})
.catch((error) => {
    console.log(error);
})

