const express = require('express');
const app = express();
const port = 5000;



/** Start app */
app.listen(port,()=>{
    console.log(`Server Started on ${port}`);
})