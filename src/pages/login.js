import React, { Component } from 'react'
import app from '../layouts/css/app.css';
import Link from 'umi/link'
import { loginFn } from '../services/news'
import { loginIn } from '../utils/auth'
import { notification } from 'antd'


export default class login extends Component {
  constructor(props) {
    super(props)
    this.state = { TxtValue: '',PwdValue:'' };
  }
  onTxtChange(e) {
    this.setState({ TxtValue: e.target.value });
  }
  onPwdChange(e) {
    this.setState({ PwdValue: e.target.value });
  }
  loginHandle = () => {
    const { TxtValue,PwdValue } = this.state;
    loginFn({userName:TxtValue,password:PwdValue})
    .then(res=>{
      if(res.data.code=="success"){
        loginIn(TxtValue,res.data.token)
        console.log(this.props)
        this.props.history.push('/')
      }else{
        notification.info({
          message:'用户不存在或密码错误！'
        })
      }
    })
    .catch(err=>{
      console.log(err)
    })

  }

  render() {
    return (
      <div className={app.kr_portal}>
        <div className={`${app.kr_passport_mask} ${app.opacity1}`}>
          <div className={app.kr_passport}>
            <div className={app.kr_passport_login}>
              <header>
                <img className={app.logo} src="https://sta.36krcnd.com/36krx2018-front/static/logo.57193dc5.png" alt="" />
                <Link to="/"><div className={app.close}></div></Link>
              </header>
              <section>
                <div className={app.kr_passport_account}>
                  <div className={app.input_area}>
                    <input type="text" className={app.account} placeholder="请输入账号" autoComplete="off" value={this.state.TxtValue} onChange={this.onTxtChange.bind(this)} />
                  </div>
                </div>
                <div className={app.kr_passport_password}>
                  <div className={`${app.input_area} ${app.clearfloat}`}>
                    <input type="password" className={app.password} placeholder="请输入密码" autoComplete="off" value={this.state.PwdValue} onChange={this.onPwdChange.bind(this)} />
                    <span className={`${app.password_switch} ${app.hidden}`}></span>
                    <span className={app.clear}></span>
                  </div>
                </div>
                <div className={app.forget}>
                  <a href="/usercenter/reset_password">忘记密码</a>
                </div>
                <button className={`${app.kr_passport_button} ${app.active}`} onClick={this.loginHandle}>登 录</button>
                <div className={`${app.switch} ${app.clearfloat}`}>
                  <div className={app.go_sea_account}>境外手机登录</div>
                  <div className={app.go_register}>还没有账号？<Link to='/regist'>去注册</Link></div>
                </div>
              </section>
              <footer className={app.clearfloat}>
                <div className={app.info}>社交账号登录</div>
                <div className={app.wechat}></div>
                <div className={app.weibo}></div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

