import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import { BackTop } from 'antd';
import css from '../css/topics_detail.css'

function TopicsDetail(props) {
  // console.log(props.match.params.topics_detail)
  const [dataDetail, setDataDetail] = useState([])
  const [strData, setStrData] = useState([])
  const [show, setShow] = useState(false)
  const xinxi = [{
    id: 1,
    title: '36氪',
    url: 'https://s2.ax1x.com/2019/04/11/A77Jrq.jpg',
    desc: '为你推送和解读最前沿、最有料的科技创投资讯',
  },{
    id: 2,
    title: '精准',
    url: 'https://s2.ax1x.com/2019/04/11/A77BRJ.jpg',
    desc: '一级市场金融信息和系统服务提供商',
  },{
    id: 3,
    title: '氪空间',
    url: 'https://s2.ax1x.com/2019/04/11/A77Dz9.jpg',
    desc: '聚集全球最优秀的创业者，项目融资率接近97%，领跑行业',
  }]
  const [id, setId] = useState(1)
  const [strName, setStrName] = useState('今日最 HOT 文章')


  useEffect(() => {
    function getData() {
      $.ajax({
        type: "post",
        url: "https://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: `https://36kr.com/pp/api/monographic/${props.match.params.topics_detail}`
        },
        success: function (response) {
          console.log(response)
          setDataDetail(response.data)
          setStrData(JSON.parse(response.data.list).layout_data)
        },
        error: function (err) {
          console.log(err)
        }
      });
    }
    getData()
  }, [])
  console.log(dataDetail)
  console.log(strData)

  window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop > 150){
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    border: '1px solid  #ddd',
  };

  return (
    <div>
      <div clssName={css.topicsDetailHeader}>
        <p className={css.headerBanner}>
          <img src={dataDetail.cover_web} />
        </p>
        {/* <div clssName={css.headerBanner1} stype={{width:'100%',height: '248px'}}>
          <img src={dataDetail.cover_web} />
        </div> */}
        <div clssName={css.headerTitle}>
          <div className={css.headerTitleTop}>
            <a>热点专题</a>
          </div>
          <div className={css.headerTitleBottom}>
            <h1>{dataDetail.title}</h1>
            <div className={css.shareContent}>
              <div className={css.wechat}>
                <div className={css.shareCode}>
                  <img src='https://s2.ax1x.com/2019/04/10/ATO7T0.png' />
                  打开微信“扫一扫”，打开网页后点击屏幕右上角分享按钮
                </div>
              </div>
              <a href={`http://share.baidu.com/s?type=text&searchPic=1&sign=on&to=tsina&key=595885820&url=https://36kr.com/topics/${dataDetail.id}?version=new&title=${dataDetail.title}`} className={css.weibo}></a>
            </div>
          </div>
        </div>
        <div className={css.topicDetailDesc}>
          {dataDetail.summary}
        </div>
        <div className={css.topicDetailPlatetab}>
          <div className={`${css.platetabContent} ${css.ellipsis1}`}>
            {strData.map(item => {
              return (<span key={item.childList.ids} onClick={()=>{
                setStrName(item.name)
              }} className={`${css.platetabItem} ${strName==item.name?css.active:''}`}>{item.name}</span>)
            })}
          </div>
        </div>
        <div className={css.topicDetailSubstance}>
          <div className={css.plateWraper}>

            {/* <div className={css.substanceWraper}>
              <h2 className={css.substanceTitle}>{}</h2>
              <ul className={css.substancePost}>
                <li className={css.listItem}>
                  <span className={css.hover}></span>
                  <a className={css.listIetmLeft} href=''>
                    <img className={css.itemCover} src='' alt='' />
                  </a>
                  <div className={css.listIetmRight}>
                    <a href='' className={`${css.itemTitle} ${css.itemEllipsis2}`}></a>
                    <div className={css.itemDesc}>
                      <p className={css.ellipsis3}></p>
                    </div>
                    <div className={css.itemOther}>
                      <div className={css.itemOtherLeft}>
                        <a href="" className={css.link}></a>
                      </div>
                      <div className={css.itemOtherRight}>
                        <span className={css.time}></span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}

          </div>
        </div>

      </div>
      <div className={css.assitWrapper}>
        <a href="http://feedback-36kr.mikecrm.com/FAN8f76" target="_blank" className={css.feedBack}>
          <div className={css.feedBackImg}></div>
          <div className={css.feedText}>意见反馈</div>
        </a>
        <div className={css.phone}>
          <div className={css.phoneImg}></div>
          <div className={`${css.phoneContent}  ${css.phoneHover}`}>
            <img src="https://sta.36krcnd.com/36krx2018-front/static/code.01e4c342.png" />
            <div className={css.content}>
              <span>36氪APP</span>
              <span>让一部分人先看到未来</span>
            </div>
          </div>
        </div>
        <div className={css.code}>
          <div className={css.codeImg}></div>
          <div className={`${css.codeContent} ${css.contentHover}`}>
          <div className={css.tabs}>
            {xinxi.map(item => {
              return (<div onClick={()=>setId(item.id)} className={id == item.id?css.bg:''} key={item.id} data-index={item.id}>{item.title}</div>)
            })}
          </div>
          <div className={css.tabContent}>
            {xinxi.map(t => {
              if(t.id == id) {
                return(<div>
                        <img src={t.url} alt=""/>
                        <p>{t.desc}</p>
                      </div>)
              }
            })}
          </div>
          </div>
        </div>
        <div className={`${css.top}`}>
          <BackTop style={{ bottom: 61,right: 10 }}  visibilityHeight={150}>
          <div className={css.topImg} style={style}></div>
          </BackTop>
        </div>
      </div>
    </div>
  )
}

export default TopicsDetail



