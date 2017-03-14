/**
 * 
 */

export function dateToLest (dateString = "") {
    const disMin = Math.floor((new Date() - new Date(dateString)) / 1000 / 60);
    let tip = "刚刚";
    if (Math.floor(disMin / 60 / 24 / 365) > 0) {
        tip = Math.floor(disMin / 60 / 24 / 365) + "年前";
    } else if (Math.floor(disMin / 60 / 24 / 30) > 0) {
        tip = Math.floor(disMin / 60 / 24 / 30) + "月前";
    } else if (Math.floor(disMin / 60 / 24) > 0) {
        tip = Math.floor(disMin / 60 / 24) + "天前";
    } else if (Math.floor(disMin / 60) > 0) {
        tip = Math.floor(disMin / 60) + "小时前";
    } else if (disMin > 1) {
        tip = disMin + "分钟前";
    }
    return tip;
}