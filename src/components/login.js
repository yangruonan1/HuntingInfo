import React,{ useState } from 'react'
import css from '../pages/css/login.css'
import { Login } from '../services/products'
import { loginIn } from '../utils/auth'

function login(props) {
  // console.log(props)
  const [login, setLogin] = useState({
    name:'',
    pwd:'',
    Isname:false,
    Ispwd:false
  })

  const InputNameChange =(e) => {
    e = e || window.event
    setLogin({
      ...login,
      name:e.target.value,
    })
    // console.log(e.target)
  }
  const InputPwdChange =(e) => {
    e = e || window.event
    setLogin({
      ...login,
      pwd:e.target.value
    })
     // console.log(e.target)
  }

 function LoginClick(){
  // console.log(login)
  if((! login.name) && login.name === ''  ){
    setLogin({
      ...login,
      Isname:true
    })
    return
  }
  if((! login.pwd) && login.pwd === ''  ){
    setLogin({
      ...login,
      Ispwd:true
    })
    return
  }
  Login({
    userName:login.name,
    password:login.pwd
    })
    .then(res =>{
      console.log(res)
     // 保存token
     if(res.data.code === 'success'){
      loginIn(res.data.token)
      props.changeState()
     }else{
       console.log(res.data.message)
     }

    })
    .catch(err=>console.log(err))
    console.log(login)
   }

  return (
    <div className={css.krPortal}>
      <div className={`${css.krPassportMask} ${css.opacity1}`} style={{ transition: 'opacity 700ms ease 0s' }}>
        <div className={css.krPassport}>
          <div className={css.krPassportLogin}>
            <header>
              <img className={css.logo} src="//sta.36krcnd.com/36krx2018-front/static/logo.57193dc5.png" alt="" />
              <div className={css.close} onClick={()=>props.changeState()}>X</div>
            </header>
            <section>
              <div className={css.krPassportAccount}>
                <div className={css.inputArea}>
                  <input type="text" className={css.account} placeholder="请输入手机号/邮箱" autoComplete="off"  onChange={()=>InputNameChange()} value={login.name}/>
                </div>
                 {login.Isname ? <div className={css.errorArea}>请输入正确格式的账号</div> : ''}
              </div>
              <div className={css.krPassportPassword}>
                <div className={`${css.inputArea} ${css.clearfloat}` }>
                  <input type="password" className={css.password} placeholder="密码（6-16位）" autoComplete="off" maxLength="16" onChange={()=>InputPwdChange()} value={login.pwd} />
                  <span className={`${css.passwordSwitch} ${css.hidden}`}>
                  </span><span className={css.clear}>
                  </span>
                </div>
                {login.Ispwd ? <div className={css.errorArea}>请输入密码</div> : ''}
              </div>
              <div className={css.forget}>
                <a href="/usercenter/reset-password">忘记密码</a>
              </div>
              <button className={`${css.krPassportButton} ${css.active}`} onClick={()=>LoginClick()}>登 录</button>
              <div className={`${css.switch} ${css.clearfloat}`}>
                <div className={css.goSeaAccount}>境外手机登录</div>
                <div className={css.goRegister}>还没有账号？<span>去注册</span>
                </div>
              </div>
            </section>
            <footer className={css.clearfloat}>
              <div className={css.info}>社交账号登录</div>
              <div className={css.wechat}></div>
              <div className={css.weibo}></div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login
