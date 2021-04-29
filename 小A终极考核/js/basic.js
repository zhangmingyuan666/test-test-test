let baseUrl = 'http://www.rushmc.top/api/';
let basicUrl = 'http://www.rushmc.top/';

function toTime(strTime) {
    if (!strTime) {
        return '';
    }
    var myDate = new Date(strTime + '+0800');
    if (myDate == 'Invalid Date') {
        strTime = strTime.replace(/T/g, ' '); //去掉T
        strTime = strTime.replace(/-/g, '/');
        strTime = strTime.replace(/\.\d+/, ' '); //去掉毫秒
        myDate = new Date(strTime);
    }
    return myDate;
}