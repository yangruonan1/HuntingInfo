import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import {Button,notification} from 'antd'
import Link from 'umi/link';
import css from '../css/topics.css'


function specialTopic() {
  const [listData, setListData] = useState([])

  // 加载状态
  const [isLoading,setIsLoading]=useState(false)
  // 初始数量
 const [currentNum,setCurrentNum]=useState(15)
  useEffect(() => {
    setIsLoading(true)// 显示加载
    function getData() {
      $.ajax({
        type: "post",
        url: "https://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: `https://36kr.com/pp/api/monographic?per_page=${currentNum}`
        },
        success: function (response) {
          console.log(response)
          setListData(response.data.items)
          console.log(listData)
          setIsLoading(false)
        },
        error: function (err) {
          console.log(err)
        }
      });
    }
    getData()
  }, [currentNum])
  // console.log(listData)
  // 加载下一页数据
  const MoreNum = ()=>{
    if(currentNum<200){
      setCurrentNum(currentNum + 15)
    }else{
      notification.info({message:'没有更多数据了'})
    }
  }

  return (
    <div className={css.layoutContent}>
      <div className={css.specialTopicCatalog}>
        <div className={css.specialTopicCatalogFlow}>
          <div className={css.loadingMore}>
            <div className={css.specialTopicCatalogFlowList}>
              {listData.map(item => {
                return (<div key={item.id} className={css.flowItem}>
                  <div className={css.shadowWrapper}>
                    <div className={css.shadowWrapperCard} ></div>
                    <div className={css.shadowContent} >
                      <Link to={{pathname: `/topics/${item.id}`}} target="_blank" className={css.flowItemPic}>
                        <img src={item.cover} className={css.scaleBig} alt={item.title}/>
                        <div className={css.flowItemTitle}>
                          <p className={`${css.ellipsis2} ${css.weightBold}`}>{item.title}</p>
                        </div>
                      </Link>
                      <div className={css.flowItemDescription}>
                        <p className={css.ellipsis3}>{item.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>)
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={css.btn}>
        <Button  size='large' block loading={isLoading}  onClick={ () => {MoreNum()} }> &nbsp; &nbsp; &nbsp; &nbsp;查看更多&nbsp; &nbsp; &nbsp; &nbsp; </Button>
      </div>
    </div>
  )
 }

export default specialTopic
