
const debug = process.env.NODE_ENV === 'development';

console.log(process.env.NODE_ENV);

//开发模式，跨域请求
//跨域请求url
const httpPortDev = 8082;
const httpServerDev = `http://localhost:${httpPortDev}`;
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
const httpPortProd = 8084;
const httpServerProd = `http://localhost:${httpPortProd}`;
//同域请求头配置
const defaultOptionsProd = {
    credentials: 'same-origin',
    headers: {
        'content-type': 'application/json'
    },
};

module.exports = {
    httpPort: debug ? httpPortDev : httpPortProd,
    httpServer: debug ? httpServerDev : httpServerProd,
    defaultOptions: debug ? defaultOptionsDev : defaultOptionsProd
};