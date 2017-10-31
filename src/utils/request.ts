import fetch from 'isomorphic-fetch';

interface Response {
    status: number;
    statusText: string;
    json: Function;
}

function checkStatus(response: Response): object{
    let responseStatus = response.status;
    if(responseStatus>=200 && responseStatus<300){
        return response;
    }
    const error = new Error(`Response error with status: ${response.statusText}`);
    (<any>error).response = response;
    return error;
}

function parseJson(response:Response){
    return response.json();
}

export default function request(url:string, options?:object){
    return fetch(`http://localhost:3000${url}`, options)
                .then(checkStatus)
                .then(parseJson)
                .catch((error:any)=> {
                    console.log(error);
                    return {error};
                })
}