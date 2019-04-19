import React, { useState, useEffect } from 'react'
import Link from 'umi/link';
import NavLink from 'umi/navlink';
import { connect } from 'dva' // connect react-redux
import $ from 'jquery'
import styles from './index.css';
import app from './css/app.css';
import { isLogin, loginOut } from '../utils/auth'


function BasicLayout(props) {
  //console.log(props.children)
  // 是否显示资讯的二级菜单
  const [open, setOpen] = useState(false)
  // redux，全局  记录资讯二级菜单的id
  const { id } = props
  // 存放资讯的二级菜单
  const [type, setType] = useState([])
  const _props = props
  const [userStyle, setUserStyle] = useState({})//用户登录
  const [loginStyle, setloginStyle] = useState({})//用户未登录

  useEffect(() => {
    // 获取资讯的二级目录
    function LoadType() {
      $.ajax({
        type: "post",
        url: "http://api.cat-shop.penkuoer.com/api/v2/proxy",
        data: {
          url: `https://36kr.com/pp/api/feed?type=web`,
        },
        success: function (response) {
          //  console.log(response)
          setType(response.data.items)
        },
        error: function (error) {
          console.log(error)
        }
      });
    }

    //咨询类型
    LoadType()
  }, [id])
  useEffect(() => {
    const load = async () => {
      if (isLogin()) {
        setloginStyle({
          display: 'none'
        })
        setUserStyle({
          display: 'block'
        })
      } else {
        setloginStyle({
          display: 'block'
        })
        setUserStyle({
          display: 'none'
        })
      }
    }
    load()
  }, [isLogin()])
  const signOut = () => {
    loginOut()
    _props.history.push('/')
  }

  $(function () {
    $('#phone').mouseover(function () {
      $('#phone_content').show()
    }).mouseout(function () {
      $('#phone_content').hide()
    })

    $('#code').mouseover(function () {
      $('#code_content').show()
    }).mouseout(function () {
      $('#code_content').hide()
    })

    $('#tabs').find('div').click(function () {
      var _index = $(this).index()
      $(this).css({ "background": '#edf1f4' }).siblings().css({ "background": '' })
      $('#tab_content').find('div').eq(_index).show().siblings().hide()
    })

    $("#backTop").click(function () {
      $('html,body').animate({ scrollTop: 0 }, 500)
    })

    $(window).scroll(function(){
      //console.log($('#kr_sider').innerHeight())
      //console.log($('#footer').outerHeight())
      if($('#footer').outerHeight()>=$('#kr_sider').innerHeight()){
        console.log('aaa')
      }
    })
  })

  return (
    <div className={app.kr_layout}>
      <div className={`${app.kr_layout_main} ${app.clearfloat}`}>
        <div className={app.main_left}>
          <div className={app.kr_follow_fixed}>
            <div className={app.kr_sider} id='kr_sider'>
              <a href="/" className={`${app.go_home} ${app.clearfloat}`}>
                <div className={app.logo}></div>
              </a>
              <div className={app.line}></div>
              <ul className={app.kr_channel_nav}>
                <li className={app.channel_item}>
                  <div className={app.sub_title}><NavLink className={`${app.name} ${app.weight_bold}`} onClick={() => setOpen(false)} exact to="/">首页</NavLink></div>
                </li>
                <li className={app.channel_item}>
                  <div className={app.sub_title}><NavLink className={`${app.name} ${app.weight_bold}`} onClick={() => setOpen(false)} to='/list'>快讯</NavLink></div>
                </li>
                <li className={app.channel_item}>
                  <div className={app.sub_title}>
                    <span className={`${styles.openIcon} ${open ? '' : styles.close}`}></span>
                    <NavLink className={`${app.name} ${app.weight_bold}`} onClick={() => setOpen(true)} to="/information">资讯</NavLink>
                  </div>
                  <ul className={`${app.sub_list} ${app.open}`} style={{ display: open ? 'block' : 'none' }}>
                    {type.map(t => <li className={styles.subItem} key={t.key} onClick={() => {
                      props.dispatch({
                        type: "Information/save",
                        payload: {
                          id: t.id
                        }
                      })
                    }}>
                      <a href='javascript:void(0)' className={id === t.id ? styles.hover : null}>{t.name}</a>
                      {t.mark !== 'none' ? <span className={styles.hot}></span> : ''}
                    </li>)}

                  </ul>
                </li>
                <li className={app.channel_item}>
                  <div className={app.sub_title}><NavLink className={`${app.name} ${app.weight_bold}`} onClick={() => setOpen(false)} to="/video">视频</NavLink></div>
                </li>
                <li className={app.channel_item}>
                  <div className={app.sub_title}><NavLink className={`${app.name} ${app.weight_bold}`} onClick={() => setOpen(false)} to="/topics">专题</NavLink></div>
                </li>
                <li className={app.channel_item}>
                  <div className={app.sub_title}><NavLink className={`${app.name} ${app.weight_bold}`} onClick={() => setOpen(false)} to="/activity" target="_target">活动</NavLink></div>
                </li>
              </ul>
              <div className={`${app.kr_search_entry} ${app.clearfloat}`}>
                <div className={app.search_button}>
                  <span className={app.search_icon}></span>
                  <span className={app.search_text}>搜索</span>
                </div>
              </div>
              <a href="/seek_report" className={app.seek_report} target="_blank" rel="noopener noreferrer nofollow">
                <span className={app.seek_report_icon}></span>
                <span className={app.seek_report_text}>寻求报道</span>
              </a>
              <div>
                <div className={app.i_want_contribution}>
                  <span className={app.i_want_contribution_icon}></span>
                  <span className={app.i_want_contribution_text}>我要投稿</span>
                </div>
              </div>
              <a className={app.seek_finance_entry} href="#" target="_blank" rel="noopener noreferrer nofollow">
                <span className={app.seek_finance_entry_icon}></span>
                <span className={app.seek_finance_entry_text}>寻求融资</span>
              </a>
            </div>
          </div>
        </div>
        <div className={app.main_right}>
          <div className={app.kr_header}>
            <div className={app.kr_header_main}>
              <div className={app.kr_header_content}>
                <div className={app.user_login} style={userStyle}>
                  <img src="https://static.36krcnd.com/v1/20181105/YfPuR3I-qGKsl3V5g1nfMA906f68a624074dbe88c3b3b768a3ff22" alt="" className={app.user_pic} />
                  <div className={app.pull_down}>
                    <a className={app.ellipsis_1} className={app.user_name} href="#" target="_blank"
                      rel="noopener noreferrer">新用户 {localStorage.getItem('userName')}</a>
                    <a className={app.ellipsis_1} title="账号设置" href="#"
                      target="_blank" rel="noopener noreferrer">账号设置</a>
                    <a className={app.ellipsis_1} title="我的收藏" href="#"
                      target="_blank" rel="noopener noreferrer">我的收藏</a>
                    <a className={app.ellipsis_1} title="退出登录" target="_blank" rel="noopener noreferrer" onClick={signOut}>退出登录</a>
                  </div>
                </div>
                <div className={app.kr_header_passport} style={loginStyle}>
                  <Link className={app.login} to='/login'><span>登录</span></Link>
                  <a className={app.line}>|</a>
                  <Link className={app.resgister} to='/regist'><span>注册</span></Link>
                </div>
                <ul className={app.business_line}>
                  <li><a className={styles.a} href="#" target="_blank" rel="noopener noreferrer">加入猎讯</a></li>
                  <li><a className={styles.a} href="#n" target="_blank" rel="noopener noreferrer">VClub投资机构</a></li>
                  <li className={app.kr_product}>
                    <span >猎讯</span>
                    <span className={app.product}>旗下产品</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={app.kr_layout_content}>
            {props.children}
          </div>
        </div>
      </div>

      <div className={app.kr_footer} id='footer'>
        <div className={app.footer_content}>
          <div className={app.footer_wrapper}>
            <div className={app.productServices_wrapper}>
              <div className={`${app.title} ${app.weight_bold}`}>猎讯产品服务矩阵</div>
              <div className={app.row}>
                <div className={app.first_row}>
                  <div><a href="https://36kr.com/subscribe?ktm_source=kaike_pclandingpage" target="_blank" rel="noopener noreferrer">加入猎讯</a></div>
                  <div><a href="/VClub" target="_blank" rel="noopener noreferrer">VClub</a></div>
                </div>
                <div className={app.second_row}>
                  <div><a href="https://research.36kr.com" target="_blank" rel="noopener noreferrer">猎讯研究院</a></div>
                  <div><a href="https://global.36kr.com" target="_blank" rel="noopener noreferrer">猎讯海外站</a></div>
                  <div><a href="https://innovation.36kr.com" target="_blank" rel="noopener noreferrer">猎讯创新咨询</a></div>
                </div>
                <div className={app.third_row}>
                  <div><a href="https://www.jingdata.com/" target="_blank" rel="noopener noreferrer nofollow">鲸准</a></div>
                  <div><a href="https://krspace.cn" target="_blank" rel="noopener noreferrer nofollow">猎讯空间</a></div>
                  <div><a href="https://lslb168.sxl.cn" target="_blank" rel="noopener noreferrer nofollow">零售老板内参</a></div>
                </div>
              </div>
            </div>
            <div className={app.about36kr_wrapper}>
              <div className={`${app.title} ${app.weight_bold}`}>关于猎讯</div>
              <div className={app.list_wrapper}>
                <li><a rel="noopener noreferrer nofollow">商务合作</a></li>
                <li><a href="/pages/about" target="_blank" rel="noopener noreferrer nofollow">关于我们</a></li>
                <li><a href="https://zhaopin.36kr.com" rel="noopener noreferrer nofollow" target="_blank">加入我们</a></li>
                <li><a href="/seek-report" rel="noopener noreferrer nofollow" target="_blank">寻求报道</a></li>
                <li><a>我要投稿</a></li>
              </div>
            </div>
            <div className={app.parters_wrapper}>
              <div className={`${app.title} ${app.weight_bold}`}>合作伙伴</div>
              <ul className={app.footer_partner}>
                <li><a href="#" target="_blank" rel="noopener noreferrer nofollow"><img src="https://sta.36krcnd.com/36krx2018-front/static/aly.e9118f2f.png" alt="" /></a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer nofollow"><img src="https://sta.36krcnd.com/36krx2018-front/static/upy.8fdd68cd.png" alt="" /></a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer nofollow"><img src="https://sta.36krcnd.com/36krx2018-front/static/qny.0e3c2078.png" alt="" /></a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer nofollow"><img src="https://sta.36krcnd.com/36krx2018-front/static/tingyun.3ae2a375.png" alt="" /></a></li>
                <li><a><img src="https://sta.36krcnd.com/36krx2018-front/static/gaodi.9e9d6741.png" alt="" /></a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer nofollow"><img src="https://sta.36krcnd.com/36krx2018-front/static/huanxin.02287145.png" alt="" /></a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer nofollow"><img src="https://sta.36krcnd.com/36krx2018-front/static/teambition.f755714f.png" alt="" /></a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer nofollow"><img src="https://sta.36krcnd.com/36krx2018-front/static/getui.d2af25d2.png" alt="" /></a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer nofollow"><img src="https://sta.36krcnd.com/36krx2018-front/static/dailyPlanet.783b0e10.png" alt="" /></a></li>
              </ul>
            </div>
            <div className={app.appDownload_wrapper}>
              <div className={`${app.title} ${app.weight_bold}`}>猎讯APP下载</div>
              <img src="https://sta.36krcnd.com/36krx2018-front/static/downCode.d2d221ec.png" alt="" />
              <div className={app.info}>iOS &amp; Android</div>
            </div>
          </div>
        </div>
      </div>

      <div className={app.assit_wrapper}>
        <a href="http://feedback-36kr.mikecrm.com/FAN8f76" rel="noopener noreferrer nofollow" target="_blank" className={app.feedBack}>
          <div className={app.feedBack_img}></div>
          <div className={app.feedText}>意见反馈</div>
        </a>
        <div className={app.phone} id='phone'>
          <div className={app.phone_img}></div>
          <div className={app.phone_content} id='phone_content'>
            <img src="https://sta.36krcnd.com/36krx2018-front/static/code.01e4c342.png" alt="" />
            <div className={app.content}>
              <span>猎讯APP</span>
              <span>让一部分人先看到未来</span>
            </div>
          </div>
        </div>
        <div className={app.code} id='code'>
          <div className={app.code_img}></div>
          <div className={app.code_content} id='code_content'>
            <div className={app.tabs} id='tabs'>
              <div style={{ background: '#edf1f4' }}>猎讯</div>
              <div>鲸准</div>
              <div>猎讯空间</div>
            </div>
            <div className={app.tab_content} id='tab_content'>
              <div style={{ display: 'bolck' }}>
                <img src="https://sta.36krcnd.com/36krx2018-front/static/kr.ad0c1158.jpg" alt="" />
                <p>为你推送和解读最前沿、最有料的科技创投资讯</p>
              </div>
              <div style={{ display: 'none' }}>
                <img src="https://sta.36krcnd.com/36krx2018-front/static/jingzhun.9a251862.jpg" alt="" />
                <p>一级市场金融信息和系统服务提供商</p>
              </div>
              <div style={{ display: 'none' }}>
                <img src="https://sta.36krcnd.com/36krx2018-front/static/krSpace.7efbe7d3.jpg" alt="" />
                <p>聚集全球最优秀的创业者，项目融资率接近97%，领跑行业</p>
              </div>
            </div>
          </div>
        </div>
        <div className={app.top} id='backTop'>
          <div className={app.top_img}></div>
        </div>
      </div>


    </div>
  );
}

export default connect(state => state.Information)(BasicLayout);
