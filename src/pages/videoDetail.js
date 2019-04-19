import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import Link from 'umi/link';
import css from './css/videoDetail.css'
function videoDetail(props) {
  const [Detail, setDetail] = useState([])
  const [Content, setContent] = useState([])
  const [Article, setArticle] = useState([])
  const [User, setUser] = useState([])
  useEffect(() => {
    // 显示加载
    const LoadList = () => {
      $.ajax({
        type: "post",
        url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: ` https://36kr.com/pp/api/video/${props.location.query.id}`,
        },
        success: function (res) {
          setDetail(res.data)
          setUser(res.data.user)
        },
        error: function (error) {
          console.log(error)
        }
      })
    }
    //加载评价
    const Loadcontent = () => {
      $.ajax({
        type: "post",
        url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: ` https://36kr.com/pp/api/subject-comment?per_page=20&page=1&ctype=video&cid=${props.location.query.id}`,
        },
        success: function (res) {
          if (res.data.items === null) {
            setContent([])
          } else {
            setContent(res.data.items)
          }
        },
        error: function (error) {
          console.log(error)
        }
      })
    }
    function AuthorPage() {
      $.ajax({
        type: "post",
        url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: `https://36kr.com/pp/api/search-column/authorpage?user_id=${props.location.query.user_id}&per_page=4`,
        },
        success: function (res) {
          setArticle(res.data.items)
        },
        error: function (error) {
          console.log(error)
        }
      })
    }
    AuthorPage()
    LoadList()
    Loadcontent()
  }, [])
  return (
    <div>
      <div className={css.kr_layout_content}>
        <div className={css.kr_video_detail}>
          <div className={`${css.video_detail_header} ${css.clearfloat}`}>
            <div className={css.header_left}>
              <h1 className={css.video_title}>{Detail.title}</h1>
              <div className={css.video_msg}><span><Link rel="noopener noreferrer" target="_blank"
                to={`/videoList?user_id=${Detail.user_id}`}>{User.name}</Link>&nbsp;·&nbsp;
                          {Detail.created_at}</span></div>
            </div>
            <div className={css.header_right}><Link className={css.video_author} rel="noopener noreferrer" target="_blank"
              to={`/videoList?user_id=${Detail.user_id}`}>
              <div className={css.author_avatar}
                style={{ backgroundImage: `url(${User.avatar_url})` }}>
              </div>
              <h4 className={css.author_name}>{User.name}</h4>
              <p className={`${css.author_desc} ${css.ellipsis_2}`}>{User.introduction}</p>
            </Link></div>
          </div>
          <div className={css.video_detail_player}>
            <div className={css.video_wraper}>
            <video className={css.video} controls={true} autoPlay={true} preload="true"
              src={Detail.url}>您的浏览器不支持视频播放，请升级浏览器。</video>
            </div>
            <div className={css.vider_recent_wraper}>
              <h2 className={css.recent_title}>最近视频</h2>
              <ul className={css.recent_list}>
                {Article.map(item => {
                  return (
                    <li className={css.recent_item} key={item.id}><Link className={css.recent_link} to={`/videoDetail?id=${item.id}&user_id=${item.user_id}`} target="_self"><span className={css.avatar}
                      style={{ backgroundImage: `url(${item.cover})` }}></span>
                      <div className={css.title}><span className={css.ellipsis_2}>{item.title}</span></div>
                      <div className={css.time}>{item.published_at}</div>
                    </Link></li>
                  )
                })}
              </ul><Link className={css.video_more_btn} rel="noopener noreferrer" target="_blank"
                to={`/videoList?user_id=${Detail.user_id}`}><span>阅读更多内容，狠戳这里</span></Link>
            </div>
          </div>
          <div className={css.video_detail_footer}>
            <p className={css.video_desc}>介绍：
                {Detail.summary}</p>
            <div className={css.kr_plugin_comment}>
              <div className={css.comment_part}>
                <div className={css.comment_part_title}>
                  <div className={css.kr_column_title}><span className={css.kr_column_title_icon}></span><span
                    className={`${css.kr_column_title_text} ${css.weight_bold}`}>参与讨论</span></div>
                </div>
                <div className={css.comment_input_content}>
                  <div className={css.comment_input_wrapper}><textarea id="js_comment_input" className={css.comment_input}
                    placeholder="你怎么看..."></textarea></div>
                  <div className={css.comment_control}><a className={css.comment_control_user}><span className={css.user_avatar}
                    style={{ backgroundImage: 'url("data:image/gif;base64,R0lGODlhMgAyANUAAAAAAP////7+/v39/fz8/Pv7+/r6+vn5+fj4+Pf39/b29vX19fT09PPz8/Ly8vHx8fDw8O/v7+7u7u3t7ezs7Ovr6+rq6unp6ejo6Ofn5+bm5uXl5eTk5OPj4+Li4uHh4eDg4P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACEALAAAAAAyADIAAAb/wItwSCwaj8ikcslsOp/QqHRKrVqv2Ktla8lGuxqOeLzJYC5c79HC6WQmjMNB8bhsOp5OZ6M2djQNAYKDggQMEBISFBl9Qx8VA4SSkg8cXX0fE5Obgg8ejWwXnJwQH5deGB0Fo5wWHadaHhKsnAgeZ1mpCbScdl4aGAK8mxIdXhsVw5sOxlkcycqSDRxez9HS1M7Q14LTXiAW3IMNIBpYGxGR4gECCxqMVBbvwuuDD69VGRnq9QGesFI67OonAMMGgFAs8BEkoKHDhxAfBmjgAWFAB+wiapRYgIMGi1EydDiQcWNEdheaZdnAwUBJkw0FUVCZpUKHZDAlJviApk8q0gQvTQawA7IKGwwMYU781MjRg6AQAxjw2FSIBQweAm0MUCBMUWcZoMakWKEqkYVbGVgyK6SCta07v2rR4GHX1gFY5cbj8IGBWIdcMXzAoNcJmA8agOYUJmDCBw6ErVzl4GEDBMaL6SW4kMdcYSJX9Vx4QCBpZnoBFFTYgPhJaA4SgJo+LTEAgQYZPJhbotADBZd/aQMOMMDBhltF9yiYLVyp7Qof4IHOG6l58266p2dibj2zoAV/TvlmN6C8+fPo06tfbz61GzAUGrKfT5/+RD5BAAA7")' }}></span>新用户11277468</a><span
                      className={css.comment_control_submit}><span>提交评论</span></span><span
                        className={css.length_tip}>0/1000</span></div>
                </div>
                <p className={css.comment_input_warn}>请回复有价值的信息，无意义的评论将很快被删除，账号将被禁止发言。</p>
              </div>
              <div className={css.comment_part}>
                <div className={css.comment_part_title}>
                  <div className={css.kr_column_title}><span className={css.kr_column_title_icon}></span><span
                    className={`${css.kr_column_title_text} ${css.weight_bold}`}>最新评论</span></div>
                </div>
                <ul className={css.comment_list}>
                  {Content.map(items => {
                    return (<li className={css.comment_list_item} key={items.id}>
                      <div className={css.item_left}><span className={css.item_avatar}
                        style={{ backgroundImage: `url(${items.user.avatar_url})` }}></span>
                      </div>
                      <div className={css.item_right}>
                        <div className={css.item_user}>
                          <span className={css.item_user_name}>{items.user.name}💤</span>
                          <span className={css.item_user_time}> · {items.created_at}</span>
                          <div className={css.item_user_right}>
                            <span className={`${css.item_user_like} ${css.item_user_unlike}`}>{items.counters.like}</span>
                            <a className={css.item_user_reply}>回复</a>
                          </div>
                        </div>
                        <p className={css.item_text}>{items.content}</p>
                      </div>
                    </li>)
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default videoDetail
