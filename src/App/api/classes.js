import fetch from '../servise/fetch';
// import Service from '../servise/service';
import config from '../config/config';
import order from '../servise/order';


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
export function userUpdInfo(req){
    return new Promise((resolve, reject)=>{
        let reqbody=req
        fetch(config.API_URL+ `user/updInfo`, { method: 'POST', data: reqbody})
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
        fetch(config.API_URL+ `course/ordering`,{ method: 'POST', data: req})
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

export function courseDetail(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `course/detail`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function courseMoves(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `course/moves`,{ method: 'GET', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function courseMovesUpdate(req){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `course/moves/update`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function coursePlan(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `course/plan`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function coursePlanOver(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `course/plan/over`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function coursePlanFeedback(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `course/plan/feedback`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function coursePlanRecords(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `course/plan/records`,{ method: 'GET', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}
export function coursePlanRecordsDetail(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `course/plan/records/detail`,{ method: 'GET', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function userMarkRate(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `userMark/markOrder`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}
export function userInfo(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `user/info`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function userStudents(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `user/students`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function userMoves(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `user/moves`,{ method: 'GET', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function userMovesUpdate(req){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `user/moves/update `,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function userMsgCount(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `user/msgCount`,{ method: 'GET', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}


export function courselastKeep(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `course/lastKeep`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function sendCheckCode(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `msg/send`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}
