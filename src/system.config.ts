
const debug = process.env.NODE_ENV === 'development';

console.log(process.env.NODE_ENV);

//开发模式，跨域请求
//跨域请求url
const httpServerDev = 'http://localhost:8082';
//跨域请求头配置
const defaultOptionsDev = {
     mode: 'cors',
     credentials: 'include',
     headers: {
        'content-type': 'application/json'
     },
 };

//部署模式，同域请求
// 同域请求url
const httpServerProd = '/';
//同域请求头配置
const defaultOptionsProd = {
    credentials: 'same-origin',
    headers: {
        'content-type': 'application/json'
    },
};

module.exports = {
    httpServer: debug ? httpServerDev : httpServerProd,
    defaultOptions: debug ? defaultOptionsDev : defaultOptionsProd
};