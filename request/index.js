module.exports ={
  request:function(request){
    let urlPath='https://api-hmugo-web.itheima.net/api/public/v1/'
    return new Promise((resolve, reject)=>{
      wx.request({
        ...request,
        url:urlPath+request.url,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          resolve(res)
        },
        fail(res){
          reject(res)
        }
      })
    })
  }
}