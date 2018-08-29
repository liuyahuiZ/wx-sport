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

export function signedList(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ 'course/signedList',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function getToken(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `api/token/${reqbody.code}`,{ method: 'GET', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}