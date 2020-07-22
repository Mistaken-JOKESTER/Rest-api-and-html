const express  = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const cors = require('cors')



const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: true, credentials: true }))


mongoose.connect('mongodb://127.0.0.1:27017/Authentication', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})


app.use(express.json())
app.use(userRouter)

app.listen(PORT, () => { console.log(`server is running on port ${PORT}`)})