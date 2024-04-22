const { headers } = require('./header');

function errorHandle(res, code, message){
   res.writeHead(code,headers);
   res.write(JSON.stringify({
    "status":false,
    "message":message,    
   }));
   res.end();
   
}

function successHandle(res,code,message,data){
  res.writeHead(code,headers);
  if(data)
  {
    res.write(JSON.stringify({
        "status":true,
        "message":message,  
        "data":JSON.stringify(data)
      }));
  }
  else{
    res.write(JSON.stringify({
        "status":true,
        "message":message,  
      }));
  }
 
  res.end();
}


module.exports = {errorHandle,successHandle};
