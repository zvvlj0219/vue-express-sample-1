const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get posts
router.get('/',async (req,res)=>{
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//add posts
router.post('/',async (req,res)=>{
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text:req.body.text,
    createdAt:new Date()
  });
  res.status(201).send();
});

//delete posts
router.delete('/:id',async (req,res)=>{
  const posts = await loadPostsCollection()
  //公式ドキュメントより
  //   try {
  //     db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );
  //  } catch (e) {
  //     print(e);
  //  }
  //どうが
  // await posts.remove({_id:new mongodb.ObjectID(req.params.id)})
  await posts.deleteOne({"_id":new mongodb.ObjectId(req.params.id)})
  res.status(200).send();
})

async function loadPostsCollection(){
  const client = await mongodb.MongoClient.connect(
    'mongodb://morishi:37564x@localhost:27017/spaAppDB',{
    useNewUrlparser:true
  });
  return client.db('spaAppDB').collection('posts');
}

module.exports = router;