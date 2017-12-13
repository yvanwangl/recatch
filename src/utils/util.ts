function formatDate(date: Date | string) {
    if (typeof date == 'string') {
        date = new Date(date);
    }
    return date;
}

/**
 * 日期格式化工具方法
 * @param date 
 * @param formatType  1: 2017-03-22 ; 2: 2017年03月22日
 */
export function dateFormat(date: Date | string, formatType: number = 1) {
    date = formatDate(date);
    let year = date.getFullYear();
    let month = `0${date.getMonth() + 1}`.substr(-2);
    let day = `0${date.getDate()}`.substr(-2);
    let dateStr = `${year}-${month}-${day}`;
    switch (formatType) {
        case 1:
            dateStr = `${year}-${month}-${day}`;
            break;
        case 2:
            dateStr = `${year}年 ${month}月 ${day}日`;
            break;
    }
    return dateStr;
}

/*时间格式化工具方法*/
export function timeFormat(date: Date | string) {
    date = formatDate(date);
    let hours = `0${date.getHours()}`.substr(-2);
    let minutes = `0${date.getMinutes()}`.substr(-2);
    return `${hours}:${minutes}`;
}

/*时间格式化 时:分:秒*/
export function timeFormat2(date: Date | string) {
    date = formatDate(date);
    let hours = `0${date.getHours()}`.substr(-2);
    let minutes = `0${date.getMinutes()}`.substr(-2);
    let seconds = `0${date.getSeconds()}`.substr(-2);
    return `${hours}:${minutes}:${seconds}`;
}

/*评论格式化*/
export function formatComments(comments: any) {
    let copyComments = comments.map((originC: any) => Object.assign({}, originC));
    let newComments = [];
    for (let comment of copyComments) {
        if (comment['parentId'] == '') {
            newComments.push(comment);
        } else {
            let parentComment = copyComments.filter((c: any) => c['_id'] == comment['parentId'])[0];
            parentComment['children'] = parentComment['children'] || [];
            parentComment['children'].push(comment);
            sortComments(parentComment['children']);
        }
    }
    return sortComments(newComments);
}

function sortComments(comments: any) {
    return comments.sort((commentA: any, commentB: any) => new Date(commentB['commentTime']).getTime() - new Date(commentA['commentTime']).getTime());
}

/**
 * 判断一个对象是否为空对象
 */
export function emptyObj(obj: object){
    if(typeof obj !== 'object'){
        throw new Error('obj must be object type');
    }
    for(let key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)){
            return false;
        }
    }
    return true;
}