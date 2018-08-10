import fetch from '../servise/fetch';
import config from '../config/config';

export function myClass(subjectId){
    return new Promise((resolve, reject)=>{
        let reqbody={}
        fetch(config.API_URL+ `user/courses`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}