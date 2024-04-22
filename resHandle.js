const headers = {
  'Access-Control-Allow-Headers':
  'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json',
};

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
        "data":data
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
