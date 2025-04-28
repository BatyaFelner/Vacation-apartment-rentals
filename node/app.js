import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import advertiserRauter from './api/routers/advertiser.js'
import CityrRauter from './api/routers/City.js'
import CategoryRouter from './api/routers/Category.js'
import apartmentRouter from './api/routers/apartment.js'
const app = express()
const port = 4103

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(`mongodb://localhost:27017/Articles_DB`)
    .then(() => {
        console.log('connect to mongoDB! 👍');
    })
    .catch(err => {
        console.log({ error: err.message });
    })

    app.use('/advertiser', advertiserRauter)
    app.use('/City',CityrRauter)
    app.use('/categories', CategoryRouter);
    app.use('/apartment', apartmentRouter);


app.listen(port, () => {
    console.log(`my application is listening on http://localhost:${port}`);
})