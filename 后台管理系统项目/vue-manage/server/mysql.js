const mysql = require('mysql');



const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'web'
});

function sqlfn(sql,arr,callback) {
    connection.query(sql,arr,function(error,result){
        if(error){
            console.log('数据库错误');
            return;
        }
        callback(result)
    })
}

module.exports=sqlfn