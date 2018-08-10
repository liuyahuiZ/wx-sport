import fetch from '../servise/fetch';
import config from '../config/config';

export function subjectCourses(subjectId){
    return new Promise((resolve, reject)=>{
        let reqbody={}
        fetch(config.API_URL+ `subjects/${subjectId}/courses`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function subjectDetail(subjectId){
    return new Promise((resolve, reject)=>{
        let reqbody={}
        fetch(config.API_URL+ `subjects/${subjectId}`,{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}
