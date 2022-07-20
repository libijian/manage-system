const express = require('express')
const router = express.Router()
//导入数据库sqlfn('sql'，[],res=>{})
const sqlfn=require('./mysql')

const multer =require('multer')
const fs=require('fs')
//导入模块jsonwebtoken 秘钥
const jwt=require('jsonwebtoken');
//const jwtSecert
const config=require('./secert')

// const connection=require('./mysql')

// router.get('/', (req,res)=>{
//     const sql = 'select* from goods where id'
//     connection.query(sql, (err, data) => {
//         if(err) {
//             return res.send('错误：' + err.message)
//         }
//         res.send(data)
//     })
// })

router.get('/alllist',(req,res)=>{
    const sql="select name,price,amount from goods";
    sqlfn(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result,
            })
            }else{
                res.send({
                    status:500,
                    msg:"没有数据"
                })
        }
    })
})





//商品列表
router.get('/list',(req,res)=>{
    const page=req.query.page || 1;
    const sqllen ="select* from goods order by id";
    sqlfn(sqllen,null,data=>{
let len =data.length
    const sql="select* from goods  limit "+(page - 1)*8+",8";
    sqlfn(sql,null,result=>{
        if(result.length>0){
        res.send({
            status:200,
            data:result,
            pageSize:8,
            total:len
        })
        }else{
            res.send({
                status:500,
                msg:"没有数据"
            })
        }
})
})
})

//搜索类别
router.get('/searchlist',(req,res)=>{
    var search=req.query.search;
    const sql="select* from goods  where concat(`id`,`name`) like '%"+search+"%'";
    sqlfn(sql,null,result=>{
        if(result.length>0){
        res.send({
            status:200,
            result,
        })
        }else{
            res.send({
                status:500,
                msg:"没有数据"
            })
        }
})
})


//类目选择
router.get('/treegoods',(req,res)=>{
    const id =req.query.id||1;
    const sql="select* from treegoods  where id=?";
    var arr=[id];
    sqlfn(sql,arr,result=>{
        if(result.length>0){
        res.send({
            status:200,
            result,
        })
        }else{
            res.send({
                status:500,
                msg:"没有数据"
            })
        }
})
})


/** 
*
*   上传图片post 请求 upload
*   说明：
*   1.后台安装了multer模块 同事引入fs模块
*   2.router.js 入口文件导入模块
*   const fs=require('fs)
*   const multer=require('multer')
*   3.上传图片
*
*/
var storage=multer.diskStorage({
    destination:function(res,file,cb){
cb(null,"./upload")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
})

var createFolder = function (folder){
    try{
        fs.accessSync(folder);
    }catch(e){
fs.mkdirSync(folder);
    }
}
var uploadFolder='./upload';
createFolder(uploadFolder);

var upload=multer({
    storage:storage
});

router.post('/upload',upload.single('file'),function(req,res,next){
    var file=req.file;
    console.log('文件类型:%s',file.mimetype);
    console.log('文件名字:%s',file.originalname);
    console.log('文件大小:%s',file.size);
    console.log('文件保存路径:%s',file.path);
    res.json({
        res_code:'0',
        name:file.originalname,
        url:file.path
    })
})


//添加商品
router.get('/addgoodslist',(req,res)=>{
    var name=req.query.name|| "";
    var price=req.query.price|| "";
    var amount=req.query.amount|| "";
    var image=req.query.image|| "";
    var about =req.query.about|| "";
    var category=req.query.category|| "";
    var cid=req.query. cid|| "";
    var time=req.query.time||"";
    const sql="insert into goods values(15,?,?,?,?,?,?,?,?)"
    var arr=[name,price,amount,image,about,category,cid,time];
    sqlfn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"添加成功"
            })
        }else{
            res.send({
                status:500,
                msg:"添加失败"
            })
        }
    })
})

//删除商品列表
router.get('/deletegoodslist',(req,res)=>{
    var name=req.query.name;
    const sql="delete from goods where name=?"
    const arr =[name];
    sqlfn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"删除成功"
            })
        }else{
            res.send({
                status:500,
                msg:"删除失败"
            })
        }
    })
})


//修改单个商品数据


router.get('/editgoodslist',(req,res)=>{
    var id=req.query.id;
    var name=req.query.name|| "";
    var price=req.query.price|| "";
    var amount=req.query.amount|| "";
    var image=req.query.image|| "";
    var about =req.query.about|| "";
    var category=req.query.category|| "";
    var cid=req.query. cid|| "";
    var time=req.query.time||"";
    var sql="update goods set name=?,price=?,amount=?,image=?,about=?,category=?,cid=?,time=? where id=?";
    var arr=[name,price,amount,image,about,category,cid,time,id];
    sqlfn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"修改成功"
            })
        }else{
            res.send({
                status:500,
                msg:"修改失败"
            })
        }
    })
})

//登录接口 login  post请求
//接收字段 username password 


router.post('/login',(req,res)=>{
let {username,password}=req.body
//请求数据库
let sql="select* from userinfo where username=? and password=?";
let arr=[username,password]
sqlfn(sql,arr,result=>{
if(result.length>0){
    let token=jwt.sign({
        username:result[0].username,
        id:result[0].id
    },config.jwtSecert,{
        expiresIn:20*1
    })
    res.send({
        status:200,
        data:token,
    })
}else{
    res.send({
        status:404,
        msg:"信息错误"
    })
}
})
})




module.exports = router
