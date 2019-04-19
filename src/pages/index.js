import React, { useState, useEffect } from "react";
import app from '../layouts/css/app.css';
import NavLink from 'umi/navlink';
import { connect } from 'dva'
import { newsList,newsList2 } from '../services/news'
import home from '../layouts/css/home.css';
import homeDetail from '../layouts/css/home_detail.css';
import { Icon, Carousel } from 'antd';
import decoration_bg from '../assets/decoration_bg.png'



function Index(props) {

  const [news, setnews] = useState({ items: [] })
  const [newsRight, setnewsRight] = useState({ items: [] })
  useEffect(() => {
    const fetchNews = async () => {
      const result = await newsList()
      const rightResult = await newsList2()
      //console.log(rightResult)
      setnews(result.data.data)
      setnewsRight(rightResult.data.data)
    }
    fetchNews()
  }, [])

  const [newWeek, setWeek] = useState([])
  const [newYear, setYear] = useState([])
  const [newMonth, setMonth] = useState([])
  const [newDay, setDay] = useState([])
  useEffect(() => {
    const fetchDate = async () => {
      const dt = new Date()
      let week = dt.getDay()
      switch (week) {
        case 0: week = "日"; break;
        case 1: week = "一"; break;
        case 2: week = "二"; break;
        case 3: week = "三"; break;
        case 4: week = "四"; break;
        case 5: week = "五"; break;
        case 6: week = "六"; break;
      }
      setWeek(week)
      setYear(dt.getFullYear())
      let month = dt.getMonth() + 1
      month = month < 10 ? '0' + month : month
      setMonth(month)
      setDay(dt.getDate())
    }
    fetchDate()
  }, [])
  const formatDate = (oldDate) => {
    const dt = new Date()
    oldDate = new Date(oldDate);
    var ss = Math.abs(dt - oldDate) / 1000;
    //console.log(dt,oldDate)
    var day = Math.floor(ss / 3600 / 24);
    var hour = Math.floor(ss / 3600 % 24);
    var forDate=day>0?day + "天" + hour + "小时": hour + "小时"
    return forDate;
  }

  return (
    <div className={home.kr_home}>
      <div className={app.kr_ad_home_top}>
        <span className={app.kr_ad_logo}>商业策划</span>
        <div className={app.kr_ad_home_top_main}>
          <a href="#" target="_blank" rel="noopener noreferrer nofollow">
            <img className="" src="https://img.36krcdn.com/20190410/v2_1554863275854_img_jpg" alt="36氪" />
          </a>
        </div>
      </div>
      <div className={`${home.kr_home_banner} ${app.clearfloat}`}>
        <div className={home.kr_home_banner_left}>
          <div className={app.kr_carousel_container}>
            <div className={`${app.carousel_content} ${home.ant_carousel}`}>
              <div className={home.banner_left_item_article}>
                <Carousel autoplay>
                  <div><h3>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img style={{ width: '100%', height: '100%' }} src="https://pic.36krcnd.com/201904/11234801/xy92jw2or33b8f0c!heading" />
                    </a>
                  </h3></div>
                  <div><h3><img style={{ width: '100%', height: '100%' }} src="https://pic.36krcnd.com/201904/10025503/c41uzi5d3vzcyz0n!heading" alt="36氪独家 | 上市前的“捆绑游戏”：字节跳动开启大范围期权换购" /></h3></div>
                  <div><h3><img style={{ width: '100%', height: '100%' }} src="https://img.36krcdn.com/20190409/v2_1554815554856_img_jpg" /></h3></div>
                  <div><h3><img style={{ width: '100%', height: '100%' }} src="https://pic.36krcnd.com/201904/10001553/2oppqlqm4lqz1hmi!heading" /></h3></div>
                  <div><h3><img style={{ width: '100%', height: '100%' }} src="https://pic.36krcnd.com/201904/11232702/emrnauqblc3wd4k0!heading" /></h3></div>
                </Carousel>
                </div>
            </div>
          </div>
        </div>
        <div className={home.kr_home_banner_right}>
          <ul className={home.banner_right_list}>
            <li className={home.banner_right_item}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className={home.banner_right_item_article}>
                  <img className={home.banner_right_item_pic} src="https://pic.36krcnd.com/201904/09092406/6xi29ft229oue730!heading" alt="「云舒写」获高瓴资本领投近亿元B轮融资，完成大语文赛道全产品线布局" />
                  <div className={home.banner_right_item_info}>
                    <p className={`${app.ellipsis_2} ${app.weight_bold}`}>「云舒写」获高瓴资本领投近亿元B轮融资，完成大语文赛道全产品线布局</p>
                  </div>
                </div>
              </a>
            </li>
            <li className={home.banner_right_item}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className={home.banner_right_item_article}>
                  <img className={home.banner_right_item_pic} src="https://pic.36krcnd.com/201904/09074101/v9a2aiqhmj2lk23o!heading" alt="「KLOOK客路」完成 2.25 亿美元 D+ 轮融资，软银愿景基金领投" />
                  <div className={home.banner_right_item_info}>
                    <p className={`${home.ellipsis_2} ${app.weight_bold}`}>「KLOOK客路」完成 2.25 亿美元 D+ 轮融资，软银愿景基金领投</p>
                  </div>
                </div>
              </a>
            </li>
            <li className={home.banner_right_item}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className={home.banner_right_item_article}>
                  <img className={home.banner_right_item_pic} src="https://pic.36krcnd.com/201904/09021711/9veu3p7zbuaht0oz!heading" alt="「什马出行」获2000万美元A轮融资，打造新能源出行产业互联网平台" />
                  <div className={home.banner_right_item_info}>
                    <p className={`${home.ellipsis_2} ${app.weight_bold}`}>「什马出行」获2000万美元A轮融资，打造新能源出行产业互联网平台</p>
                  </div>
                </div>
              </a>
            </li>
            <li className={home.banner_right_item}>
              <div className={app.kr_ad_home_banner_right}>
                <span className={app.kr_ad_logo}>商业策划</span>
                <a className={app.kr_ad_home_banner_right_main} href="#" target="_blank" rel="noopener noreferrer nofollow">
                  <img className={app.banner_right_pic} src="https://img.36krcdn.com/20190409/v2_1554799841965_img_jpg" alt="36氪" />
                  <div className={app.banner_right_info}>
                    <p className={`${app.ellipsis_3} ${app.weight_bold}`}>阿里云创新大会再出发，一些变化即将发生</p>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={`${home.kr_home_main} ${app.clearfloat}`}>
        <div className={home.kr_home_flow}>
          <div className={`${home.kr_home_flow_title} ${app.weight_bold}`}>最新文章</div>
          <div className={home.kr_home_flow_list}>

            {news.items.map(item => <div className={home.kr_home_flow_item} key={item.id}>
              <div className={homeDetail.kr_flow_article_item}>
                <div className={app.kr_shadow_wrapper}>
                  <div className={app.kr_shadow_wrapper_card}></div>
                  <div className={app.kr_shadow_content}>
                    <a className={homeDetail.article_item_pic} href="#" target="_blank" rel="noopener noreferrer">
                      <img className={home.scaleBig} src={item.post.cover} alt="36氪独家 | 上市前的“绑定游戏”：字节跳动开启大范围期权换购" />
                    </a>
                    <div className={`${homeDetail.article_item_info} ${app.clearfloat}`}>
                      <p className={`${homeDetail.feed_title_wrapper} ${home.ellipsis_2}`}>
                        <span className={homeDetail.feed_wrapper}>
                          <a href="#" className={homeDetail.article_item_channel}>{item.post.feeds[0].name}</a>
                          <span className={homeDetail.spacing}></span>
                        </span>
                        <a className={`${homeDetail.article_item_title} ${app.weight_bold}`} href="/p/5193011" target="_blank" rel="noopener noreferrer">{item.post.title}</a>
                      </p>
                      <a className={`${homeDetail.article_item_description} ${home.ellipsis_2}`} href="#" target="_blank" rel="noopener noreferrer">{item.post.summary}</a>
                      <div className={homeDetail.kr_flow_bar}>
                        <span className={homeDetail.kr_flow_bar_motif}>来自主题：
                            <a href="/motif/380" target="_blank" rel="noopener noreferrer">{item.post.motifs[0].name}</a>|
                          </span>
                        <a className={homeDetail.kr_flow_bar_author} href="/user/1104" target="_blank" rel="noopener noreferrer">{item.post.user.name}</a>
                        <span className={homeDetail.kr_flow_bar_time} style={{ float: 'right' }}>
                          <i className={homeDetail.kr_flow_bar_time_icon}></i>
                          {formatDate(item.post.published_at)}前
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>)}


            <div className={homeDetail.kr_white_space}></div>
            <NavLink className={home.kr_home_flow_see_more} to="/list">查看更多资讯</NavLink>
            <div className={homeDetail.kr_white_space}></div>
          </div>
        </div>

        <div className={home.kr_home_column}>



          <div className={`${home.daily_word_wrapper} ${home.no_hover_shadow} ${home.home_page_daily}`} style={{ backgroundImage: 'linear-gradient(-45deg, #ff7e7e 0%, #ff536b 100%)' }}>
            <section className={`${home.top_part} ${app.section}`}>
              <div className={home.calendar_date}>
                <span className={home.capital_date}>{newDay}</span>
                <div className={home.italic_icon}></div>
                <span className={home.week_year_month}><div>周{newWeek}</div>
                  <div>{newYear}年{newMonth}月</div>
                </span>
              </div>
              <a href="/Calendar" className={home.history_label} target="_blank" rel="noopener noreferrer">历史日签</a>
            </section>
            <section className={home.bottom_part}>
              <div className={home.daily_word_title}>
                <div className={home.ellipsis_2}><span>微信支付B端出海<i></i></span></div>
              </div>
            </section>
            <a href="/p/5189601" className={home.card_decoration} target="_blank" rel="noopener noreferrer">
              <img src={decoration_bg} alt="decoration" />
            </a>
          </div>

          {/* 最新快讯 */}
          <div className={home.kr_home_column_newsflash}>
            <div className={home.kr_column_title}>
              <span className={home.kr_column_title_icon}></span>
              <span className={`${home.kr_column_title_text} ${app.weight_bold}`}>最新快讯</span>
            </div>
            <div className={home.column_newsflash_main}>
              <div className={home.column_newsflash_vertiacl_line}></div>
              <div className={home.column_newsflash_item}>
                <div className={home.column_newsflash_item_head}>
                  <span className={home.column_newsflash_item_icon}></span>
                  <div className={`${home.column_newsflash_item_title} ${home.ellipsis_2} ${app.weight_bold}`}>“Justin&amp;Julie Fitness”完成数百万美元Pre_A轮融资</div>
                  <div className={home.column_newsflash_item_time}>2分钟前</div>
                </div>
                <div className={home.column_newsflash_item_detail}>
                  <p>36氪讯，精品团操健身工作室“Justin&amp;Julie Fitness”近日完成数百万美元Pre_A轮融资，
                    投资方为SIG海纳亚洲投资基金。Justin&amp;Julie Fitness方面表示，其月营业额已近百万，
                    服务过超过万名用户，月留存超过60%，平均一个用户单月到店6次，门店已实现盈利；今年计划开
                    店30_50家，已计划启动新一轮融资。</p>
                  <div className={home.kr_default_img_no_logo}></div>
                </div>
              </div>
              <div className={home.column_newsflash_item}>
                <div className={home.column_newsflash_item_head}>
                  <span className={home.column_newsflash_item_icon}></span>
                  <div className={`${home.column_newsflash_item_title} ${home.ellipsis_2} ${app.weight_bold}`}>服务公益的互联网平台“米多乐”获近千万元天使轮融资</div>
                  <div className={home.column_newsflash_item_time}>4分钟前</div>
                </div>
                <div className={home.column_newsflash_item_detail}>
                  <p>36氪讯，服务公益行业的互联网平台“米多乐”宣布获得近千万元天使轮融资，领投方为熊猫资本。
                    目前米多乐有130万用户，DAU在10万左右，活跃用户7天留存率保持在80%以上，30天留存率大于
                    50%。目前，该公司已经启动新一轮融资。</p>
                  <div className={home.kr_default_img_no_logo}></div>
                </div>
              </div>
              <div className={home.column_newsflash_item}>
                <div className={home.column_newsflash_item_head}>
                  <span className={home.column_newsflash_item_icon}></span>
                  <div className={`${home.column_newsflash_item_title} ${home.ellipsis_2} ${app.weight_bold}`}>亚马逊和微软争夺五角大楼百亿美元云合同</div>
                  <div className={home.column_newsflash_item_time}>6分钟前</div>
                </div>
                <div className={home.column_newsflash_item_detail}>
                  <p>据美国媒体报道，五角大楼表示，亚马逊和微软进入最后决赛，争夺美国国防部总额100亿美元的
                    云服务合同。此声明将甲骨文和IBM从竞标中剔除。美国防部女发言人艾丽萨·史密斯表示，只有亚
                    马逊和微软符合美国防部JEDI（Joint Enterprise Defense Infrastructure，联合企业国防
          基础设施云）云项目的“最低要求”。（网易科技）</p>
                  <div className={home.kr_default_img_no_logo}></div>
                </div>
              </div>
              <div className={home.column_newsflash_item}>
                <div className={home.column_newsflash_item_head}>
                  <span className={home.column_newsflash_item_icon}></span>
                  <div className={`${home.column_newsflash_item_title} ${home.ellipsis_2} ${app.weight_bold}`}>上交所：拟于4月22日起再组织一轮科创板业务专项测试</div>
                  <div className={home.column_newsflash_item_time}>8分钟前</div>
                </div>
                <div className={home.column_newsflash_item_detail}>
                  < p > 36氪讯，上交所发布通知：拟于4月22日起再组织一轮科创板业务专项测试（全回归），含最新发
                布的技术接口、业务规则以及主板的各项业务测试。</p >
                  <div className={home.kr_default_img_no_logo}></div>
                </div >
              </div >
              <div className={home.column_newsflash_item}>
                < div className={
                  home.column_newsflash_item_head}>
                  <span className={home.column_newsflash_item_icon}></span>
                  <div className={`${home.column_newsflash_item_title} ${home.ellipsis_2} ${app.weight_bold}`}>腾讯控股一度涨至400港元，创2018年6月来新高</div>
                  <div className={home.column_newsflash_item_time}>15分钟前</div>
                </div>
                <div className={home.column_newsflash_item_detail}>
                  < p > 36氪讯，腾讯控股一度涨至400港元，创2018年6月来新高。截至发稿，腾讯报399.2港元，
                        涨2.67 %。昨日，腾讯《和平精英》游戏获得版号。</p >
                  <div className={home.kr_default_img_no_logo}></div>
                </div >
              </div >
              <a className={home.column_newsflash_see_more} href="#" target="_blank" rel="noopener noreferrer">查看更多</a>
            </div >
          </div >
          <div className={homeDetail.kr_white_space}></div>
          {/* 主题精选 */}
          <div>
            <div className={home.kr_businessMotifHome}>
              <div className={home.kr_column_title}>
                <span className={home.kr_column_title_icon}></span>
                <span className={`${home.kr_column_title_text} ${app.weight_bold}`}>主题精选</span>
              </div>
              <div className={home.businessMotifHome_main}>
                <div className={home.businessMotifHome_main_item}>
                  <div className={home.businessMotifHome_main_item_top}>
                    <img className={`${home.buess_mitif_logo} ${home.business_motif_top_item_float}`} src="https://pic.36krcnd.com/201903/24065918/k6ur9o3xmireczjq" alt="logo" />
                    <div className={`${home.buess_mitif_name} ${home.business_motif_top_item_float}`}>了不起的创变者</div>
                    <a className={`${home.businessMotifHome_main_item_top_a} ${home.business_motif_top_item_float_right}`} href="/motif/524" target="_blank" rel="noopener noreferrer">查看更多</a>
                  </div>
                  <div className={homeDetail.kr_white_space}></div>
                  <div className={home.businessMotifHome_main_item_cover}>
                    <a className={home.businessMotifHome_main_item_cover_pic} href="/p/5193025" target="_blank" rel="noopener noreferrer">
                      <img className={`${home.buess_mitif_cover} ${app.scaleBig}`} src="https://pic.36krcnd.com/201904/09131650/jjri89ivv3dhp1gk!heading" alt="一个“不务正业”经济学家和他的“怪胎”" />
                    </a>
                  </div>
                  <div className={homeDetail.kr_white_space}>
                  </div>
                  <a className={home.businessMotifHome_main_item_title} href="/p/5193025" target="_blank" rel="noopener noreferrer">
                    <p className={`${home.ellipsis_2} ${app.weight_bold}`}>一个“不务正业”经济学家和他的“怪胎”</p>
                  </a>
                </div>
                <div className={home.businessMotifHome_main_item}>
                  <div className={home.businessMotifHome_main_item_top}>
                    <img className={`${home.buess_mitif_logo} ${home.business_motif_top_item_float}`} src="https://pic.36krcnd.com/201903/22062957/5i8hcggq0y5y3dki" alt="logo" />
                    <div className={`${home.buess_mitif_name} ${home.business_motif_top_item_float}`}>观察+</div>
                    <a className={`${home.businessMotifHome_main_item_top_a} ${home.business_motif_top_item_float_right}`} href="/motif/526" target="_blank" rel="noopener noreferrer">查看更多</a>
                  </div>
                  <div className={homeDetail.kr_white_space} ></div>
                  <div className={home.businessMotifHome_main_item_cover}>
                    <a className={home.businessMotifHome_main_item_cover_pic} href="/p/5193322" target="_blank" rel="noopener noreferrer">
                      <img className={`${home.buess_mitif_cover} ${app.scaleBig}`} src="https://pic.36krcnd.com/201904/10055147/9swn578ovvm7h8hg!heading" alt="线上“买菜”成资本新宠，线下市场何去何从？" />
                    </a>
                  </div>
                  <div className={homeDetail.kr_white_space}></div>
                  <a className={home.businessMotifHome_main_item_title} href="/p/5193322" target="_blank" rel="noopener noreferrer">
                    <p className={`${home.ellipsis_2} ${app.weight_bold}`}>线上“买菜”成资本新宠，线下市场何去何从？</p>
                  </a>
                </div>
              </div>
            </div>
            <div className={homeDetail.kr_white_space}></div>
          </div>
          {/*  24小时热榜 */}
          <div className={homeDetail.kr_hotlist}>
            <div className={homeDetail.kr_column_title}>
              <span className={homeDetail.kr_column_title_icon}></span>
              <span className={`${homeDetail.kr_column_title_text} ${app.weight_bold}`}>24小时热榜</span>
            </div>
            <div className={home.hotlist_main}>
              <div className={home.hotlist_item_toptwo}>
                <a className={home.hotlist_item_toptwo_pic} href="/p/5193011" target="_blank" rel="noopener noreferrer">
                  <img className={app.scaleBig} src="https://pic.36krcnd.com/201904/10022827/o35x931ceeawyet8!heading" alt="36氪独家 | 上市前的“现金流攻防战”：字节跳动开启大范围期权换购" />
                </a>
                <span className={home.hotlist_item_toptwo_icon} style={{backgroundPosition:'0 -153px'}}></span>
                <a className={home.hotlist_item_toptwo_title} href="/p/5193011" target="_blank" rel="noopener noreferrer">
                  <p className={`${home.ellipsis_2} ${app.weight_bold}`}>36氪独家 | 上市前的“现金流攻防战”：字节跳动开启大范围期权换购</p>
                </a>
              </div>
              <div className={home.hotlist_item_toptwo}>
                <a className={home.hotlist_item_toptwo_pic} href="/p/5193146" target="_blank" rel="noopener noreferrer">
                  <img className={app.scaleBig} src="https://pic.36krcnd.com/201904/09231224/0to97havckt1ci6g!heading" alt="8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%" />
                </a>
                <span className={home.hotlist_item_toptwo_icon}  style={{backgroundPosition:'0 -191px'}}></span>
                <a className={home.hotlist_item_toptwo_title} href="/p/5193146" target="_blank" rel="noopener noreferrer">
                  <p className={`${home.ellipsis_2} ${app.weight_bold}`}>8点1氪 | 消息称京东正酝酿大裁员；雷军百亿薪酬全为股权没有现金​；3月全国乘用车零售量同比下降12.1%</p>
                </a>
              </div>

              {newsRight.items.map(item=><div key={item.id} className={`${home.hotlist_item_other} ${app.clearfloat}`}>
                <div className={home.hotlist_item_other_pic}>
                  <a href="/p/5193164" target="_blank" rel="noopener noreferrer">
                    <img className={app.scaleBig} src={item.images[0]} alt="最前线 | 京东计划裁员8%，涉及约12000个岗位" />
                  </a>
                  <span className={home.hotlist_item_other_icon} ></span>
                </div>
                <div className={home.hotlist_item_other_info}>
                  <a className={`${home.hotlist_item_other_title} ${home.ellipsis_2} ${app.weight_bold}`} href="/p/5193164">{item.summary}</a>
                  <span className={home.hotlist_item_other_time}>{formatDate(item.created_at)}</span>
                </div>
              </div>)}


            </div>
          </div>

          <div className={homeDetail.kr_white_space}></div>
          <div className={homeDetail.kr_white_space}></div>


        </div >
      </div >
    </div >
  );
}

export default Index
