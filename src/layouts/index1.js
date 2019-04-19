import styles from './index.css';
import Link from 'umi/link';
import NavLink from 'umi/navlink';
import Login from '../components/login'  // 登录组件
import { connect } from 'dva' // connect react-redux
import React, { useState, useEffect } from 'react'
import $ from 'jquery'
 import { isToken,loginOut } from '../utils/auth'

function BasicLayout(props) {

  // redux，全局  记录资讯二级菜单的id
  const { id } = props

  // 存放资讯的二级菜单
  const [type, setType] = useState([])
  // 登录页面是否显示出来
  const [isLogin, setIsLogin] = useState(false);
  // 是否显示资讯的二级菜单
  const [open, setOpen] = useState(false)
  // 记录token值的变化
  const[token,setToken] = useState(isToken())

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

  // 退出登录
  function ExitLoginHandle(){
    loginOut()
    setToken(isToken())
  }

  // 关闭登录页面
  function CloseLogin() {
    setIsLogin(false)
    setToken(isToken())
  }
  return (
    <div className={`${styles.app} ${styles.clearfloat}`}>
      {isLogin ? <Login changeState={CloseLogin.bind(this)}></Login> : ''}
      <div className={styles.mainLeft}>
        <div className={styles.KrSider}>
          <NavLink exact to='/' className={styles.home}>
            <div className={styles.logo}></div>
          </NavLink>
          <div className={styles.line}></div>
          <ul className={styles.krChannelNav}>
            <li className={styles.channelItem}>
              <div className={styles.subTitle}>
                <NavLink className={`${styles.name} ${styles.weightBold} `} exact to='/' >首页</NavLink>
              </div>
            </li>
            <li className={styles.channelItem}>
              <div className={styles.subTitle}>
                <NavLink className={`${styles.name} ${styles.weightBold}`} to='/list' onClick={() => setOpen(false)}>快讯</NavLink>
              </div>
            </li>
            <li className={styles.channelItem}>
              <div className={styles.subTitle}>
                <span className={`${styles.openIcon} ${open ? '' : styles.close}`}></span>
                <NavLink className={`${styles.name} ${styles.weightBold}`} to='/information' onClick={() => setOpen(true)}>资讯</NavLink>
              </div>
              <ul className={`${styles.subList} ${styles.open}`} style={{ display: open ? 'block' : 'none' }}>
                {type.map(t => <li className={styles.subItem} key={t.key} onClick={() => {
                  props.dispatch({
                    type: "Information/save",
                    payload: {
                      id: t.id
                    }
                  })
                }}>
                  <a href='javascript:void(0)' className={id === t.id ? styles.hover : null}>{t.name}</a>
                  {t.mark !=='none' ? <span className={styles.hot}></span> : ''}
                  </li>)}
              </ul>
            </li>
            <li className={styles.channelItem}>
              <div className={styles.subTitle}>
                <NavLink className={`${styles.name} ${styles.weightBold}`} to='/shipin' onClick={() => setOpen(false)}>视频</NavLink>
              </div>
            </li>
            <li className={styles.channelItem}>
              <div className={styles.subTitle}>
                <NavLink className={`${styles.name} ${styles.weightBold}`} to='/topics' onClick={() => setOpen(false)}>专题</NavLink>
              </div>
            </li>
            <li className={styles.channelItem}>
              <div className={styles.subTitle}>
                <NavLink className={`${styles.name} ${styles.weightBold}`} to='/active' rel='noopener noreferrer' onClick={() => setOpen(false)}>活动</NavLink>
              </div>
            </li>

          </ul>
        </div>
      </div>
      <div className={styles.mainRight}>
        <div className={styles.krHeader}>
          <div className={styles.krHeaderMain}>
            <div className={styles.krHeaderHontent}>
              <div className={styles.userLogin} style={{ display:token ? '' : 'none' }}>
                <img src="https://static.36krcnd.com/v1/20181105/YfPuR3I-qGKsl3V5g1nfMA906f68a624074dbe88c3b3b768a3ff22" alt="" className={styles.userPic} />
                <div className={styles.pullDown}>
                  <Link className={`${styles.ellipsis - 1} ${styles.userName}`} title="" to="/" target="_blank" rel="noopener noreferrer">
                  </Link>
                  <Link className={styles.ellipsis - 1} title="账号设置" to="/" target="_blank" rel="noopener noreferrer">账号设置
                  </Link>
                  <Link className={styles.ellipsis - 1} title="我的收藏" to="/" target="_blank" rel="noopener noreferrer">我的收藏
                  </Link>
                  <a className={styles.ellipsis - 1} title="退出登录" target="_blank" rel="noopener noreferrer" onClick={()=>ExitLoginHandle()}>退出登录
                  </a>
                </div>
              </div>
              <div className={styles.krHeaderPassport} style={ { display: token ? 'none' : 'inline-block' }}>
                <a className={styles.login} onClick={() => setIsLogin(true)}><span>登录</span></a>
                <a className={styles.line}>|</a>
                <a className={styles.resgister}>
                  <span>注册</span>
                </a>
              </div>
              <ul className={styles.businessLine}>
                <li>
                  <Link to="https://36kr.com/subscribe?ktm_source=kaike_pclandingpage" target="_blank" rel="noopener noreferrer">开氪</Link>
                </li>
                <li>
                  <Link to="/organization" target="_blank" rel="noopener noreferrer">VClub投资机构</Link>
                </li>
                <li className={styles.krProduct}>
                  <span className={styles.kr}>36氪</span>
                  <span className={styles.product}>旗下产品</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );

}

export default connect(state => state.Information)(BasicLayout)
