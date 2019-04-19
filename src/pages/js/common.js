 //判断两个日期相差多少天多少小时多少分多少秒
 export function  getDiffday(date1,date2){

  var ss=Math.abs(date2-date1)/1000;
  var day=Math.floor(ss/3600/24);
  var hour=Math.floor(ss/3600%24);
  var minute=Math.floor(ss/60%60);
  var second=Math.floor(ss%60);

  if(day>0){
    return day+"天"
  }else if(hour>0){
    return hour+"小时"
  }else if(minute>0){
    return minute+"分"
  }else{
    return second+"秒"
  }


  // return  day+"天"+hour+"小时"+minute+"分"+second+"秒";
}
