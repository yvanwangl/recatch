function formatDate(date: Date | string){
    if(typeof date == 'string') {
        date = new Date(date);
    }
    return date;
}

/*日期格式化工具方法*/
export function dateFormat(date: Date | string) {
    date = formatDate(date);
    let year = date.getFullYear();
    let month = `0${date.getMonth()+1}`.substr(-2);
    let day = `0${date.getDate()}`.substr(-2);
    return `${year}-${month}-${day}`;
}

/*时间格式化工具方法*/
export function timeFormat(date: Date | string) {
    date = formatDate(date);
    let hours = `0${date.getHours()}`.substr(-2);
    let minutes = `0${date.getMinutes()}`.substr(-2);
    return `${hours}:${minutes}`;
}

/*时间格式化 时:分:秒*/
export function timeFormat2(date: Date | string){
    date = formatDate(date);
    let hours = `0${date.getHours()}`.substr(-2);
    let minutes = `0${date.getMinutes()}`.substr(-2);
    let seconds = `0${date.getSeconds()}`.substr(-2);
    return `${hours}:${minutes}:${seconds}`;
}