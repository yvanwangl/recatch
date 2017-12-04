import * as fetch from 'isomorphic-fetch';
const {httpServer, defaultOptions} = require('../system.config');

function checkStatus(response: Response): object {
    let responseStatus = response.status;
    if (responseStatus >= 200 && responseStatus < 300) {
        return response;
    }
    const error = new Error(`Response error with status: ${response.statusText}`);
    (<any>error).response = response;
    return error;
}

function parseJson(response: Response) {
    return response.json();
}

export default function request(url: string, options?: object) {
    return fetch(`${httpServer}${url}`, {...defaultOptions, ...options})
        .then(checkStatus)
        .then(parseJson)
        .catch((error: any) => {
            console.log(error);
            return { error };
        })
}

// 文件上传请求
export function requestUpload(url: string, options?: object){
    //此处需要深拷贝，否则 delete 会删除 headers: 'content-type'
    let defaultClone = JSON.parse(JSON.stringify(defaultOptions));
    let fetchConfig = {...defaultClone, ...options};
    delete fetchConfig['headers']['content-type'];
    return fetch(`${httpServer}${url}`, fetchConfig)
    .then(checkStatus)
    .then(parseJson)
    .catch((error: any) => {
        console.log(error);
        return { error };
    })
}

//文件上传路径
export const imgUpload = `${httpServer}/api/upload`;