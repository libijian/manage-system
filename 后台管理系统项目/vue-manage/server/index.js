const express=require('express')
const app =express ()
const cors = require('cors')
//路由
const router=require('./router')

//静态文件托管 访问 3000端口

app.use(express.static('upload'))


//post请求表单数据
app.use(express.urlencoded({extended:true}))

app.use(cors())              //配置跨域，必须在路由之前
app.use('/api',router)


app.listen(3000,()=>{
    console.log('3000');
})

