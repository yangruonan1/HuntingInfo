import React,{useState,useEffect} from 'react';
import $ from 'jquery';
import Link from 'umi/link';
import {Button,notification} from 'antd'
import css from './css/videoList.css'
function videoList(props) {
  console.log(props.location.search.substr(1,7))
  const [User,setUser] = useState([])
  const [Article,setArticle] = useState([])
  const [Num,setNum]=useState(0)
    // 加载状态
  const [isLoading,setIsLoading]=useState(false)
    // 初始数量
  const [currentNum,setCurrentNum]=useState(10)
  useEffect(() => {
    // 显示加载
    function LoadList(){
      $.ajax({
        type: "post",
        url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: ` https://36kr.com/pp/api/user/${props.location.query.user_id}`,
        },
        success: function (res) {
          setUser(res.data)
          const num=res.data.counters.post_create
          setNum(num)
          // 加载完成
        },
        error: function (error) {
          console.log(error)
        }
      })
    }
    function AuthorPage(){
      setIsLoading(true)
      $.ajax({
        type: "post",
        url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: `https://36kr.com/pp/api/search-column/authorpage?user_id=${props.location.query.user_id}&per_page=${currentNum}`,
        },
        success: function (res) {
          setArticle(res.data.items)
          setIsLoading(false)
        },
        error: function (error) {
          console.log(error)
        }
      })
    }
    AuthorPage()
    LoadList()
  },[currentNum])
  const MoreNum = ()=>{
    if(currentNum<200){
      setCurrentNum(currentNum + 10)
    }else{
      notification.info({message:'没有更多数据了'})
    }
  }
  console.log(Article)
  return (
    <div>
      <div className={css.kr_layout_content}>
  <div className={`${css.kr_author_detail} ${css.clearfloat}`}>
    <div className={css.kr_author_detail_left}>
      <div className={css.author_detail_flow}>
        <div className={css.kr_loading_more}>
          <div className={css.author_detail_flow_list}>
          {Article.map(item=>{
            return(
              <div className={css.flow_item} key={item.id}>
              <div className={css.author_detail_item}>
                <div className={css.kr_shadow_wrapper}>
                  <div className={css.kr_shadow_wrapper_card} style={{width:'720px',height:'163px',top:'-10px',left:'-10px'}}></div>
                  <div className={css.kr_shadow_content}><Link className={css.author_detail_item_pic} to={`/videoDetail?id=${item.id}&user_id=${item.user_id}`} target="_blank"
                      rel="noopener noreferrer"><img className={css.scaleBig}
                        src={item.cover} alt={item.title}/><span
                        className={css.author_detail_icon}></span></Link>
                    <div className={css.author_detail_item_info}><Link className={`${css.author_detail_item_title} ${css.ellipsis_2} ${css.weight_bold}`}
                        to={`/videoDetail?id=${item.id}&user_id=${item.user_id}`} target="_blank" rel="noopener noreferrer">{item.title}</Link>
                      <div className={`${css.author_detail_item_description} ${css.ellipsis_2}`}>{item.summary}</div>
                      <div className={css.kr_flow_bar}><span className={css.kr_flow_bar_time}><i
                            className={css.kr_flow_bar_time_icon}></i>{item.published_at}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          })}
          </div>
          <div className={css.kr_white_space} style={{height:'30px',width:'100%',visibility:'hidden'}}></div>
          <Button loading={isLoading}  onClick={ () => {MoreNum()} } className={`${css.kr_loading_more_button} ${css.show}`}>查看更多</Button>
          <div className={css.kr_white_space} style={{height:'40px',width:'100%',visibility:'hidden'}}></div>
        </div>
      </div>
    </div>
    <div className={css.kr_author_detail_right}>
      <div className={css.kr_follow} style={{top: '30px'}}>
        <div className={css.kr_author_detail_follow_container}>
          <div className={css.kr_card}>
            <div className={css.top_line} style={{height: '4px'}}></div>
            <div className={css.kr_card_content }>
              <div className={css.author_detail_info}>
                <div className={`${css.author_detail_info_header} ${css.clearfloat}`}>
                  <a target="_blank" rel="noopener noreferrer">
                    <img className={css.author_avatar}
                      src={User.avatar_url}
                      alt={User.introduction}/></a>
                  <div className={css.info_header_text}><a className={`${css.author_name} ${css.ellipsis_1}`} target="_blank"
                      rel="noopener noreferrer">{User.name}</a><span className={css.author_role}>{User.title}</span></div>
                </div>
                <p className={css.author_description}>{User.introduction}</p>
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
</div>
    </div>
  )
}

export default videoList
