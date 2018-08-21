import fetch from '../servise/fetch';
// import Service from '../servise/service';
import config from '../config/config';


export function userRegistry(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `user/registry`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

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
        fetch(config.API_URL+ `user/course/detail`, { method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}


export function courseRatio(req){
    return new Promise((resolve, reject)=>{
        let reqbody=req
        fetch(config.API_URL+ `course/ratio`,{ method: 'POST', data: reqbody})
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
        fetch(config.API_URL+ `user/course/transOver`,{ method: 'POST', data: reqbody})
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
        fetch(config.API_URL+ `course/course/upload`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function userOrdeRing(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `user/ordering`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function userGatherInfo(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `course/gatherInfo`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}