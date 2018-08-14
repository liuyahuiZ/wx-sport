import * as qiniu from 'qiniu-js';
import config from '../config/config';
import fetch from '../servise/fetch';
const fileDoman = 'http://pdc6cusp9.bkt.clouddn.com/'

export function fileUp(file) {
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'wx/getUpToken',{ method: 'GET'}).then(data => {
            console.log(data.respBody.uploadToken);
            let token = data.respBody.uploadToken;
            let key = Date.parse(new Date)/1000;
            let putExtra = {
                fname: file.name,
                mimeType: [] || null
            };
            let config = {
                useCdnDomain: true,
            };
            var observable = qiniu.upload(file, key, token, putExtra, config)
            var subscription = observable.subscribe(
            (e)=>{},
            (e)=>{}, 
            (res)=>{
                console.log(res)
                resolve( fileDoman + res.key);
            }) // 这样传参形式也可以

        }).catch(error => {
            console.log(error);
            reject(error);
        }) 
    })
}

