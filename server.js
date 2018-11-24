const express = require('express');
const app = express();


app.use('/', express.static('./public'))



const PORT = process.env.PORT || 3000
app.listen( PORT, _ => console.log(`server start on PORT: ${PORT}`) )