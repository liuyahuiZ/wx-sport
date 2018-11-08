import fetch from '../servise/fetch';
import order from '../servise/order';
import config from '../config/config';

export function subjectCourses(req){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `subjects/${req.subjectId}/courses`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function subjectDetail(subjectId){
    return new Promise((resolve, reject)=>{
        fetch(config.API_URL+ `subjects/${subjectId}`,{ method: 'POST', data: {}})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function createOrder(req){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `api/weChat/unifiedOrder`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function userSign(req){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `course/signIn`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function teacherInfo(req){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `teacher/info`,{ method: 'GET', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function teacherStudents(req){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `teacher/students`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function teacherStudentRecords(req){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `teacher/student/records`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function teacherStudentRecordRevert(req){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `teacher/student/record/revert`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function teacherSignInPage(req){
    return new Promise((resolve, reject)=>{
        order(config.API_URL+ `teacher/signInPage`,{ method: 'POST', data: req})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}
