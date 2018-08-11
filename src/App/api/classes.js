import fetch from '../servise/fetch';
import config from '../config/config';

export function myClass(req){
    return new Promise((resolve, reject)=>{
        let reqbody=req
        fetch(config.API_URL+ `user/courses`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function classDetail(req){
    return new Promise((resolve, reject)=>{
        let reqbody=req
        fetch(config.API_URL+ `user/courses/detail`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function userMark(req){
    return new Promise((resolve, reject)=>{
        let reqbody=req
        fetch(config.API_URL+ `user/mark`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function transOver(req){
    return new Promise((resolve, reject)=>{
        let reqbody=req
        fetch(config.API_URL+ `user/courses/transOver`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function transOverUp(req){
    return new Promise((resolve, reject)=>{
        let reqbody=req
        fetch(config.API_URL+ `user/courses/transOverUpload`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}