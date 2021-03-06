import fetch from '../servise/fetch';
import order from '../servise/order';
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

export function getTicket(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `api/token`,{ method: 'GET', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}
export function getSigns(url){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `api/token/sign?url=${url}`,{ method: 'GET', data: ''})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}


export function topUp(reqbody){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `topUp`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}


export function topUpTemplateList(reqbody){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `topUp/template/list`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function topUpBuyCourse(reqbody){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `topUp/buyCourse`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}


