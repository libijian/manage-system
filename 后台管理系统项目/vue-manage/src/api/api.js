import axios from 'axios'
import base  from './base'
const qs=require('qs')
const api ={
    getlogin(params){//params={username:'' ,password:''}
        console.log('===',params,qs.stringify(params));
        return axios.post(base.login,qs.stringify(params))
       },
    getGoodsList(params){
        return axios.get(base.goodslist,{
            params
        })
    },
    getSearchlist(params){
         return axios.get(base.search,{
            params
         })
    },

    //获取类目选择 {id：cid}
    getselectCategory(params){
        return axios.get(base.selectCategory,{
           params
        })
   },

   //添加商品 name price amount pic  about category time 参数
   addGoodslist(params){//={}
    return axios.get(base.addgoodslist,{
        params
    })
   },
   deleteGoodslist(params){//={}
    return axios.get(base.deletegoodslist,{
        params
    })
   },
   editGoodslist(params){//={}
    return axios.get(base.editgoodslist,{
        params
    })
   },
   getallgoodslist(params){//={}
    return axios.get(base.alllist,{
        params
    })
   },

}
export default api