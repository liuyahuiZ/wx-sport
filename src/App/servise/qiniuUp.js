import * as qiniu from 'qiniu-js';
import config from '../config/config';
import fetch from './fetch';
// const fileDoman = 'http://pdc6cusp9.bkt.clouddn.com/'
const fileDoman = 'http://media.avocadomethod.cn/'

export function fileUp(file) {
    return new Promise((resolve, reject)=>{
        console.log(config.API_URL+ 'qiniu/token')
        fetch(config.API_URL+ 'qiniu/token',{ method: 'POST', data:{}}).then(data => {
            console.log(data.result.token);
            let token = data.result.token;
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

