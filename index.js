// const http=require('http');
// const path=require('path');
// const fs=require('fs');
// const express=require('express');
// const PORT=process.env.PORT||3500;

// const app=express();

// app.use(express.static(path.join(__dirname,'assets')))
// const server=http.createServer((req,res)=>{
//     console.log(req.url);
//     res.writeHead(200,{"content-Type":"text/html"});
//     fs.readFile(path.join(__dirname,'views','index.html'),(err,data)=>{
//         if(err){
//             console.log(err);
//             res.end('Err Loadu=ing A Page...')
//         }else{
//             res.end(data)
//         }
//     })
    
// })
// server.listen(PORT,(err)=>{
//     if(err)throw err;
//     console.log('server running on http://localhost:'+PORT);
// })
// process.on('uncaughtException',(err)=>{
//     console.error(err);
//     process.exit(1);
// })


const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express()
const PORT=process.env.PORT||3500;


app.use(express.static(path.join(__dirname,'./assets')));

app.get('/',(req,res,next)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.listen(PORT,(err)=>{
    if(err)console.log(err);
console.log('server Running on http://localhost:'+PORT);
})