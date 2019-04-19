import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import Link from 'umi/link'


import css from '../css/zixun.css'
import { Button, notification } from 'antd'


function HotTitle(props) {

  console.log(props.location.query.tid)
  const tid=props.location.query.tid;
   //加载的初始数据
  // const { id } = props

   const [title,setTitle]=useState([])
   const [List, setList] = useState([])

   // 加载状态
   const [isLoading, setIsLoading] = useState(false)
   // 初始数量
   const [currentNum, setCurrentNum] = useState(20)


   useEffect(() => {

     function LoadTitle() {
       $.ajax({
         type: "post",
         url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
         data: {
           url: `https://36kr.com/pp/api/motif/${tid}`,
         },
         success: function (response) {
           // console.log(response)
           setTitle(response.data)
         },
         error: function (error) {
           console.log(error)
         }
       });
     }

     // 显示加载
     setIsLoading(true)

     function LoadList() {
       $.ajax({
         type: "post",
         url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
         data: {
           url: `https://36kr.com/pp/api/motif/${tid}/entities?per_page=${currentNum}`,
         },
         success: function (response) {
          //  console.log(response)
           setList(response.data.items)
           // 加载完成
           setIsLoading(false)
         },
         error: function (error) {
           console.log(error)
         }

       })
     }
     //咨询类型
     LoadTitle()
     //新闻列表
     LoadList()
   }, [tid, currentNum])

   // console.log(List)

   // 加载下一页数据
   const MoreNum = () => {
     if (currentNum < 250) {
       setCurrentNum(currentNum + 10)
     } else {
       notification.info({ message: '没有更多数据了' })
     }
   }



  return (
    <div>
      <div className={css.NewLeft}>
      <div className={css.motifDetailBanner}>
      <div className={css.mask}></div>
      <img className="" src={title.banner} alt={title.name} />
      <span className={`${css.motifDetailBannerTitle} ${css.wightBold} ${css.ellipsis1}`}>{title.name}</span>
      </div>
        <div className={css.krInformationFlow}>
          {List.map(list => {
           return  list.post ? <div className={css.informationFlowItem} key={list.id}>
              <div className={css.krFlowArticleItem}>
                <div className={css.krShadowWrapper}>
                  <div className={css.krShadowWrapperCard} style={{ width: '720px', height: '173px', top: '-15px', left: '-10px' }}>
                  </div>
                  <div className={css.krShadowContent}>
                    <a className={css.articleItemPic} href={`https://36kr.com/p/${list.entity_id}`} target="_blank" rel="noopener noreferrer">
                      <img className={css.scaleBig} src={list.post.cover} alt={list.post.title} />
                    </a>
                    <div className={`${css.articleItemInfo} ${css.clearfloat}`}>
                      <p className={`${css.feedTitleWrapper} ${css.ellipsis2}`}>
                        <a className={`${css.articleItemTitle} ${css.weightBold}`} href={`https://36kr.com/p/${list.entity_id}`} target="_blank" rel="noopener noreferrer">{list.post.title}</a>
                      </p>
                      <a className={`${css.articleItemDescription} ${css.ellipsis2}`} href={`https://36kr.com/p/${list.entity_id}`} target="_blank" rel="noopener noreferrer">{list.post.summary}</a>
                      <div className={css.krFlowBar}>
                        <a className={css.krFlowBarAuthor} href={`https://36kr.com/user/${list.post.user.id}`} target="_blank" rel="noopener noreferrer">{list.post.user.name}</a>
                        <span className={css.krFlowBarTime} style={{ float: 'right' }}>
                          <i className={css.krFlowBarTimeIcon}></i>
                          {list.post.published_at.split(' ')[0]}
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> : ''
          })}
        </div>


        <Button size='large' style={{ marginLeft: '290px' }} loading={isLoading} onClick={() => { MoreNum() }}> &nbsp; &nbsp; &nbsp; &nbsp;查看更多&nbsp; &nbsp; &nbsp; &nbsp; </Button>
      </div>
      <div className={css.krInformationRight}>
        <div className={css.krFollow} style={{top: "30px"}}>
          <div className={css.krInformationRecommendMotifCotainer}>
            <div className={css.krRecommendMotif}>
              <div className={css.krColumnTitle}>
                <span className={css.krColumnTitleIcon}></span>
                <span className={`${css.krColumnTitleText} ${css.weightBold}`}>推荐主题</span>
              </div>
              <div className={css.recommendMotifList}>
                <div className={css.recommendMotifItem}>
                  <div className={`${css.recommendMotifItemBanner} ${css.clearfloat}`}>
                    <Link className={css.recommendMotifItemBannerPic} to="/information/HotTitle?tid=552" target="_blank" rel="noopener noreferrer">
                      <img className={css.scaleBig} src="https://pic.36krcnd.com/201904/10061748/bc3r1su7a3hw9whf" alt="智氪分析" />
                    </Link>
                    <div className={css.recommendMotifItemBannerInfo}>
                      <Link className={`${css.recommendMotifItemBannerTitle} ${css.ellipsis1} ${css.weightBold}`} to="/information/HotTitle?tid=552" target="_blank" rel="noopener noreferrer">智氪分析</Link>
                      <span className={css.recommendMotifItemBannerFollow}>1043关注</span>
                    </div>
                  </div>
                  <a className={`${css.recommendMotifItemDescription} ${css.ellipsis2}`} href="https://36kr.com/p/5154077" target="_blank" rel="noopener noreferrer">智氪研究 | 美团点评到底值多少钱？</a>
                  <div className={css.recommendMotifItemTime}>2018-09-19</div>
                </div>
                <div className={css.recommendMotifItem}>
                  <div className={`${css.recommendMotifItemBanner} ${css.clearfloat}`}>
                    <Link className={css.recommendMotifItemBannerPic} to="/information/HotTitle?tid=504" target="_blank" rel="noopener noreferrer">
                      <img className={css.scaleBig} src="https://pic.36krcnd.com/201902/14032339/nqaetj018p8foc60" alt="出海印度，先读懂印度" />
                    </Link>
                    <div className={css.recommendMotifItemBannerInfo}>
                      <Link className={`${css.recommendMotifItemBannerTitle} ${css.ellipsis1} ${css.weightBold}`} to="/information/HotTitle?tid=504" target="_blank" rel="noopener noreferrer">出海印度，先读懂印度</Link>
                      <span className={css.recommendMotifItemBannerFollow}>2738关注</span>
                    </div>
                  </div>
                  <a className={`${css.recommendMotifItemDescription} ${css.ellipsis2}`} href="https://36kr.com/p/5185651" target="_blank" rel="noopener noreferrer">航海时氪 | 对话阿里速卖通王明强：不是只要卖家的货，Build to last 的跨境电商平台一定要做“重”</a>
                  <div className={css.recommendMotifItemTime}>12分钟前</div>
                </div>
                <div className={css.recommendMotifItem}>
                  <div className={`${css.recommendMotifItemBanner} ${css.clearfloat}`}>
                    <Link className={css.recommendMotifItemBannerPic} to="/information/HotTitle?tid=414" target="_blank" rel="noopener noreferrer">
                      <img className={css.scaleBig} src="https://pic.36krcnd.com/201811/09022011/5895f40p8yjkjqhn" alt="人工智能·AI" />
                    </Link>
                    <div className={css.recommendMotifItemBannerInfo}>
                      <Link className={`${css.recommendMotifItemBannerTitle} ${css.ellipsis1} ${css.weightBold}`} to="/information/HotTitle?tid=414" target="_blank" rel="noopener noreferrer">人工智能·AI</Link>
                      <span className={css.recommendMotifItemBannerFollow}>21592关注</span>
                    </div>
                  </div>
                  <a className={`${css.recommendMotifItemDescription} ${css.ellipsis2}`} href="https://36kr.com/p/5180120" target="_blank" rel="noopener noreferrer">斐讯60人离职创办「铼锶信息」，想用边缘计算实时关注你的健康</a>
                  <div className={css.recommendMotifItemTime}>9分钟前</div>
                </div>
                <div className={css.recommendMotifItem}>
                  <div className={`${css.recommendMotifItemBanner} ${css.clearfloat}`}>
                    <Link className={css.recommendMotifItemBannerPic} to="/information/HotTitle?tid=331" target="_blank" rel="noopener noreferrer">
                      <img className={css.scaleBig} src="https://pic.36krcnd.com/201811/09041845/0lwbvfdeed270uu2" alt="深氪" />
                    </Link>
                    <div className={css.recommendMotifItemBannerInfo}>
                      <Link className={`${css.recommendMotifItemBannerTitle} ${css.ellipsis1} ${css.weightBold}`} to="/information/HotTitle?tid=331" target="_blank" rel="noopener noreferrer">深氪</Link>
                      <span className={css.recommendMotifItemBannerFollow}>6257关注</span>
                    </div>
                  </div>
                  <a className={`${css.recommendMotifItemDescription} ${css.ellipsis2}`} href="https://36kr.com/p/5191427" target="_blank" rel="noopener noreferrer">「赌徒」暴风的致命时刻 | 深氪·小败局</a>
                  <div className={css.recommendMotifItemTime}>2019-04-03</div>
                </div>
                <div className={css.recommendMotifItem}>
                  <div className={`${css.recommendMotifItemBanner} ${css.clearfloat}`}>
                    <Link className={css.recommendMotifItemBannerPic} to="/information/HotTitle?tid=518" target="_blank" rel="noopener noreferrer">
                      <img className={css.scaleBig} src="https://pic.36krcnd.com/201903/05111141/pj38o6f3y27dzwq0" alt="这就是商业" />
                    </Link>
                    <div className={css.recommendMotifItemBannerInfo}>
                      <Link className={`${css.recommendMotifItemBannerTitle} ${css.ellipsis1} ${css.weightBold}`} to="/information/HotTitle?tid=518" target="_blank" rel="noopener noreferrer">这就是商业</Link>
                      <span className={css.recommendMotifItemBannerFollow}>4670关注</span>
                    </div>
                  </div>
                  <a className={`${css.recommendMotifItemDescription} ${css.ellipsis2}`} href="https://36kr.com/p/5191949" target="_blank" rel="noopener noreferrer">这就是商业｜如涵为张大奕“打工”</a>
                  <div className={css.recommendMotifItemTime}>2019-04-05</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotTitle
