import React,{useState,useEffect} from 'react'
import $ from 'jquery'
import css from './css/list.css'
import {Button,notification} from 'antd'
import { getDiffday } from './js/common'

function list() {

  const [List,setList] = useState([])
   // 加载状态
   const [isLoading,setIsLoading]=useState(false)
   // 初始数量
  const [currentNum,setCurrentNum]=useState(15)

useEffect(() => {
  // 显示加载
  setIsLoading(true)

  function LoadList(){
    $.ajax({
      type: "post",
      url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
      data: {
        url: ` https://36kr.com/api/newsflash?per_page=${currentNum}`,
      },
      success: function (response) {
        // console.log(response)
        setList(response.data.items)
        // 加载完成
        setIsLoading(false)
      },
      error: function (error) {
        console.log(error)
      }

    })
  }
  LoadList()
},[currentNum])

// console.log(List)

  // 加载下一页数据
  const MoreNum = ()=>{
    if(currentNum<200){
      setCurrentNum(currentNum + 5)
    }else{
      notification.info({message:'没有更多数据了'})
    }
  }


  return (<div>
    <div className={css.NewsLeft}>
      {List.map(item =>{
         return <div className={css.flowItem} key={item.id}>
         <div className={css.dateCard}>
           <span className={css.month}>{new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1):(new Date().getMonth()+1)}月</span>
           <span className={`${css.day} ${css.weightBold}`}>{new Date().getDate()<10 ? '0'+(new Date().getDate()):(new Date().getDate())}</span>
         </div>
         <div className={css.itemMain}>
           <div className={css.newsflashItem}>
             <a className={css.itemTitle} rel="noopener noreferrer" target="_blank" href="javascript:void(0)">{item.title}</a>
             <div className={css.itemOther}>
                <span className={css.time}>{getDiffday(new Date(item.published_at),new Date())}前</span>
                <span>分享至</span>
                <div className={css.wechat}>
                  <img className={css.qrcode} src="https://s2.ax1x.com/2019/04/10/AT3F2T.png" alt="News" />
                  <div className={css.shareCode}>打开微信“扫一扫”，打开网页后点击屏幕右上角分享按钮</div>
               </div>
               <a className={css.weibo} rel="noopener noreferrer nofollow" target="_blank" href={`http://share.baidu.com/s?type=text&searchPic=1&sign=on&to=tsina&key=595885820&url=https://36kr.com/newsflashes/${item.id}&title=${item.title}`}> </a>
             </div>
             <div className={css.itemDesc}>
               {item.description}
               {item.news_url ? <a className={css.link} rel="noopener noreferrer nofollow" target="_blank" href={item.news_url}>原文链接</a>:'' }

             </div>
             {item.cover ? <img className={`${css.itemImage} ${css.small}`} src={item.cover} alt={item.title} /> : ''}
           </div>
         </div>
       </div>
        })}
      <Button  size='large' style={{marginLeft:'290px'}} loading={isLoading}  onClick={ () => {MoreNum()} }> &nbsp; &nbsp; &nbsp; &nbsp;查看更多&nbsp; &nbsp; &nbsp; &nbsp; </Button>
    </div>
    <div className={css.krNewsflashCatalogRight}>
      <div className={css.krWhiteSpace} style={{height:'40px',width:'100%',visibility:'hidden'}}>
      </div>
      <div className={css.krHotlist}>
        <div className={css.krColumnTitle}>
          <span className={css.krColumnTitleIcon}></span>
          <span className={`${css.krColumnTitleText} ${css.weightBold}`}>
            24小时热榜
          </span>
        </div>
        <div className={css.hotlistMain}>
          <div className={css.hotlistItemToptwo}>
            <a className={css.hotlistItemToptwoPic} href="/p/5193011" target="_blank" rel="noopener noreferrer" >
              <img className={css.scaleBig} src="https://pic.36krcnd.com/201904/10022827/o35x931ceeawyet8!heading" alt="36氪独家 | 上市前的“现金流攻防战”：字节跳动开启大范围期权换购" />
            </a>
            <span className={css.hotlistItemToptwoIcon} style={{backgroundPosition:'0 -153px'}}>
            </span>
            <a className={css.hotlistItemToptwoTitle} href="/p/5193011" target="_blank" rel="noopener noreferrer">
              <p className={`${css.ellipsis2} ${css.weightBold}`}>
                36氪独家 | 上市前的“现金流攻防战”：字节跳动开启大范围期权换购
              </p>
            </a>
          </div>
          <div className={css.hotlistItemToptwo}>
            <a className={css.hotlistItemToptwoPic} href="/p/5193011" target="_blank" rel="noopener noreferrer" >
              <img className={css.scaleBig} src="https://pic.36krcnd.com/201904/09112705/x4uqdaegrwnut3bw!heading" alt="一个“不务正业”经济学家和他的“怪胎”" />
            </a>
            <span className={css.hotlistItemToptwoIcon} style={{backgroundPosition:'0 -191px'}}>
            </span>
            <a className={css.hotlistItemToptwoTitle} href="/p/5193011" target="_blank" rel="noopener noreferrer">
              <p className={`${css.ellipsis2} ${css.weightBold}`}>
                  一个“不务正业”经济学家和他的“怪胎”
              </p>
            </a>
          </div>
          <div className={`${css.hotlistItemOther} ${css.clearfloat}`}>
            <div className={css.hotlistItemOtherPic}>
              <a href="/p/5193146" target="_blank" rel="noopener noreferrer">
                <img className={css.scaleBig} src="https://pic.36krcnd.com/201904/09231224/0to97havckt1ci6g!heading" alt="8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%" />
              </a>
              <span className={css.hotlistItemOtherIcon} style={{backgroundPosition:'0 -228px',backgroundColor:'#262626',opacity:1}}>
              </span>
            </div>
            <div className={css.hotlistItemOtherInfo}>
              <a className={` ${css.hotlistItemOtherTitle} ${css.ellipsis2} ${css.weightBold}`} href="/p/5193146">
                8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%
              </a>
              <span className={css.hotlistItemOtherTime}>昨天</span>
            </div>
          </div>
          <div className={`${css.hotlistItemOther} ${css.clearfloat}`}>
            <div className={css.hotlistItemOtherPic}>
              <a href="/p/5193146" target="_blank" rel="noopener noreferrer">
                <img className={css.scaleBig} src="https://pic.36krcnd.com/201904/10003851/28yhad3boosdm8k2!heading" alt=" 最前线 | 京东计划裁员8%，涉及约12000个岗位" />
              </a>
              <span className={css.hotlistItemOtherIcon} style={{backgroundPosition:'0 -248px',backgroundColor:'#262626',opacity:.5}}>
              </span>
            </div>
            <div className={css.hotlistItemOtherInfo}>
              <a className={` ${css.hotlistItemOtherTitle} ${css.ellipsis2} ${css.weightBold}`} href="/p/5193146">
              最前线 | 京东计划裁员8%，涉及约12000个岗位
              </a>
              <span className={css.hotlistItemOtherTime}>昨天</span>
            </div>
          </div>
          <div className={`${css.hotlistItemOther} ${css.clearfloat}`}>
            <div className={css.hotlistItemOtherPic}>
              <a href="/p/5193146" target="_blank" rel="noopener noreferrer">
                <img className={css.scaleBig} src="https://pic.36krcnd.com/201904/09091436/7w7a7b38altg5w2d!heading" alt="焦点分析 | AirPods 是有多挣钱？亚马逊谷歌也开始和苹果抢耳机生意" />
              </a>
              <span className={css.hotlistItemOtherIcon} style={{backgroundPosition:'0 -268px',backgroundColor:'#262626',opacity:.5}}>
              </span>
            </div>
            <div className={css.hotlistItemOtherInfo}>
              <a className={` ${css.hotlistItemOtherTitle} ${css.ellipsis2} ${css.weightBold}`} href="/p/5193146">
              焦点分析 | AirPods 是有多挣钱？亚马逊谷歌也开始和苹果抢耳机生意
              </a>
              <span className={css.hotlistItemOtherTime}>昨天</span>
            </div>
          </div>
          <div className={`${css.hotlistItemOther} ${css.clearfloat}`}>
            <div className={css.hotlistItemOtherPic}>
              <a href="/p/5193146" target="_blank" rel="noopener noreferrer">
                <img className={css.scaleBig} src="https://pic.36krcnd.com/201904/09231224/0to97havckt1ci6g!heading" alt="8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%" />
              </a>
              <span className={css.hotlistItemOtherIcon} style={{backgroundPosition:'0 -288px',backgroundColor:'#262626',opacity:.5}}>
              </span>
            </div>
            <div className={css.hotlistItemOtherInfo}>
              <a className={` ${css.hotlistItemOtherTitle} ${css.ellipsis2} ${css.weightBold}`} href="/p/5193146">
                8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%
              </a>
              <span className={css.hotlistItemOtherTime}>昨天</span>
            </div>
          </div>
          <div className={`${css.hotlistItemOther} ${css.clearfloat}`}>
            <div className={css.hotlistItemOtherPic}>
              <a href="/p/5193146" target="_blank" rel="noopener noreferrer">
                <img className={css.scaleBig} src="https://pic.36krcnd.com/201904/09231224/0to97havckt1ci6g!heading" alt="8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%" />
              </a>
              <span className={css.hotlistItemOtherIcon} style={{backgroundPosition:'0 -308px',backgroundColor:'#262626',opacity:.5}}>
              </span>
            </div>
            <div className={css.hotlistItemOtherInfo}>
              <a className={` ${css.hotlistItemOtherTitle} ${css.ellipsis2} ${css.weightBold}`} href="/p/5193146">
                8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%
              </a>
              <span className={css.hotlistItemOtherTime}>昨天</span>
            </div>
          </div>
          <div className={`${css.hotlistItemOther} ${css.clearfloat}`}>
            <div className={css.hotlistItemOtherPic}>
              <a href="/p/5193146" target="_blank" rel="noopener noreferrer">
                <img className={css.scaleBig} src="https://pic.36krcnd.com/201904/09231224/0to97havckt1ci6g!heading" alt="8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%" />
              </a>
              <span className={css.hotlistItemOtherIcon} style={{backgroundPosition:'0 -328px',backgroundColor:'#262626',opacity:.5}}>
              </span>
            </div>
            <div className={css.hotlistItemOtherInfo}>
              <a className={` ${css.hotlistItemOtherTitle} ${css.ellipsis2} ${css.weightBold}`} href="/p/5193146">
                8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%
              </a>
              <span className={css.hotlistItemOtherTime}>昨天</span>
            </div>
          </div>
          <div className={`${css.hotlistItemOther} ${css.clearfloat}`}>
            <div className={css.hotlistItemOtherPic}>
              <a href="/p/5193146" target="_blank" rel="noopener noreferrer">
                <img className={css.scaleBig} src="https://pic.36krcnd.com/201904/09231224/0to97havckt1ci6g!heading" alt="8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%" />
              </a>
              <span className={css.hotlistItemOtherIcon} style={{backgroundPosition:'0 -348px',backgroundColor:'#262626',opacity:.5}}>
              </span>
            </div>
            <div className={css.hotlistItemOtherInfo}>
              <a className={` ${css.hotlistItemOtherTitle} ${css.ellipsis2} ${css.weightBold}`} href="/p/5193146">
                8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%
              </a>
              <span className={css.hotlistItemOtherTime}>昨天</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>)
}

export default list
