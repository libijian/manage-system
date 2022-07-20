let http =require('http')
let mysql = require('mysql');
const server=http.createServer(function(req,res){
    res.statusCode=200
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');  
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");  

})
// 创建一个数据库连接池
let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'web'
});
connection.connect(function(err){
    if(err){
        console.log('error')
    }
    console.log('connect success!')
});//连接
server.on('request',function(request,response){
    let url=request.url
    if(url==='/'){
        // 查询数据
        connection.query('select* from goods',function(err,row){
            if(err){
                 console.log(err)            
            }
            console.log(typeof row)
            let data = JSON.stringify(row)
            response.end(data)
        })
    }
})
server.listen(3000,()=>{
    console.log('服务器开启成功！')
})