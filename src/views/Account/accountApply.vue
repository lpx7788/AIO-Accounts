<template>
  <div id="accountApply" :class="[(isAndroid || isIOS) ? '' : 'pcStyle']">
    <div class="content" v-if="showRes">
      <div id="formDataApp" v-if="isAndroid || isIOS">
        <mt-field label="期货公司：" v-model="formDataApp.futuresName" :disabled='true'></mt-field>
        <mt-field label="开户类型：">
          <el-radio-group
            v-model="formDataApp.accountType"
            @change="selectAccountType">
            <el-radio :label="1">个人</el-radio>
            <el-radio :label="2">企业</el-radio>
          </el-radio-group>
        </mt-field>
        <mt-field label="企业名称：" v-model="formDataApp.companyName" v-if="formDataApp.accountType == 2"
                  placeholder="请输入企业名称"></mt-field>
        <p>请输入企业名称</p>
        <mt-field label="您的姓名：" v-model="formDataApp.userName" placeholder="请输入您的姓名"></mt-field>
        <p>请输入您的姓名</p>
        <mt-field label="联系方式：" type="number" v-model="formDataApp.contact" :disabled='contactAbled'
                  placeholder="请输入11位有效手机号" :attr="{ maxlength: 11 }"></mt-field>
        <p>请输入11位有效手机号</p>
        <mt-field label="联系地址：" v-model="formDataApp.contactAddress" disabled @click.native="showAddress">
          <i class="el-icon-arrow-right"></i>
        </mt-field>
        <mt-field label="具体地址：" type="textarea" rows="4" v-model="formDataApp.detailedAddress"
                  placeholder="请填写具体地址，不少于5个字"></mt-field>
        <p>请填写具体地址，不少于5个字</p>
        <mt-field label="空闲时间段：" v-model="formDataApp.freeTime" disabled placeholder="请选择时间段" @click.native="showTime">
          <i class="el-icon-arrow-right"></i>
        </mt-field>
        <p>请选择时间段</p>
        <mt-field label="备注：" type="textarea" rows="4" v-model="formDataApp.remark" placeholder="选填，最多100个字"></mt-field>
      </div>
      <el-form label-position="right" id="formDataWeb" label-width="120px" :model="formDataWeb" :rules="rules"
               ref="formDataWeb" v-else>
        <el-form-item
          label="期货公司：">
          <el-input v-model="formDataWeb.futuresName" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="开户类型：">
          <el-radio-group
            v-model="formDataWeb.accountType"
            @change="selectAccountType">
            <el-radio :label="1">个人</el-radio>
            <el-radio :label="2">企业</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="formDataWeb.accountType == 2"
          label="企业名称："
          prop="companyName">
          <el-input v-model="formDataWeb.companyName" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item
          label="您的姓名："
          prop="userName">
          <el-input v-model="formDataWeb.userName" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式："
          prop="contact">
          <el-input v-model="formDataWeb.contact" :disabled="contactAbled" placeholder="请输入11位手机号"
                    maxlength="11"></el-input>
        </el-form-item>
        <el-form-item
          label="联系地址："
          prop="contactAddress">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="formDataWeb.contactAddress"
            @change="handleChange"
            change-on-select>
          </el-cascader>
        </el-form-item>
        <el-form-item
          label="具体地址："
          prop="detailedAddress">
          <el-input
            type="textarea"
            :rows="4"
            v-model="formDataWeb.detailedAddress"
            placeholder="请填写具体地址，不少于5个字"
            maxlength="100">
          </el-input>
        </el-form-item>
        <el-form-item
          label="空闲时间段："
          prop="freeTime">
          <el-collapse v-model="activeNames">
            <el-tooltip class="item" effect="light" :content="freeTimeContent" placement="top">
              <el-collapse-item :title="formDataWeb.freeTime" name="1">
                <div class="freeTime">
                  <div class="flex-con">
                    <div class="week">
                      <mt-cell-swipe
                        @click.native="chooseWeek(index)"
                        v-for="(item,index) in weekList"
                        :key="index"
                        :title="item"
                        :class="[weekIdx == index ? 'white' : '']">
                      </mt-cell-swipe>
                    </div>
                    <div style="flex: 1;">
                      <mt-cell-swipe
                        @click.native="chooseTime(index)"
                        v-for="(item,index) in timeList"
                        :key="index"
                        :title="item">
                        <i class="el-icon-check" v-if="timeCheckList.indexOf(index) != -1"></i>
                      </mt-cell-swipe>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-tooltip>
          </el-collapse>
          <div class="el-form-item__error" v-if="freeTimeRule">
            请选择空闲时间段
          </div>
        </el-form-item>
        <el-form-item
          label="备注："
          prop="">
          <el-input
            type="textarea"
            :rows="4"
            v-model="formDataWeb.remark"
            placeholder="选填，最多100个字"
            maxlength="100">
          </el-input>
        </el-form-item>
      </el-form>

      <mt-popup
        v-model="addressVisible"
        position="bottom">
        <mt-picker :slots="addressSlots" @change="onValuesChange"></mt-picker>
      </mt-popup>

      <mt-popup
        v-model="timeVisible"
        position="bottom">
        <div class="freeTime">
          <div class="flex-con">
            <p class="freeTimeTitle">空闲时间段</p>
          </div>
          <div class="flex-con">
            <div class="week">
              <mt-cell-swipe
                @click.native="chooseWeek(index)"
                v-for="(item,index) in weekList"
                :key="index"
                :title="item"
                :class="[weekIdx == index ? 'white' : '']">
              </mt-cell-swipe>
            </div>
            <div style="flex: 1;">
              <mt-cell-swipe
                @click.native="chooseTime(index)"
                v-for="(item,index) in timeList"
                :key="index"
                :title="item">
                <i class="el-icon-check" v-if="timeCheckList.indexOf(index) != -1"></i>
              </mt-cell-swipe>
            </div>
          </div>
          <p class="weekBottom" @click="timeVisible = false">取消选择</p>
        </div>
      </mt-popup>

      <p style="text-align: center;"><i class="el-icon-warning"></i> 温馨提示：提交期货开户申请后，会在七个工作日内安排专人和您联系，请注意接听电话。</p>
      <p style="text-align: center;">
        <el-button type="primary" @click.native="submit">提交申请</el-button>
        <br>
        <br>
      </p>
    </div>

    <div class="res" v-else>
      <p>
        您的期货开户申请已成功提交，我们会在7个工作日内安排专人和您联系，请注意接听电话。
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="callBack">确 定</el-button>
      </span>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'

  let phoneRe = /^1[3456789]\d{9}$/

  export default {
    data () {
      var companyNameRule = (rule, value, callback) => {
        if (this.formDataWeb.accountType === 2) {
          if (value.length === '') {
            return callback(new Error('请输入企业名称'))
          } else {
            callback()
          }
        }
      }
      var detailedAddress = (rule, value, callback) => {
        if (value.length < 5) {
          return callback(new Error('请输入详细地址，不少于5个字'))
        } else {
          callback()
        }
      }
      var contactAddress = (rule, value, callback) => {
        if (value.length !== 2) {
          return callback(new Error('请选择联系地址'))
        } else {
          callback()
        }
      }
      var phone = (rule, value, callback) => {
        let phoneRe = /^1[3456789]\d{9}$/
        if (!phoneRe.test(value)) {
          callback(new Error('手机号码输入不合法'))
        } else {
          callback()
        }
      }
      return {
        freeTimeContent: '',
        freeTimeRule: false,
        contactAbled: false,
        token: '',
        formDataWeb: {
          futuresName: '',
          accountType: 1,
          companyName: '',
          userName: '',
          contact: '',
          contactAddress: [],
          detailedAddress: '',
          freeTime: '请选择时间段',
          remark: ''
        },
        formDataApp: {
          futuresName: '',
          accountType: 1,
          companyName: '',
          userName: '',
          contact: '',
          contactAddress: [],
          province: '',
          city: '',
          detailedAddress: '',
          freeTime: '',
          remark: ''
        },
        rules: {
          companyName: [
            {required: true, validator: companyNameRule, trigger: 'change'}
          ],
          userName: [
            {required: true, message: '请输入您的姓名', trigger: 'change'}
          ],
          contact: [
            {required: true, validator: phone, trigger: 'change'}
          ],
          contactAddress: [
            {required: true, validator: contactAddress, trigger: 'change'}
          ],
          detailedAddress: [
            {required: true, validator: detailedAddress, trigger: 'change'}
          ],
          freeTime: [
            {required: true, message: '请选择空闲时间段', trigger: 'change'}
          ]
        },
        isAndroid: false,
        isIOS: false,
        showRes: true,
        addressVisible: false,
        timeVisible: false,
        timeSlots: [],
        addressSlots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        cityList: [],
        active: '1',
        weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        timeList: ['09:00 ~ 11:00', '11:00 ~ 13:00', '13:00 ~ 15:00', '15:00 ~ 17:00', '17:00 ~ 19:00', '非期货开盘时间', '期货开盘时间'],
        timeCheckList: [],
        weekArr: [
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ],
        weekIdx: 0,
        options: [],
        activeNames: []
      }
    },
    methods: {
      hiddenSelect () {
        let collapse = document.getElementsByClassName('el-collapse-item__wrap')[0]
        let _this = this
        collapse.onmouseleave = function () {
          _this.activeNames = []
        }
      },
      handleChange () {

      },
      chooseWeek (idx) {
        this.weekIdx = idx
        this.timeCheckList = this.weekArr[idx]
      },
      chooseTime (idx) {
        if (this.weekArr[this.weekIdx].indexOf(idx) === -1) {
          this.weekArr[this.weekIdx].push(idx)
          this.timeCheckList = this.weekArr[this.weekIdx]
        } else {
          let i = this.weekArr[this.weekIdx].indexOf(idx)
          this.weekArr[this.weekIdx].splice(i, 1)
          this.timeCheckList = this.weekArr[this.weekIdx]
        }
        this.weekArr.forEach((item, index) => {
          if (item.length !== 0) {
            this.formDataApp.freeTime = this.weekList[index] + this.timeList[item[0]] + '...'
            this.formDataWeb.freeTime = this.weekList[index] + this.timeList[item[0]] + '...'
            return
          }
        })
        let arr = this.weekArr.filter(item => {
          return item.length !== 0
        })
        if (arr.length === 0) {
          this.formDataWeb.freeTime = '请选择时间段'
          this.formDataApp.freeTime = ''
          this.freeTimeRule = true
          this.freeTimeContent = ''
        } else {
          let html = ''
          this.freeTimeRule = false
          let freeTimeList = []
          this.weekArr.forEach((item, index) => {
            if (item.length !== 0) {
              let obj = {}
              let arr = []
              this.timeList.forEach((i, index) => {
                if (item.indexOf(index) !== -1) {
                  arr.push(i)
                }
              })
              obj[this.weekList[index]] = arr
              freeTimeList.push(obj)
            }
          })
          freeTimeList.forEach(item => {
            let h = ''
            let w = Object.keys(item)
            h = w + ' '
            item[w].forEach(i => {
              h += (i + ',')
            })
            html += h
          })
          this.freeTimeContent = html
        }
      },
      showAddress () {
        this.addressVisible = true
        this.noRefresh()
      },
      showTime () {
        this.timeVisible = true
      },
      selectAccountType () {
        if (this.isIOS || this.isAndroid) {
          let APP = document.getElementById('formDataApp')
          let pList = APP.getElementsByTagName('p')
          pList[0].style.display = 'none'
        }
      },
      selfAccountType () {
        this.formDataApp.accountType = 1
        this.showCompanyName = false
      },
      enterpriseAccountType () {
        this.formDataApp.accountType = 2
        this.showCompanyName = true
      },
      submit () {
        let freeTimeList = []
        this.weekArr.forEach((item, index) => {
          if (item.length !== 0) {
            let obj = {}
            let arr = []
            this.timeList.forEach((i, index) => {
              if (item.indexOf(index) !== -1) {
                arr.push(i)
              }
            })
            obj[this.weekList[index]] = arr
            freeTimeList.push(obj)
          }
        })
        let obj
        if (this.isIOS || this.isAndroid) {
          obj = {
            futuresCompanyName: this.formDataApp.futuresName,
            type: this.formDataApp.accountType,
            name: this.formDataApp.userName,
            companyName: this.formDataApp.companyName,
            phone: this.formDataApp.contact,
            province: this.formDataApp.province,
            city: this.formDataApp.city,
            address: this.formDataApp.detailedAddress,
            freeTime: freeTimeList,
            remark: this.formDataApp.remark
          }
          if (this.formDataApp.accountType === 1) {
            obj.companyName = ''
          }
          let APP = document.getElementById('formDataApp')
          let pList = APP.getElementsByTagName('p')
          let companyName = true
          let userName = true
          let contact = true
          let detailedAddress = true
          let freeTime = true
          if (this.formDataApp.accountType === 2) {
            if (this.formDataApp.companyName === '') {
              pList[0].style.display = 'block'
              companyName = false
            } else {
              pList[0].style.display = 'none'
              companyName = true
            }
          }
          if (this.formDataApp.userName === '') {
            pList[1].style.display = 'block'
            userName = false
          } else {
            pList[1].style.display = 'none'
            userName = true
          }
          if (this.formDataApp.contact === '') {
            pList[2].style.display = 'block'
            contact = false
          } else if (!phoneRe.test(this.formDataApp.contact)) {
            pList[2].style.display = 'block'
            contact = false
          } else {
            pList[2].style.display = 'none'
            contact = true
          }
          if (this.formDataApp.detailedAddress === '' || (this.formDataApp.detailedAddress.length < 5)) {
            pList[3].style.display = 'block'
            detailedAddress = false
          } else {
            pList[3].style.display = 'none'
            detailedAddress = true
          }
          if (this.formDataApp.freeTime === '') {
            pList[4].style.display = 'block'
            freeTime = false
          } else {
            pList[4].style.display = 'none'
            freeTime = true
          }
          if (companyName && userName && contact && detailedAddress && freeTime) {
            const param = obj
            this.httpClient.requestPost(this.projectConfig.REQUEST_URL_FUTURE_ACCOUNT_APPLY, param)
              .then(response => {
                let resCode = response.errorCode
                if (resCode === '0000') {
                  MessageBox.alert('您的期货开户申请已成功提交，我们会在7个工作日内安排专人和您联系，请注意接听电话。', '提交成功').then(action => {
                    window.history.back(-1); 
                    this.init1()
                  })
                }
              })
          }
        } else {
          obj = {
            futuresCompanyName: this.formDataWeb.futuresName,
            type: this.formDataWeb.accountType,
            name: this.formDataWeb.userName,
            companyName: this.formDataWeb.companyName,
            phone: this.formDataWeb.contact,
            province: this.formDataWeb.contactAddress[0],
            city: this.formDataWeb.contactAddress[1],
            address: this.formDataWeb.detailedAddress,
            freeTime: freeTimeList,
            remark: this.formDataWeb.remark
          }
          if (this.formDataWeb.accountType === 1) {
            obj.companyName = ''
          }
          if (this.formDataWeb.freeTime === '请选择时间段') {
            this.freeTimeRule = true
          }
          this.$refs['formDataWeb'].validate((valid) => {
            if (valid && (this.freeTimeRule === false)) {
              const param = obj
              this.httpClient.requestPost(this.projectConfig.REQUEST_URL_FUTURE_ACCOUNT_APPLY, param)
                .then(response => {
                  let resCode = response.errorCode
                  if (resCode === '0000') {
                    this.$alert('您的期货开户申请已成功提交，我们会在7个工作日内安排专人和您联系，请注意接听电话。', '', {
                      confirmButtonText: '确定',
                      center: true,
                      showClose: false,
                      callback: action => {
                        window.history.back(-1); 
                        this.init1()
                      }
                    });
                  }
                })
            }
          })
        }
        window._czc.push([ '_trackEvent', '期货开户申请提交', '期货开户申请提交'])
      },
      async getFuturesCompany () {
        const param = {}
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_FUTURE_DEFAULT_COMPANY, param)
          .then(response => {
            let futuresCompany = response.returnObject.futuresCompany
            this.formDataWeb.futuresName = futuresCompany
            this.formDataApp.futuresName = futuresCompany
          })
      },
      async getUser () {
        const param = {access_token: this.token}
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_FUTURE_USER_QUERY, param)
          .then(response => {
            let res = response.returnObject
            this.formDataWeb.companyName = res.companyName
            this.formDataApp.companyName = res.companyName
            this.formDataWeb.userName = res.userName
            this.formDataApp.userName = res.userName
            this.formDataWeb.contact = res.userPhone
            this.formDataApp.contact = res.userPhone
          })
      },
      async getCity () {
        const param = {}
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_FUTURE_CITY_QUERY, param)
          .then(response => {
            let res = response.returnObject
            if (this.isIOS || this.isAndroid) {
              this.cityList = res
              res.forEach(item => {
                this.addressSlots[0].values.push(item.provinceName)
              })
              this.addressSlots[2].values.push(res[0].childs[0].cityName)
            } else {
              res.forEach(item => {
                let obj = {}
                obj.value = item.provinceName
                obj.label = item.provinceName
                obj.children = []
                item.childs.forEach(i => {
                  let j = {}
                  j.value = i.cityName
                  j.label = i.cityName
                  obj.children.push(j)
                })
                this.options.push(obj)
              })
            }
            if(window._czc){
              window._czc.push(['_trackPageview', '/期货开户/'])
            }
          })
      },
      // 设置市级
      onValuesChange (picker, values) {
        this.formDataApp.province = values[0]
        this.formDataApp.city = values[1]
        this.formDataApp.contactAddress = values[0] + values[1]
        let arr = []
        this.cityList.forEach(item => {
          if (item.provinceName === values[0]) {
            item.childs.forEach(i => {
              arr.push(i.cityName)
            })
          }
        })
        picker.setSlotValues(1, arr)
      },
      init1 () {
        this.formDataWeb.companyName = ''
        this.formDataWeb.userName = ''
        this.formDataWeb.contact = ''
        this.formDataWeb.accountType = 1
        this.formDataWeb.contactAddress = []
        this.formDataWeb.detailedAddress = ''
        this.formDataWeb.freeTime = '请选择时间段'
        this.formDataWeb.remark = ''

        this.formDataApp.accountType = 1
        this.formDataApp.companyName = ''
        this.formDataApp.userName = ''
        this.formDataApp.contact = ''
        this.formDataApp.contactAddress = []
        this.formDataApp.province = ''
        this.formDataApp.city = ''
        this.formDataApp.detailedAddress = ''
        this.formDataApp.freeTime = ''
        this.formDataApp.remark = ''

        this.timeCheckList = []
        this.weekIdx = 0

        this.weekArr = [
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
        this.$refs['formDataWeb'].resetFields()
      },
      init2 () {
        this.formDataWeb.accountType = 1
        this.formDataWeb.contactAddress = []
        this.formDataWeb.detailedAddress = ''
        this.formDataWeb.freeTime = '请选择时间段'
        this.formDataWeb.remark = ''

        this.formDataApp.accountType = 1
        this.formDataApp.contactAddress = []
        this.formDataApp.province = ''
        this.formDataApp.city = ''
        this.formDataApp.detailedAddress = ''
        this.formDataApp.freeTime = ''
        this.formDataApp.remark = ''

        this.timeCheckList = []
        this.weekIdx = 0

        this.weekArr = [
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
        this.$refs['formDataWeb'].resetFields()
      },
      noRefresh () {
        if (this.isAndroid) {
          var bridge = getJsBridge()
          // 禁止下拉刷新
          bridge.call('jsToggleRefreshState', {'refreshEnable': '0'})
        }
      },
      setCollapse(){
        let elCollapse = document.getElementsByClassName('el-collapse')[0]
        elCollapse.onmouseenter = function(){
          let tooltip = document.getElementsByClassName('el-tooltip__popper')[0]
          if(tooltip){
            tooltip.style.maxWidth = '50vw'
          }
        }
      },
    },
    mounted () {
      // 判断终端
      var u = navigator.userAgent
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (this.isIOS || this.isAndroid) {
        this.token = sessionStorage.getItem('accountToken')
        if (this.token) {
          this.contactAbled = true
          this.getUser()
        }
      } else {
        this.setCollapse()
        this.token = window.name
        if(this.token != 'null' && this.token){
          if(this.token.length != 0){
            this.contactAbled = true
            this.getUser()
          }
        }
      }
      this.getCity()
      this.getFuturesCompany()
      this.hiddenSelect()
    }
  }
</script>

<style lang="scss" scoped>
  .pcStyle{
      width: 50vw;
      margin: 5vh auto;
  }
  .redBorder {
    border: 1px solid #f56c6c;
  }

  .mint-popup {
    width: 100%;
  }

  .freeTimeTitle {
    padding: 0.3rem 0 0.6rem 0.25rem;
    font-size: 0.33rem;
    flex: 0.3;
  }

  .week {
    flex: 0.3;
    .mint-cell {

      background: #f1f1f1;
      text-align: center;
    }
    .white {
      background: #fff;
    }
  }

  .weekBottom {
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #999;
  }

  #accountApply {
    height: 100%;
    background: #fff;
    .content {
      background: #fff;
    }
  }

  #formDataWeb {

    .flex-between {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 0 10px;
      color: #dcdfe6;
    }
  }

  .freeTimeSelect {
    position: absolute;
    z-index: 9999;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }

  .el-form-item__error {
    margin-top: 2px;
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
</style>
<style lang="scss">
  #accountApply {

    textarea {
      resize: none;
    }
    #formDataApp {

      .mint-cell:nth-child(2) {

        .mint-cell-value {

          input {
            display: none;
          }
        }
      }
      .mint-cell:nth-child(9),.mint-cell:nth-child(13),.mint-cell:nth-child(10),.mint-cell:nth-child(14),{

        .mint-cell-wrapper{
          align-items: baseline;
        }
      }
      p {
        text-align: center;
        color: #f56c6c;
        display: none;
      }
    }
    .el-collapse {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 0 15px;
    }
    .el-collapse-item__wrap {
      position: absolute;
      width: 90%;
      z-index: 999;
      background: #fff;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
    }
    .el-collapse-item__header {
      color: #ccc;
      height: 32px;
      line-height: 32px;
      i {
        height: 32px;
        line-height: 32px;
      }
    }
  }
</style>
