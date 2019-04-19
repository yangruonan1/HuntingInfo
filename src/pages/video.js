import React,{useState,useEffect} from 'react'
import $ from 'jquery'
import Link from 'umi/link';
import {Button,notification} from 'antd'
import style from './css/video1.css'
function vedio() {
  const [VideoList,setVideoList] = useState([])
    // 加载状态
  const [isLoading,setIsLoading]=useState(false)
    // 初始数量
  const [currentNum,setCurrentNum]=useState(10)
  useEffect(() => {
    // 显示加载
    setIsLoading(true)
    function LoadList(){
      $.ajax({
        type: "post",
        url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: ` https://36kr.com/pp/api/video?per_page=${currentNum}`,
        },
        success: function (res) {
          setVideoList(res.data.items)
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
  // console.log(VideoList)
  const MoreNum = ()=>{
    if(currentNum<200){
      setCurrentNum(currentNum + 10)
    }else{
      notification.info({message:'没有更多数据了'})
    }
  }
  return (
    <div>
      <div className={style.kr_layout_content}>
        <div className={`${style.kr_video_catalog} ${style.clearfloat}`}>
          <div className={style.kr_video_catalog_left}>
            <div className={style.video_catalog_flow}>
              <div className={style.kr_column_title}><span className={style.kr_column_title_icon}></span><span
                  className={`${style.kr_column_title_text} ${style.weight_bold}`}>最新视频</span></div>
              <div className={style.kr_loading_more}>
                <div className={style.video_catalog_flow_list}>
                {VideoList.map((item,index)=>{
                  return (
                    <div className={style.flow_item} key={item.id}>
                    <div className={style.kr_shadow_wrapper}>
                      <div className={style.kr_shadow_wrapper_card} style={{width:'355px',height:'333px',top:'-10px',left:'-10px'}}></div>
                      <div className={style.kr_shadow_content}><Link to={`/videoDetail?id=${item.id}&user_id=${item.user_id}`} className={style.flow_item_pic}  target="_blank"
                          rel="noopener noreferrer"><img className={style.scaleBig}
                            src={item.cover} alt={item.title}/>
                            <span className={style.video_icon}></span><span className={style.video_time_length}>5:26</span></Link>
                        <div className={style.flow_item_detail}><Link className={`${style.flow_item_title} ${style.weight_bold} ${style.ellipsis_2}`} to={`/videoDetail?id=${item.id}&user_id=${item.user_id}`}
                            target="_blank" rel="noopener noreferrer">{item.title}</Link><Link
                            className={`${style.flow_item_description} ${style.ellipsis_2}`} to={`/videoDetail?id=${item.id}&user_id=${item.user_id}`} target="_blank"
                            rel="noopener noreferrer">{item.template_info.template_title}</Link>
                        </div>
                        <div className={style.kr_flow_bar}>
                          <Link className={style.kr_flow_bar_author} to={`/videoList?user_id=${item.user_id}`} target="_blank" rel="noopener noreferrer">{item.user.nickname}</Link>
                          <span className={style.kr_flow_bar_time} style={{float:'right'}}>
                            <i className={style.kr_flow_bar_time_icon}></i>
                            {item.updated_at}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                })}
                </div>
                <div className={style.kr_white_space} style={{height:'30px',width:'100%',visibility:'hidden'}}></div>
                <Button  className={`${style.kr_loading_more_button} ${style.show}`} loading={isLoading}  onClick={ () => {MoreNum()} }>查看更多</Button>
                <div className={`${style.kr_loading_more_tip} ${style.hide}`}>...正在加载</div>
                <div className={`${style.kr_loading_no_more_tip} ${style.hide}`}>没有更多了</div>
                <div className={style.kr_white_space} style={{height:'40px',width:'100%',visibility:'hidden'}}></div>
              </div>
            </div>
          </div>
          <div className={style.kr_video_catalog_right}>
            <div className={style.kr_follow} style={{top:'30px'}}>
              <div className={style.kr_video_catalog_follow_container}>
                <div className={style.kr_hot_author}>
                  <div className={style.kr_column_title}><span className={style.kr_column_title_icon}></span><span
                      className={`${style.kr_column_title_text} ${style.weight_bold}`}>推荐作者</span></div>
                  <div className={style.kr_hot_author_list}>
                    <div className={`${style.hot_author_item} ${style.clearfloat}`}><Link className={style.hot_author_pic} to={`/videoList?user_id=1587948694`} target="_blank"
                        rel="noopener noreferrer"><img className={`${style.author_avatar} ${style.scaleBig}`}
                          src="https://pic.36krcnd.com/avatar/201804/24035942/v9odmutcg1y5g12v.jpg!heading" alt="一刻talks"/></Link>
                      <div className={style.hot_author_info}><Link className={`${style.hot_author_name} ${style.weight_bold} ${style.ellipsis_1}`} to={`/videoList?user_id=1587948694`}
                          target="_blank" rel="noopener noreferrer">一刻talks</Link>
                        <div className={`${style.hot_author_description} ${style.ellipsis_3}`}></div>
                      </div>
                    </div>
                    <div className={`${style.hot_author_item} ${style.clearfloat}`}><Link className={style.hot_author_pic} to={`/videoList?user_id=13941786`} target="_blank"
                        rel="noopener noreferrer"><img className={`${style.author_avatar} ${style.scaleBig}`}
                          src="https://krplus-pic.b0.upaiyun.com/avatar/201902/12103602/wlinr9e03jokxgq3!heading"
                          alt="当下频道"/></Link>
                      <div className={style.hot_author_info}><Link className={`${style.hot_author_name} ${style.weight_bold} ${style.ellipsis_1}`} to={`/videoList?user_id=13941786`}
                          target="_blank" rel="noopener noreferrer">当下频道</Link>
                        <div className={`${style.hot_author_description} ${style.ellipsis_3}`}></div>
                      </div>
                    </div>
                    <div className={`${style.hot_author_item} ${style.clearfloat}`}><Link className={style.hot_author_pic} to={`/videoList?user_id=2059070587`} target="_blank"
                        rel="noopener noreferrer"><img className={`${style.author_avatar} ${style.scaleBig}`}
                          src="https://pic.36krcnd.com/avatar/201803/27102637/c5tgpo5007vlett1.png!heading" alt="短的发布会"/></Link>
                      <div className={style.hot_author_info}><Link className={`${style.hot_author_name} ${style.weight_bold} ${style.ellipsis_1}`} to={`/videoList?user_id=2059070587`}
                          target="_blank" rel="noopener noreferrer">短的发布会</Link>
                        <div className={`${style.hot_author_description} ${style.ellipsis_3}`}></div>
                      </div>
                    </div>
                    <div className={`${style.hot_author_item} ${style.clearfloat}`}><Link className={style.hot_author_pic} to={`/videoList?user_id=18923060`} target="_blank"
                        rel="noopener noreferrer"><img className={`${style.author_avatar} ${style.scaleBig}`}
                          src="https://krplus-pic.b0.upaiyun.com/avatar/201810/24081046/mehea1iv7h46m5h5!heading"
                          alt="回形针PaperClip"/></Link>
                      <div className={style.hot_author_info}><Link className={`${style.hot_author_name} ${style.weight_bold} ${style.ellipsis_1}`} to={`/videoList?user_id=18923060`}
                          target="_blank" rel="noopener noreferrer">回形针PaperClip</Link>
                        <div className={`${style.hot_author_description} ${style.ellipsis_3}`}>你的当代生活说明书。公众号 papercliptv。</div>
                      </div>
                    </div>
                    <div className={`${style.hot_author_item} ${style.clearfloat}`}><Link className={style.hot_author_pic} to={`/videoList?user_id=19700029`} target="_blank"
                        rel="noopener noreferrer"><img className={`${style.author_avatar} ${style.scaleBig}`}
                          src="https://krplus-pic.b0.upaiyun.com/avatar/201809/13065218/pgei6ffxhhxziz29!heading"
                          alt="毒眸"/></Link>
                      <div className={style.hot_author_info}><Link className={`${style.hot_author_name} ${style.weight_bold} ${style.ellipsis_1}`} to={`/videoList?user_id=19700029`}
                          target="_blank" rel="noopener noreferrer">毒眸</Link>
                        <div className={`${style.hot_author_description} ${style.ellipsis_3}`}>看透娱乐，死磕真相。</div>
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

export default vedio
