const http = require('http');
const { headers } = require('./header');
const mongoose = require('mongoose');
const { errorHandle, successHandle } = require('./resHandle');
const Post = require('./models/posts') ;
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});


const constr = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

/* const constr = "mongodb://localhost:27017/Posts"; */
// 
mongoose.connect(constr)
  .then(res => console.log("連線資料成功"));

const reqListener = async (req, res) => {
  let body = '';
  //get form
  req.on('data', (chunk) => {
    body += chunk;
  });

  //getAll
  if (req.url == '/post' && req.method == 'GET') {
   
    try {
      const post = await Post.find();
    successHandle(res,200,"讀取成功",post);
    } catch (error) {
     errorHandle(res,400,error);
    }
  }
  //getById
  else if (req.url.startsWith('/post/') && req.method == 'GET') {

    const id = req.url.split('/').pop();
    try {
      const post = await Post.findById(id);
    successHandle(res,200,"讀取成功",post);
    } catch (error) {
     errorHandle(res,400,error);
    }
    
  }
  //insert
  else if (req.url == '/post' && req.method == "POST") {
    req.on('end',async () => {
      try {
        const newPost = await Post.create(JSON.parse(body));
        successHandle(res,200,"新增成功",newPost);
      } catch (err) {
        errorHandle(res, 400, err.message);
      }
    });
  }
  //update
  else if (req.url.startsWith('/post/') && req.method == "PUT") {
    req.on('end', async () => {
      try {
        const newPost = JSON.parse(body);
        const id = req.url.split('/').pop();
        const post = await Post.findByIdAndUpdate(id, newPost);
    successHandle(res,200,"更新成功",post);

      } catch (err) {
        errorHandle(res, 400, err.message);
      }
    });
  }

  else if (req.url == '/post' && req.method == "OPTIONS") {
    successHandle(res, 200, "");
  }
  //delete by id
  else if (req.url.startsWith('/post/') && req.method == 'DELETE') {
    try {
      const id = req.url.split('/').pop();
      console.log('id',id)
      const post  = await Post.findByIdAndDelete(id);
      successHandle(res,200,`${id}刪除成功`,post);
    }
    catch (err) {
      errorHandle(res, 400, err.message);
    }
  }
  //delete all
  else if (req.url == '/post' && req.method == 'DELETE') {
    try {
      const post = await Post.deleteMany({});
    successHandle(res,200,"刪除成功",[]);
    } catch (error) {
     errorHandle(res,400,error);
    }
  }
  else {
    errorHandle(res, 404, '查無此路徑!');
  }
};

const server = http.createServer(reqListener);
server.listen(process.env.PORT || 2330);
