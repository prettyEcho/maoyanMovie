export default function getJson(options){
  let defaults = { //默认属性
        type: 'get',
        url: '',
        data: ''
      },
      config = { //设置初始属性
        ...defaults,
        ...options
      };

  return new Promise((resolve, reject) => {
    let xhr = null;
    try{
      xhr = new XMLHttpRequest();
    }
    catch(e){
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //get数据准备
    if(config.type.toLowerCase() === 'get' && config.data){
      let URIDATA = encodeURI(config.data); //url编码
      config.url += `?${URIDATA}`;
    }

    //连接服务器
    xhr.open(config.type, config.url, true); //异步

    //是否为get
    if(config.type.toLowerCase() === 'get'){
      xhr.send();
    }else{
      //post
      oAjax.setRequestHeader('content-type','application/x-www-form-urlencoded');
      oAjax.send( config.data );
    }

    xhr.onreadystatechange = handler;

    function handler(){
      if(xhr.readyState !== 4 ){
        return;
      }

      if(xhr.status === 200){
        resolve(this.response);
      }else{
        reject(new Error(this.statusText));
      }
    }
  })
}

