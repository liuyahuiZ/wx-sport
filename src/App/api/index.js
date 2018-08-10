import fetch from '../servise/fetch';
import config from '../config/config';

export function getAds(){
    return new Promise((resolve, reject)=>{
        let reqbody={}
        fetch(config.API_URL+ 'index/ads',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function getSubjects(){
    return new Promise((resolve, reject)=>{
        let reqbody={}
        fetch(config.API_URL+ 'index/subjects',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}