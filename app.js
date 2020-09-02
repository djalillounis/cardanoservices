const express = require('express')
const app = express()

var path = require('path')


app.use(express.static('website/public'))



const port = 5555

app.get('/', function(req, res) {

        
        res.sendFile('index.html', {root:path.join(__dirname,'public')});



})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
