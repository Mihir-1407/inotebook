const connectMongo = require('./db');
connectMongo();
console.log("App Started");
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
app.use(cors())
app.use(express.json())


//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})