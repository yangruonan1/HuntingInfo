import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import {Button,notification} from 'antd'
import css from '../css/activity.css'

function Activity() {
  const [listData, setListData] = useState([])
  const [currentPage,setCurrentPage]=useState(1)
  // 加载状态
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    // https://chuang.36kr.com/api/actapply?page=1&pageSize=12
    setIsLoading(true)
    function getData() {
      $.ajax({
        type: "post",
        url: "https://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: `https://chuang.36kr.com/api/actapply?page=${currentPage}&pageSize=12`
        },
        success: function (response) {
          console.log(response)
          setListData(listData.concat(response.data.data))
          // console.log(listData)
          setIsLoading(false)
        },
        error: function (err) {
          console.log(err)
        }
      });
    }
    getData()
  }, [currentPage])
  console.log(listData)


  // 加载下一页数据
  const nextPage = ()=>{
    if(currentPage<20){
      setCurrentPage(currentPage + 1)
    }else{
      notification.info({message:'没有更多数据了'})
    }
  }

  function format(date,s,r) {//s是日期连接的方式
    var month = date.getMonth()+1;//月份从0开始
    var day = date.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    var str =month + s + day + r;
    return str;
  }
  // var oDate = new Date(1561478400000);
  // console.log(format(oDate,"月","日"))
  return (
    <div className={css.actMain}>
      {listData.map(item => {
        return (<div key={item.activityId} className={`${css.itemList} ${css.ngScope}`}>
          <a href={item.link} target="_blank">
            <div className={css.header}>
              <img src={item.listImageUrl} />
            </div>
            <div className={css.center}>
              <div className={css.top}>
                <span className={`${css.itemTitle} ${css.ngBinding}`}>
                  {item.title}
                </span>
                <span className={`${css.itemStatus} ${css.ngBinding} ${css.blueColor}`}>报名中</span>
              </div>
              <div className={`${css.itemDesc} ${css.ngBinding}`}>
                {item.description}
              </div>
            </div>
            <div className={css.bottom}>
              <span className={css.address}>
                <i className={css.iconLocation}></i>
                <span className={css.ngBinding}>{item.city}</span>
              </span>
              <span className={css.times}>
                <i className={css.iconTime}></i>
                <span>
                  <span className={css.ngBinding}>
                    {format(new Date(item.activityBeginTime),"月","日")}
                  </span>
                  <span className={css.ngBinding}>
                    -{format(new Date(item.activityEndTime),"月","日")}
                  </span>
                </span>
              </span>
            </div>
          </a>
         </div>)
      })}
      <div className={css.btn}>
        <Button  size='large' style={{backgroundColor:'#e9eaec'}} block loading={isLoading}  onClick={ () => {nextPage()} }> &nbsp; &nbsp; &nbsp; &nbsp;查看更多&nbsp; &nbsp; &nbsp; &nbsp; </Button>
      </div>
    </div>
  )
}

export default Activity





