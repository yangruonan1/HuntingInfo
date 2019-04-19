import React, { Component } from 'react'
import app from '../layouts/css/app.css';
import Link from 'umi/link'
import { registFn } from '../services/news'
import { loginIn } from '../utils/auth'
import { notification } from 'antd'


export default class regist extends Component {
  constructor(props) {
    super(props)
    this.state = { TxtValue: '', PwdValue: '', Pwd2Value: '' };
  }
  onTxtChange(e) {
    this.setState({ TxtValue: e.target.value });
  }
  onPwdChange(e) {
    this.setState({ PwdValue: e.target.value });
  }
  onPwd2Change(e) {
    this.setState({ Pwd2Value: e.target.value });
  }
  regHandle = () => {
    const { TxtValue, PwdValue, Pwd2Value } = this.state;
    if (PwdValue === Pwd2Value) {
      registFn({ userName: TxtValue, password: PwdValue })
        .then(res => {
          console.log(res)
          if (res.data.code == "success") {
            loginIn(TxtValue, res.data.token)
            console.log(this.props)
            this.props.history.push('/')
          } else {
            notification.info({
              message: '此用户已存在，请直接登录！'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }else {
      notification.info({
        message: '两次输入密码不一致！'
      })
    }


  }
  render() {
    return (
      <div className={app.kr_portal}>
        <div className={`${app.kr_passport_mask} ${app.opacity1}`}>
          <div className={app.kr_passport}>
            <div className={app.kr_passport_register}>
              <header>
                <img className={app.logo} src="https://sta.36krcnd.com/36krx2018-front/static/logo.57193dc5.png" alt="" />
                <Link to="/"><div className={app.close}></div></Link>
              </header>
              <section>
                <div className={app.kr_passport_phone}>
                  <div className={`${app.input_area} ${app.clearfloat}`}>
                    <div className={app.phone_itc}>
                      <span className={app.code}>+86</span>
                      <span className={`${app.arrow} ${app.arrow_up}`}></span>
                      <span className={app.line}></span>
                    </div>
                    <input type="text" className={app.number} placeholder="请输入账号(手机号)" value={this.state.TxtValue} onChange={this.onTxtChange.bind(this)} />
                  </div>
                </div>
                <div className={app.kr_passport_password}>
                  <div className={`${app.input_area} ${app.clearfloat}`}>
                    <input type="password" className={app.password} placeholder="设置密码" autocomplete="off" value={this.state.PwdValue} onChange={this.onPwdChange.bind(this)} />
                    <span className={`${app.password_switch} ${app.hidden}`}></span>
                    <span className={app.clear}></span>
                  </div>
                </div>
                <div className={app.kr_passport_password}>
                  <div className={`${app.input_area} ${app.clearfloat}`}>
                    <input type="password" className={app.password} placeholder="确认密码" autocomplete="off" value={this.state.Pwd2Value} onChange={this.onPwd2Change.bind(this)} />
                    <span className={`${app.password_switch} ${app.hidden}`}></span>
                    <span className={app.clear}></span>
                  </div>
                </div>
                <button className={`${app.kr_passport_button} ${app.active}`} onClick={this.regHandle}>注 册</button>
              </section>
              <footer>已有账号？<Link to='/login'>去登录</Link>
              </footer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

