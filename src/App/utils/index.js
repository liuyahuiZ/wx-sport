import { hashHistory } from 'react-router';
export function accMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

function strSplit(str){
    let name,value;
    let num=str.indexOf("?");
    str=str.substr(num+1); 
    let obj = {};
    let arr=str.split("&"); //各个参数放到数组里
    for(let i=0;i < arr.length;i++){
         num=arr[i].indexOf("=");
         if(num>0){
              name=arr[i].substring(0,num);
              value=arr[i].substr(num+1);
              obj[name]=value;
         }
    }
    return obj;
}

export function UrlSearch() {
    let name,value;
    let oStr = location.href;
    let str=location.href; //取得整个地址栏
    let num=str.indexOf("?");
    let num1=str.indexOf("#");
    
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    
    let str1=oStr.substr(num1+1);

    let obj = {};
    let arr=str.split("&"); //各个参数放到数组里

    for(let i=0;i < arr.length;i++){
         num=arr[i].indexOf("=");
         if(num>0){
              name=arr[i].substring(0,num);
              value=arr[i].substr(num+1);
              obj[name]=value;
         }
    }
    let rObj = strSplit(str1);
    obj = Object.assign({}, obj, rObj)
    return obj;
 }

 export function goLink(link, obg){
    if(link) {
      hashHistory.push({
        pathname: link,
        query: obg
      });
    }
  }