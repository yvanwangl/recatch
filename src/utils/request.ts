import * as fetch from 'isomorphic-fetch';
const {httpServer, defaultOptions} = require('../../system.config');

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