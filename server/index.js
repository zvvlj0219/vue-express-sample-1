const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts',posts);

//handle production
if(process.env.NODE_ENV === 'produnction'){
  //static folder
  app.use(express.static(__dirname + '/public'));

  //handle spa
  app.get(/.*/,(req,res)=>res.sendFile(__dirname + 'public/index.html'));
}

const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`server started on port ${port}`));