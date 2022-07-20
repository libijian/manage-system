const base={
    host:'http://localhost:3000',//基础域名
    goodslist:'http://localhost:3000/api/list',//商品列表
    search:'http://localhost:3000/api/searchlist',//商品搜索
    selectCategory:'http://localhost:3000/api/treegoods',//类目选择
    uploadUrl:'http://localhost:3000/api/upload',//图片上传post
    addgoodslist:'http://localhost:3000/api/addgoodslist',//添加商品
    deletegoodslist:'http://localhost:3000/api/deletegoodslist',//删除商品
    editgoodslist:'http://localhost:3000/api/editgoodslist',//修改商品信息
    login:'http://localhost:3000/api/login',//登录
    alllist:'http://localhost:3000/api/alllist',//获取 所有商品中 name price amount作为展示
}

export default base;