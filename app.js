const express = require('express')
const mongoose = require('mongoose')
const { errorHandler } = require('./middlewares/errorMiddleware')
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const urlencoded = require('body-parser/lib/types/urlencoded')




const app = express()



const port = process.env.PORT || 9900

app.use(morgan('dev'))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/package', require('./routes/packageRoutes'))
app.use('/api/delivery', require('./routes/deliveryRoutes'))
app.use(errorHandler)


mongoose.connect(process.env.MONGO_URI, {

})
.then((result) => {
    console.log('connected to the db');
    app.listen(port, () => {
        console.log(`app listening on port ${port}`);
    })
})
.catch((error) => {
    console.log(error);
})

