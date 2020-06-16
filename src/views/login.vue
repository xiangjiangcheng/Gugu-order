<!--
 @Author: zhuangyu
 @Date: 2019年11月13日10:34:21
 @Desc: 登录页
-->
<template>
  <div class="login"
       :class="{'bgImg': !userId}"
       v-loading="windowsLoading"
       element-loading-text=" 系统数据加载中，请稍后！"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255, 255, 255, 0.9)">
    <div class="content" v-show="!userId">
      <p class="logo">
        <img src="../assets/img/title.png"/>
      </p>
      <div class="login_entry">
        <div class="login_box" :class="{show:qrCodeShow}">
          <div class="round">
            <div class="login-titlle">
              <span>登录</span>
            </div>
            <!--<el-dropdown size="small" @command="handleCommand">-->
                <!--<span class="el-dropdown-link userInfo">选择用户</span>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item-->
                        <!--v-for="(item,i) in userInfo"-->
                        <!--:command="item"-->
                        <!--:key="i"-->
                    <!--&gt;{{item.label}}</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
          </div>
          <div class="form">
            <el-form ref="form" :model="form" :rules="rules">
              <div class="login_row">
                <el-form-item prop="userName" :class="{nameshower:form.userName}">
                  <el-input
                    placeholder="请输入账号"
                    v-model="form.userName"
                    @keyup.native.enter="onSubmit"
                    @blur="form.userName = pubFn.changeValue($event)"
                  >
                    <!--<img-->
                    <!--slot="prefix"-->
                    <!--class="userName"-->
                    <!--src="../assets/img/login_entry.svg"-->
                    <!--/>-->
                    <span slot="prefix" class="userName" :class="{nameshower:form.userName}">
                                        <i class="iconfont icon-denglu"></i>
                                      </span>
                  </el-input>
                </el-form-item>
              </div>
              <div class="login_row">
                <el-form-item prop="passWord" :class="{nameshower:form.passWord}">
                  <el-input
                    v-model="form.passWord"
                    placeholder="请输入密码"
                    @keyup.native.enter="onSubmit"
                    show-password
                  >
                    <!--<img-->
                    <!--slot="prefix"-->
                    <!--class="passWord"-->
                    <!--src="../assets/img/login_keywords.svg"-->
                    <!--/>-->
                    <span slot="prefix" class="passWord" :class="{nameshower:form.passWord}">
                                        <i class="iconfont icon-mima"></i>
                                      </span>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="login_row clearfix">
                                <div class="code_input">
                                    <el-form-item prop="code" :class="{shower:form.code}">
                                        <el-input
                                            v-model="form.code"
                                            placeholder="请输入验证码"
                                            @keyup.native.enter="onSubmit"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                                <div class="code_view">
                                    <img
                                        :src="codeImg"
                                        style="cursor: pointer"
                                        class="code_img"
                                        @click="changeCode"
                                        alt
                                    />
                                </div>
                            </div>
                            <div class="notice">
                                <el-checkbox
                                    class="select"
                                    @change="remeber"
                                    v-model="checked"
                                >记住用户名和密码</el-checkbox>
                                <div style="float:right;">
                                    <span @click="notice" class="forget">忘记密码？</span>
                                </div>
                            </div>
                        </el-form>
                    </div>
                    <div class="login_btn">
                        <el-button type="primary" @click="onSubmit" :loading="loading">登录</el-button>
                    </div>
                    <div class="spread">
                        <span>
                            <img v-if="qrCodeShow" class="imgShow" @click="handleQR" src="../assets/img/login_spread.svg" />
                            <img v-else @click="handleQR" src="../assets/img/login_spread.svg" />
                        </span>
          </div>
        </div>
        <div class="bottom">
          <span class="bottom-span">技术支持：中电万维信息技术有限责任公司</span>
          <!-- <span class="bottom-span">版权归属：互联网+督查 督查督办办理系统</span> -->
        </div>
        <!--<div class="center"></div>-->
        <div class="qr-code" v-show="qrCodeShow">
          <div class="line">
            <img src="../assets/img/login-line.svg"/>
          </div>
          <div class="qr-content">
            <div id="qrcode"></div>
          </div>
          <div style="text-align: center; margin-top: 5%;">
            <span style="color: #2a75ec; ">——扫描二维码登录手机APP——</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'

import { getMenu, imgCode, getAes, login, getNewUserInfo, getNewMenu, getAppId } from '@/api/uacApi'

import CryptoJS from 'crypto-js'

export default {
  name: 'login',
  data () {
    return {
      windowsLoading: false,
      show: false,
      userInfo: [
        {
          label: '安徽省督察室用户-一级用户',
          userName: 'dcs_user',
          pwd: 'qwe!@#'
        },
        {
          label: '省直部门省发改委用户-二级用户',
          userName: 'dep_user_02',
          pwd: 'qwe!@#'
        },
        {
          label: '省直部门发展规划处用户-三级用户',
          userName: 'off_fzghc_user',
          pwd: 'qwe!@#'
        },
        {
          label: '省直部门发展规划处领导-三级用户领导',
          userName: 'off_fzghc_leader',
          pwd: 'qwe!@#'
        }
      ],
      loading: false, // 按钮发起请求状态
      codeImg: '', // 验证码图片
      verifyCodeKey: '', // 后台返回登陆使用字段
      form: {
        userName: '', // 账号lx_01
        passWord: '', // 密码p@ssw0rd
        code: '' // 验证码
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号！', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码！',
            trigger: 'blur'
          }
        ]
      },
      captchaKey: '',
      checked: false, // 保存账号/密码标志位
      qrCodeShow: false // 二维码登录界面展示
    }
  },
  computed:{
    userId(){
      return this.$route.query.userId ? true: false
    }
  },
  methods: {
    /*
       * 隐藏/显示二维码登录界面
       * */
    handleQR () {
      this.qrCodeShow = !this.qrCodeShow
      this.qrcode()
    },
    /*
       * 二维码生成函数
       * */
    qrcode () {
      let qrcode = new QRCode('qrcode', {
        text: 'http://61.178.98.94:21050/login#/',
        width: 450,
        height: 450,
        colorDark: '#000000',
        colorLight: '#ffffff'
      })

      if (this.qrCodeShow === false) {
        document.getElementById('qrcode').innerHTML = ''
      }
      let elText = document.getElementById('qrcode')

      if (!elText.value) {
        elText.focus()
        return
      }
      qrcode.makeCode(elText.value)
    },
    handleCommand (command) {
      this.form.userName = command.userName
      this.form.passWord = command.pwd
    },
    onSubmit () {
      // this.checkCookie()
      this.loading = true
      let _this = this

      this.$refs['form'].validate(valid => {
        if (valid) {
          getAes().then(res => {
            let publicKey = res.data

            let data = Object.assign(
              {},
              {
                username: _this.form.userName,
                password: _this.form.passWord,
                captchaCode: _this.form.code
              }
            )

            let pubKey =
                '-----BEGIN PUBLIC KEY-----' +
                publicKey +
                '-----END PUBLIC KEY-----'

            sessionStorage.setItem('pubKey', pubKey)
            let cipherText = CryptoJS.enc.Base64.stringify(
              CryptoJS.enc.Utf8.parse(data.password)
            )

            let newPassword = this.$jsEncrypt(pubKey, cipherText)

            data.captchaKey = this.captchaKey
            data.password = newPassword
            data.grant_type = 'password'
            login(data).then(resp => {
              if (resp.code == 200) {
                sessionStorage.setItem(
                  'access_token',
                  resp.data.token.access_token
                )
                getNewMenu({ appIds: [9527] }).then(resp2 => {
                  if (resp2.code === 200) {
                    const _menuTree = resp2.data.children
                    let _url = _menuTree[0].frontUrl

                    sessionStorage.setItem('homeUrl', _url)
                    _menuTree.splice(0, 1)
                    for (let i = 0; i < _menuTree.length; i++) {
                      if (_menuTree[i].title === '消息中心') {
                        _menuTree.splice(i, 1)
                      }
                    }
                    let userInfo = {
                      menuTree: _menuTree,
                      mobile: resp.data.mobile ? resp.data.mobile : '',
                      orgFullName: resp.data.userOrgName,
                      orgId: resp.data.orgId,
                      roleInfoVO: {
                        roleLevel: resp.data.roleLevel,
                        roleName: resp.data.roleName,
                        roleOrgId: resp.data.roleOrgId,
                        roleOrgName:
                          resp.data.roleOrgName
                      },
                      userName: resp.data.userName,
                      uuid: resp.data.uuid
                    }

                    sessionStorage.setItem(
                      'userInfo',
                      JSON.stringify(userInfo)
                    )
                    if(_url){
                      this.$message.success('登录成功！')
                      _this.$router.push({
                        path: _url
                      })
                    }else{
                      this.$message.warning('当前用户未配置工作台,请联系管理员！')
                      sessionStorage.clear()
                    }
                  } else {
                    _this.$message.warning(resp2.message)
                    this.getCode()
                    sessionStorage.clear()
                    return
                  }
                  _this.loading = false
                  this.getCode()
                })
              } else {
                _this.loading = false
                sessionStorage.clear()
                this.getCode()
                _this.$message.warning(resp.message)
              }
            })
          })
        } else {
          console.log('error submit!!')
          _this.loading = false
          return false
        }
      })
    },
    getCode () {
      sessionStorage.clear()
      this.$http
        .verifyCodeGet()
        .then(resp => {
          console.log(resp)
          if (resp.code === 0) {
            this.codeImg = ''
            this.codeImg = resp.data.verifyCode
            this.verifyCodeKey = resp.data.verifyCodeKey
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    guid () {
      return 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (
        c
      ) {
        let r = (Math.random() * 16) | 0

        let v = c == 'x' ? r : (r & 0x3) | 0x8

        return v.toString(16)
      })
    },
    getCode () {
      this.codeImg = ''
      let uuid = this.guid()

      imgCode({ captchaKey: uuid }).then(
        res => {
          this.codeImg = res.data.captchaBase64
          this.captchaKey = res.data.captchaKey
        }
      )
    },
    changeCode () {
      this.getCode()
    },
    /* 忘记密码点击事件 */
    notice () {
      this.$message.warning('请联系管理人员！')
    },
    /* 保存账号和密码 */
    savePassword () {
      // console.log('lll=' + this.checked)
      if (this.form.userName && this.form.passWord) {
        this.setCookie('passWords', this.form.passWord, 3)
        this.setCookie('check', 'true', 3)
        this.setCookie('userName', this.form.userName, 3)
        this.setCookie('paths', '/', 3)
      }
    },
    /* 读取cookie */
    getCookie (name) {
      let start = null

      let end = null

      // console.log(document.cookie.length)
      if (document.cookie.length > 0) {
        start = document.cookie.indexOf(name + '=')
        // console.log(start)
        if (start !== -1) {
          start = start + name.length + 1
          end = document.cookie.indexOf(';', start)
          // console.log(end)
          if (end !== -1) {
            // console.log('return' + unescape(document.cookie.substring(start, end)))
            return unescape(document.cookie.substring(start, end))
          }
        }
      }
    },
    /* 读取cookie的值给账号密码赋值 */
    checkCookie () {
      let userName = this.getCookie('userName')

      let passWord = this.getCookie('passWords')

      let save = this.getCookie('check')

      console.log('u=' + userName, 'p=' + passWord, 's=' + save)
      if (userName !== null && userName !== '') {
        this.form.userName = userName
      } else {
        this.form.userName = ''
      }
      if (passWord !== null && passWord !== '') {
        this.form.passWord = passWord
      } else {
        this.form.passWord = ''
      }
      if (save !== null && save !== '') {
        if (save === 'true') {
          console.log('great!!')
          this.checked = true
        }
      } else {
        this.checked = false
      }
    },
    /* 设置cookie */
    setCookie (name, value, dates) {
      let exdate = new Date()

      exdate.setDate(exdate.getDate() + dates)
      console.log(exdate)
      document.cookie = name + '=' + value
      document.cookie = 'expires =' + exdate
      document.cookie = 'path' + '=' + '/'
      // console.log(document.cookie)
    },
    /* 清除cookie */
    remeber () {
      // console.log('start')
      if (this.checked === false) {
        if (document.cookie.length > 0) {
          this.setCookie('userName', '', -1)
          this.setCookie('passWords', '', -1)
          this.setCookie('check', '', -1)
          this.setCookie('path', '', -1)
          this.setCookie('expires', '', -1)
          this.setCookie('paths', '', -1)
          // document.cookie = ''
          // this.setCookie('save', '', 0)
        }
      } else {
        this.savePassword()
      }
    },
    getNewUserInfo () {
      getNewMenu({ appIds: [9527] }).then(resp => {
        console.log(resp, '获取菜单-----------')
        if (resp.code === 200) {
          getNewUserInfo().then(resp2 => {
            console.log(resp2, '获取用户信息-------')
            if (resp2.code === 200) {
              const _menuTree = resp.data.children

              let _url = _menuTree[0].frontUrl

              sessionStorage.setItem('homeUrl', _url)
              _menuTree.splice(0, 1)
              for (let i = 0; i < _menuTree.length; i++) {
                if (_menuTree[i].title === '消息中心') {
                  _menuTree.splice(i, 1)
                }
              }
              let userInfo = {
                menuTree: _menuTree,
                mobile: resp2.data.mobile ? resp2.data.mobile : '',
                orgFullName: resp2.data.userOrgName,
                orgId: resp2.data.orgId,
                roleInfoVO: {
                  roleLevel: resp2.data.roleLevel,
                  roleName: resp2.data.roleName,
                  roleOrgId: resp2.data.roleOrgId,
                  roleOrgName:
                    resp2.data.roleOrgName
                },
                userName: resp2.data.userName,
                uuid: resp2.data.uuid
              }

              sessionStorage.setItem(
                'userInfo',
                JSON.stringify(userInfo)
              )
              this.$router.push({
                path: _url
              })
            } else {
              this.$message.warning(resp2.message)
              this.windowsLoading = false
              this.getCode()
            }
          }).catch(err => {
            console.log(err)
            this.$message.warning('系统开小差了，请重新登录！')
            this.windowsLoading = false
            this.getCode()
          })
        } else {
          this.$message.warning(resp.message)
          sessionStorage.clear()
          this.windowsLoading = false
          this.getCode()
        }
      }).catch(err => {
        console.log(err)
        sessionStorage.clear()
        this.$message.warning('系统开小差了，请重新登录！')
        this.windowsLoading = false
        this.getCode()
      })
    }
  },
  created () {
    console.log(this.$route)
    if (this.$route.query.userId) {
      this.windowsLoading = true
      sessionStorage.setItem(
        'access_token',
        this.$route.query.userId
      )
      this.getNewUserInfo()
    } else {
      this.getCode()
      this.checkCookie()
      sessionStorage.clear()
    }
  }
}
</script>

<style lang="less">
  .el-dropdown-menu {
    height: 300px;
    overflow: auto;
  }

  /*@media only screen and (max-width: 1920px) {*/
    /*.login {*/
      /*height: 100%;*/
    /*}*/
  /*}*/
  @media only screen and (min-width: 1366px) {
    .login {
      height: 100%;
    }
  }
  @media only screen and (max-width: 1366px) {
    .login {
      height: 768px;
    }
 }
  @media only screen and (max-width: 1280px) {
    .login {
      height: 100%;
    }
  }
  .bgImg{
    background: url("../assets/images/login.png") no-repeat;
  }
  .login {
    width: 100%;
    min-height: 768px;
    /*height: 100%;*/
    background-size: cover;
    position: relative;
    /*height: 100%;*/
    .content {
        position: absolute;
        left: 50%;
        margin-left: -270px;
        margin-top: 100px;
        .logo {
            text-align: center;
            img {
                /*margin-right: 100px;*/
                display: inline-block;
                padding-left: 50px;
                width: 456px;
                height: 66px;
            }
        }
        .login_entry {
            position: absolute;
            width: 1100px;
            .login_box {
                margin-top: 45px;
                width: 540px;
                height: 407px;
                background-color: white;
                position: relative;
                .round {
                    text-align: center;
                    .login-titlle {
                        margin-left: 42%;
                        /*margin-top: 20px;*/
                        width: 95px;
                        height: 52px;
                        border-bottom: 2px solid #377bee;
                        span {
                            font-size: 22px;
                            line-height: 52px;
                            color: #377bee;
                            font-family: "Microsoft Ya Hei";
                        }
                    }
                    /*position: absolute;*/
                    /*width: 154px;*/
                    /*height: 154px;*/
                    /*border-radius: 50%;*/
                    /*background-color: white;*/
                    /*left: 50%;*/
                    /*margin-top: -44px;*/
                    /*margin-left: -77px;*/
                    /* 后面去掉 */
                    .el-dropdown {
                        margin: 29px 0 0 40px;
                        cursor: pointer;
                        color: #2a75ec;
                        position: absolute;
                    }
                }
                .form {
                    padding-top: 38px;
                    .login_row {
                        padding: 0 95px;
                        .el-form-item {
                            .el-form-item__content {
                                .el-input {
                                    .el-input__inner {
                                        background-color: #fafafa;
                                        border: 1px solid #dfdfdf;
                                    }
                                }
                            }
                        }
                        .nameshower {
                            .el-form-item__content {
                                .el-input {
                                    .el-input__inner {
                                        background-color: #e7f0ff;
                                        border: 1px solid #1965e8;
                                    }
                                  .iconfont {
                                    color:#1965e8;
                                  }
                                }
                            }
                        }
                        .code_input {
                            width: 55%;
                            float: left;
                            .el-form-item {
                                .el-form-item__content {
                                    .el-input {
                                        .el-input__inner {
                                            padding-left: 10px !important;
                                            background-color: #fafafa;
                                            border: 1px solid #dfdfdf;
                                        }
                                    }
                                }
                            }
                            .shower {
                                .el-form-item__content {
                                    .el-input {
                                        .el-input__inner {
                                            padding-left: 10px !important;
                                            background-color: #e7f0ff;
                                            border: 1px solid #1965e8;
                                        }
                                    }
                                }
                            }
                        }
                        .code_view {
                            width: 40.5%;
                            height: 40px;
                            float: right;
                            border-radius: 4px;
                            border: 1px solid #dcdfe6;
                            text-align: center;
                            line-height: 58px;
                            overflow: hidden;
                            img {
                                width: 134px;
                                height: 38px;
                            }
                        }
                        .code {
                            width: 15px;
                            height: 17px;
                        }
                        .userName {
                            width: 14px;
                            height: 16px;
                            background-color: inherit;
                        }
                        .passWord {
                            width: 14px;
                            height: 16px;
                        }
                    }
                    .notice {
                        display: block;
                        .select {
                            float: left;
                            margin-left: 95px;
                            i {
                                color: #ffffff;
                            }
                        }
                        .forget {
                            float: right;
                            margin-right: 95px;
                            color: #377bee;
                            cursor: pointer;
                        }
                    }
                }
                .login_btn {
                    text-align: center;
                    padding-top: 45px;
                    .el-button {
                        width: 65%;
                        border-radius: 4px;
                    }
                }
                .spread {
                    position: relative;
                    float: right;
                    margin-right: -3.4%;
                    margin-top: -35%;
                  .imgShow{
                    -webkit-transform: rotateY(180deg);
                    -moz-transform: rotateY(180deg);
                    -ms-transform: rotateY(180deg);
                    -o-transform: rotateY(180deg);
                    transform: rotateY(180deg);
                  }
                }
            }
            .show {
                width: 477px;
                float: left;
                margin-left: -100px;
                .spread {
                    margin-top: -38%;
                    margin-right: -4%;
                    z-index: 22;
                }
                .notice {
                    .remember {
                        margin-right: 165px !important;
                    }
                }
                .code_view {
                    img {
                        width: 118px !important;
                    }
                }
            }
            .qr-code {
                float: right;
                margin-top: 45px;
                width: 477.5px;
                height: 407px;
                background-color: white;
                margin-right: 22.31%;
                z-index: 0;
                .line {
                    position: absolute;
                    z-index: 10;
                    margin-left: -3px;
                    width: 5px;
                    height: 407px;
                    background-color: #ffffff;
                    img {
                        width: 8px;
                        height: 407px;
                    }
                }
                .qr-content {
                    canvas {
                        visibility: hidden;
                    }
                    img {
                        width: 31%;
                        height: 36%;
                        padding: 4px;
                        border: 1px solid #eeeeee;
                        margin: auto;
                        margin-top: 22%;
                    }
                }
            }
        }
    }

    .bottom {
      position: absolute;
      // left: 50%;
      width: 540px;
      margin-top: 20px;
      // margin-left: -120px;
      bottom: -30px;

      // :first-child {
      //   margin-right: 85px;
      // }

      .bottom-span {
        /*margin-left: 25px;*/
        margin-left: calc((540px - 228px) / 2);
        width: 228px;
        color: #ffffff;
        font-size: 12px;
      }
    }
  }

  #app > .login .el-form-item__content {
    margin-left: 0 !important;
  }

  #app > .login .el-form-item__content {
    margin-left: 0 !important;
  }

  #app > .login .el-input__inner {
    border-radius: 4px;
    padding-left: 40px;
  }

  #app > .login .el-input__prefix {
    line-height: 35px;
    padding-left: 12px;
    padding-top: 2px;
  }

  #app > .login .el-form-item {
    margin-bottom: 20px;
  }

  #app > .login .el-button--primary {
    background-color: #377bee;
    border-color: #377bee;
    box-shadow: 0 3px 5px rgba(55, 123, 238, 0.51);
  }
</style>
