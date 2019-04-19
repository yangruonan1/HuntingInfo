import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import { connect } from 'dva';


import css from '../css/zixun.css'
import { Button, notification } from 'antd'

function zixun(props) {
  //加载的初始数据
  console.log(props.location.query.aid)
  const aid = props.location.query.aid;
  const [Num,setNum]=useState(0)
  const [Author, setAuthor] = useState([])
  const [List, setList] = useState([])

  // 加载状态
  const [isLoading, setIsLoading] = useState(false)
  // 初始数量
  const [currentNum, setCurrentNum] = useState(30)


  useEffect(() => {

    function LoadType() {
      $.ajax({
        type: "post",
        url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: `https://36kr.com/pp/api/user/${aid}`,
        },
        success: function (response) {
          // console.log(response)
          setAuthor(response.data)
          const num=response.data.counters.post_create
          setNum(num)
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
          url: `https://36kr.com/pp/api/search-column/authorpage?user_id=${aid}&page=2&per_page=${currentNum}`,
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
    //作者
    LoadType()
    //新闻列表
    LoadList()
  }, [aid, currentNum])

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
        <div className={css.krInformationFlow}>
          {List.map(list => {
            return <div className={css.informationFlowItem} key={list.id}>
              <div className={css.krFlowArticleItem}>
                <div className={css.krShadowWrapper}>
                  <div className={css.krShadowWrapperCard} style={{ width: '720px', height: '173px', top: '-15px', left: '-10px' }}>
                  </div>
                  <div className={css.krShadowContent}>
                    <a className={css.articleItemPic} href={`https://36kr.com/p/${list.id}`} target="_blank" rel="noopener noreferrer">
                      <img className={css.scaleBig} src={list.cover} alt={list.title} />
                    </a>
                    <div className={`${css.articleItemInfo} ${css.clearfloat}`}>
                      <p className={`${css.feedTitleWrapper} ${css.ellipsis2}`}>
                        <a className={`${css.articleItemTitle} ${css.weightBold}`} href={`https://36kr.com/p/${list.id}`} target="_blank" rel="noopener noreferrer">{list.title}</a>
                      </p>
                      <a className={`${css.articleItemDescription} ${css.ellipsis2}`} href={`https://36kr.com/p/${list.id}`} target="_blank" rel="noopener noreferrer">{list.summary}</a>
                      <div className={css.krFlowBar}>
                        <span className={css.krFlowBarTime} style={{ float: 'left' }}>
                          <i className={css.krFlowBarTimeIcon}></i>
                          {list.published_at.split('T')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>


        <Button size='large' style={{ marginLeft: '290px' }} loading={isLoading} onClick={() => { MoreNum() }}> &nbsp; &nbsp; &nbsp; &nbsp;查看更多&nbsp; &nbsp; &nbsp; &nbsp; </Button>
      </div>
      <div className={css.kr_author_detail_right}>
        <div className={css.kr_follow} style={{ top: '30px' }}>
          <div className={css.kr_author_detail_follow_container}>
            <div className={css.kr_card}>
              <div className={css.top_line} style={{ height: '4px' }}></div>
              <div className={css.kr_card_content}>
                <div className={css.author_detail_info}>
                  <div className={`${css.author_detail_info_header} ${css.clearfloat}`}>
                    <a target="_blank" rel="noopener noreferrer">
                      <img className={css.author_avatar}
                        src={Author.avatar_url}
                        alt={Author.introduction} /></a>
                    <div className={css.info_header_text}><a className={`${css.author_name} ${css.ellipsis_1}`} target="_blank"
                      rel="noopener noreferrer">{Author.name}</a><span className={css.author_role}>{Author.title}</span></div>
                  </div>
                  <p className={css.author_description}>{Author.introduction}</p>
                  <div className={css.author_detail_info_footer}>
                    <div className={css.author_article_count}><i></i><span>{`发表文章${Num}篇`}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(state => state.Information)(zixun)
