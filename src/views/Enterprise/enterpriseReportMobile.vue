<template>
  <div class="q-box">
    <p class="q-head" @click="changeDate" ref="date">{{date}} <i class="el-icon-arrow-down"></i></p>
    <mt-datetime-picker
      ref="picker"
      v-model="pickerValue"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      @confirm="handleConfirm"
      @cancel="handleCancel">
    </mt-datetime-picker>
    <div class="q-navbar-top">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1" v-if="reportType == 2 || reportType == 3">销售</mt-tab-item>
        <mt-tab-item id="2" v-if="reportType == 1 || reportType == 3">采购</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="flex-around">
          <div>
            <p>销售订单数</p>
            <p>{{sumSell.totalOrderNum}}</p>
          </div>
          <div class="q-center">
            <p>销售吨数</p>
            <p>{{sumSell.totalDealQuantity}}</p>
          </div>
          <div>
            <p>销售总额（万元）</p>
            <p>{{sumSell.totalPrice}}</p>
          </div>
        </div>
        <div class="flex-around">
          <div>
            <p>平台交易手续费</p>
            <p>{{sumSell.totalServiceCharge}}</p>
          </div>
          <div class="q-center">
            <p>平台补贴</p>
            <p>{{sumSell.totalSubsidy}}</p>
          </div>
          <div>
            <p>合计应付手续费</p>
            <p>{{sumSell.totalRealServiceCharge}}</p>
          </div>
        </div>
        <div class="q-navbar">
          <mt-navbar v-model="selectedXS">
            <mt-tab-item id="1">分类报表</mt-tab-item>
            <mt-tab-item id="2">明细</mt-tab-item>
          </mt-navbar>
        </div>
        <mt-tab-container v-model="selectedXS">
          <mt-tab-container-item id="1">
            <div id="q-echartsBox-sellbar">
              <h4><i></i> 各品种销售吨数及销售总额（万元）</h4>
              <div class="container-box">
                <div id="containerBarSale"></div>
                <div id="barSell">暂无数据</div>
              </div>
            </div>
            <div id="q-echartsBox-sellpie">
              <h4><i></i> 交易手续费</h4>
              <div class="container-box">
                <div id="containerPieSale"></div>
                <div id="pieSell">暂无数据</div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <el-table
              :data="tableDataSale"
              stripe
              @row-click="goOrderDetail">
              <el-table-column
                fixed
                label="时间"
                prop="date"
                width="100px">
              </el-table-column>
              <el-table-column
                fixed
                label="品种"
                prop="categoryName">
              </el-table-column>
              <el-table-column
                label="订单编号"
                prop="customerOrderCode">
              </el-table-column>
              <el-table-column
                label="销售吨数"
                prop="dealQuantity">
              </el-table-column>
              <el-table-column
                prop="totalPrice">
                <template slot="header" slot-scope="scope">
                  销售总额<br>（万元）
                </template>
              </el-table-column>
              <el-table-column
                prop="serviceCharge">
                <template slot="header" slot-scope="scope">
                  手续费<br>（万元）
                </template>
              </el-table-column>
              <el-table-column
                prop="subsidy">
                <template slot="header" slot-scope="scope">
                  平台补贴<br>（万元）
                </template>
              </el-table-column>
              <el-table-column
                label="合计应付手续费（元）"
                prop="totalServiceCharge">
              </el-table-column>
            </el-table>
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="flex-around">
          <div>
            <p>采购订单数</p>
            <p>{{sumBuy.totalOrderNum}}</p>
          </div>
          <div class="q-center">
            <p>采购吨数</p>
            <p>{{sumBuy.totalDealQuantity}}</p>
          </div>
          <div>
            <p>采购总额（万元）</p>
            <p>{{sumBuy.totalPrice}}</p>
          </div>
        </div>
        <div class="q-navbar">
          <mt-navbar v-model="selectedCG">
            <mt-tab-item id="1">分类报表</mt-tab-item>
            <mt-tab-item id="2">明细</mt-tab-item>
          </mt-navbar>
        </div>
        <mt-tab-container v-model="selectedCG">
          <mt-tab-container-item id="1">
            <div id="q-echartsBox-buybar">
              <h4><i></i> 各品种采购吨数及采购总额（万元）</h4>
              <div class="container-box">
                <div id="containerBarBuy"></div>
                <div id="barBuy">暂无数据</div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <el-table
              :data="tableDataBuy"
              stripe
              @row-click="goOrderDetail">
              <el-table-column
                fixed
                label="时间"
                prop="date"
                width="100px">
              </el-table-column>
              <el-table-column
                fixed
                label="品种"
                prop="categoryName">
              </el-table-column>
              <el-table-column
                label="订单编号"
                prop="customerOrderCode">
              </el-table-column>
              <el-table-column
                label="采购吨数"
                prop="dealQuantity">
              </el-table-column>
              <el-table-column
                label="采购总额（万元）"
                prop="totalPrice">
              </el-table-column>
            </el-table>
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data () {
      return {
        pickerValue: null,
        date: '',
        selected: '1',
        selectedXS: '1',
        selectedCG: '1',
        tableDataSale: [],
        tableDataBuy: [],
        sumSell: [],
        sumBuy: [],
        data: '',
        token: '',
        reportType: '',
        isIOS: false,
        isAndroid: false,
        loading: null
      }
    },
    watch: {},
    methods: {
      moment,
      handleCancel () {
        if (this.isAndroid) {
          // 允许下拉刷新
          let bridge = getJsBridge()
          bridge.call('jsToggleRefreshState', {'refreshEnable': '1'})
        }
      },
      // ios获取token
      getAccessToken (token) {
        this.token = token
        this.getUserDetail()
        this.getReportSumSell()
        this.getReportSumBuy()
        this.getReportDetailSell()
        this.getReportDetailBuy()
        this.getReportEchartsPieSell()
        this.getReportEchartsBuy()
        this.getReportEchartsBarSell()
      },
      // 跳转详情
      goOrderDetail (row) {
        if (this.isIOS) {
          window.webkit.messageHandlers.GoOrderDetail.postMessage(row.orderCode)
        }
        if (this.isAndroid) {
          let data = {
            id: row.orderCode
          }
          let bridge = getJsBridge()
          bridge.call('jsNavigateOrderDetail', data)
        }
      },
      // 打开日期选择器
      openPicker () {
        // 打开日期选择器
        this.$refs.picker.open()
        document.getElementsByClassName('picker-slot-center')[2].style.display = 'none'
        if (this.isAndroid) {
          let bridge = getJsBridge()
          // 禁止下拉刷新
          bridge.call('jsToggleRefreshState', {'refreshEnable': '0'})
          this.$nextTick(function () {
            document.getElementsByClassName('v-modal')[0].addEventListener('click', function () {
              // 允许下拉刷新
              bridge.call('jsToggleRefreshState', {'refreshEnable': '1'})
            })
          })
        }
      },
      handleConfirm () {
        this.date = this.moment(this.pickerValue).format('YYYY-MM')
        this.getReportSumSell()
        this.getReportSumBuy()
        this.getReportDetailSell()
        this.getReportDetailBuy()
        this.getReportEchartsBuy()
        this.getReportEchartsBarSell()
        this.getReportEchartsPieSell()

        if (this.isAndroid) {
          // 允许下拉刷新
          let bridge = getJsBridge()
          bridge.call('jsToggleRefreshState', {'refreshEnable': '1'})
        }
      },
      changeDate () {
        this.openPicker()
      },
      resizeWorldMapContainer (val) {
        val.style.width = window.innerWidth + 'px'
        val.style.height = window.innerHeight / 2 + 'px'
      },
      echartsBarSale () {
        // 销售柱状图
        let domBar = document.getElementById('containerBarSale')
        this.resizeWorldMapContainer(domBar)
        let myChartBar = echarts.init(domBar)

        let app = {}
        let optionBar = null

        let totalVolume = this.histogramSell.totalVolume + '吨'
        let totalAmount = this.histogramSell.totalAmount + '万元'

        let posList = [
          'left', 'right', 'top', 'bottom',
          'inside',
          'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
          'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ]

        app.config = {
          rotate: 0,
          align: 'center',
          verticalAlign: 'middle',
          position: 'top',
          distance: 15,
          onChange: function () {
            let labelOption = {
              normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
              }
            }
            myChart.setOption({
              series: [{
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }]
            })
          }
        }
        // 柱子内容样式
        let labelOption = {
          normal: {
            show: true,
            position: app.config.position,
            distance: app.config.distance,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            rotate: app.config.rotate,
            formatter: '{c}',
            fontSize: 13,
            color: '#222',
            rich: {
              name: {
                textBorderColor: '#fff'
              }
            }
          }
        }
        // 展示数据
        let dataListBar = [
          {
            name: totalVolume,
            type: 'bar',
            // 柱状间隔
            barGap: 0,
            // 柱状内容样式
            // label: labelOption,
            barMaxWidth: 30,
            itemStyle: {
              normal: {
                color: '#fde24d'
              }
            },
            yAxisIndex: 0,
            data: this.histogramSell.volume
          },
          {
            name: totalAmount,
            type: 'bar',
            // label: labelOption,
            barMaxWidth: 30,
            itemStyle: {
              normal: {
                color: '#5970fd'
              }
            },
            yAxisIndex: 1,
            data: this.histogramSell.amount
          }
        ]
        // 设置柱状图
        optionBar = {
          color: ['#003366', '#006699', '#4cabce', '#e5323e'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            position: [10, 0],
            textStyle: {
              height: '5%'
            },
            triggerOn: 'click',
            formatter: function (params) {
              // let html = `<div>
              //                           <p>${params[0] ? params[0].name : params[1].name}</p>
              //                           <p>吨数：${params[0] ? params[0].value : 0}</p>
              //                           <p>金额（万元）：${params[1] ? params[1].value : 0}</p>
              //                       </div>`
              // return html
              if(params.length == 2){
                    var html = `<div>
                                    <p>${params[0]?params[0].name:params[1].name}</p>
                                    <p>吨数：${params[0]?params[0].value:0}</p>
                                    <p>金额（万元）：${params[1]?params[1].value:0}</p>
                                </div>`
                    return html;
                }else{
                    if(params[0].seriesName.indexOf('万元') == -1){
                        var html = `<div>
                                        <p>${params[0]?params[0].name:params[1].name}</p>
                                        <p>吨数：${params[0]?params[0].value:0}</p>
                                    </div>`
                        return html;
                    }else{
                        var html = `<div>
                                        <p>${params[0]?params[0].name:params[1].name}</p>
                                        <p>金额（万元）：${params[0]?params[0].value:0}</p>
                                    </div>`
                        return html;
                    }
                }
            }
          },
          legend: {
            data: [totalVolume, totalAmount],
            textStyle: {
              fontSize: 12
            },
            itemWidth: 10,
            itemHeight: 10,
            left: 5
          },
          toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          dataZoom: [
            {   // 这个dataZoom组件，也控制x轴。
              type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
              show: false
              // start: 10,      // 左边在 10% 的位置。
              // end: 60         // 右边在 60% 的位置。
            }
          ],
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: this.histogramSell.variety,
              axisLabel: {
                textStyle: {
                  fontSize: 12,
                  color: '#666'
                },
                interval: 0,
                formatter: function (value) {
                  return value.split('').join('\n')
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                textStyle: {
                  fontSize: 10
                }
              },
              name: '吨数'
            },
            {
              type: 'value',
              axisLabel: {
                textStyle: {
                  fontSize: 10
                }
              },
              name: '金额（万元）'
            }
          ],
          grid: {
            left: 50
          },
          series: dataListBar
        }

        if (optionBar && typeof optionBar === 'object') {
          this.resizeWorldMapContainer(domBar)
          myChartBar.setOption(optionBar, true)
        }
        ;
      },
      echartsPieSale () {
        // 销售饼状图
        let domPie = document.getElementById('containerPieSale')
        this.resizeWorldMapContainer(domPie)
        let myChartPie = echarts.init(domPie)
        let pieChart = this.pieChart.total
        let optionPie = null
        // 设置饼状图
        optionPie = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            triggerOn: 'click'
          },
          color: ['#6e45e4', '#ff8c1b', '#6c9cff', '#5970fd', '#fde24d', '#fca803', '#2abdf9', '#fedd58', '#575fcf', '#2ec46b'],
          series: [
            {
              name: '商品品种',
              type: 'pie',
              radius: ['30%', '50%'],
              avoidLabelOverlap: false,
              tooltip: {
                position: [10, 10]
              },
              label: {
                normal: {
                  formatter: '{c|￥{c}}\n{b|{b}}',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  padding: 5,
                  rich: {
                    b: {
                      color: '#666',
                      align: 'center'
                    },
                    c: {
                      color: '#222',
                      align: 'center'
                    }
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 4,
                  length2: 4
                }
              },
              data: this.pieChart.data
            },
            {
              name: '总金额',
              type: 'pie',
              radius: ['0', '15%'],
              avoidLabelOverlap: false,
              hoveranination: false,
              silent: true,
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: function (argument) {
                    let html
                    html = `{a|￥${pieChart}}\n{b|总手续费}`
                    return html
                  },
                  textStyle: {
                    fontSize: 13,
                    color: '#222'
                  },
                  rich: {
                    a: {
                      align: 'center'
                    },
                    b: {
                      color: '#666',
                      align: 'center'
                    }
                  }
                }
              },
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#fff' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#fff' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              },
              data: [{value: 0, name: '本月业绩'}]
            }
          ]
        }

        if (optionPie && typeof optionPie === 'object') {
          myChartPie.setOption(optionPie, true)
        }
      },
      echartsBuy () {
        // 采购柱状图
        let domBarBuy = document.getElementById('containerBarBuy')
        this.resizeWorldMapContainer(domBarBuy)
        let myChartBarBuy = echarts.init(domBarBuy)
        let optionBarBuy = null
        let app = {}

        let totalVolume = this.histogramBuy.totalVolume + '吨'
        let totalAmount = this.histogramBuy.totalAmount + '万元'

        let posList = [
          'left', 'right', 'top', 'bottom',
          'inside',
          'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
          'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ]

        app.config = {
          rotate: 0,
          align: 'center',
          verticalAlign: 'middle',
          position: 'top',
          distance: 15,
          onChange: function () {
            let labelOption = {
              normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
              }
            }
            myChart.setOption({
              series: [{
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }]
            })
          }
        }

        // 柱子内容样式
        let labelOption = {
          normal: {
            show: true,
            position: app.config.position,
            distance: app.config.distance,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            rotate: app.config.rotate,
            formatter: '{c}',
            fontSize: 13,
            color: '#222',
            rich: {
              name: {
                textBorderColor: '#fff'
              }
            }
          }
        }

        // 展示数据
        let dataListBar = [
          {
            name: totalVolume,
            type: 'bar',
            barGap: 0,
            barMaxWidth: 30,
            itemStyle: {
              normal: {
                color: '#fde24d'
              }
            },
            yAxisIndex: 0,
            data: this.histogramBuy.volume
          },
          {
            name: totalAmount,
            type: 'bar',
            barMaxWidth: 30,
            itemStyle: {
              normal: {
                color: '#5970fd'
              }
            },
            yAxisIndex: 1,
            data: this.histogramBuy.amount
          }
        ]

        // 设置采购柱状图
        optionBarBuy = {
          color: ['#003366', '#006699', '#4cabce', '#e5323e'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            position: [10, 0],
            textStyle: {
              height: '5%'
            },
            triggerOn: 'click',
            formatter: function (params) {
              if(params.length == 2){
                    var html = `<div>
                                    <p>${params[0]?params[0].name:params[1].name}</p>
                                    <p>吨数：${params[0]?params[0].value:0}</p>
                                    <p>金额（万元）：${params[1]?params[1].value:0}</p>
                                </div>`
                    return html;
                }else{
                    if(params[0].seriesName.indexOf('万元') == -1){
                        var html = `<div>
                                        <p>${params[0]?params[0].name:params[1].name}</p>
                                        <p>吨数：${params[0]?params[0].value:0}</p>
                                    </div>`
                        return html;
                    }else{
                        var html = `<div>
                                        <p>${params[0]?params[0].name:params[1].name}</p>
                                        <p>金额（万元）：${params[0]?params[0].value:0}</p>
                                    </div>`
                        return html;
                    }
                }
            }
          },
          legend: {
            data: [totalVolume, totalAmount],
            textStyle: {
              fontSize: 12
            },
            itemWidth: 10,
            itemHeight: 10,
            left: 5
          },
          toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          dataZoom: [
            {   // 这个dataZoom组件，也控制x轴。
              type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
              show: false
            }
          ],
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: this.histogramBuy.variety,
              axisLabel: {
                textStyle: {
                  fontSize: 12
                },
                interval: 0,
                formatter: function (value) {
                  return value.split('').join('\n')
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                textStyle: {
                  fontSize: 10
                }
              },
              name: '吨数'
            },
            {
              type: 'value',
              axisLabel: {
                textStyle: {
                  fontSize: 10
                }
              },
              name: '金额（万元）'
            }
          ],
          grid: {
            left: 50
          },
          series: dataListBar
        }
        if (optionBarBuy && typeof optionBarBuy === 'object') {
          this.resizeWorldMapContainer(domBarBuy)
          myChartBarBuy.setOption(optionBarBuy, true)
        }
      },
      async getReportSumSell () {
        const param = {
          token: this.token,
          queryDate: this.date,
          deliveryType: '1'
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_COMPANY_REPORT_SUM_QUERY, param)
          .then(response => {
            this.loading.close()
            if (response.returnObject) {
              this.sumSell = response.returnObject[0]
            }
          })
      },
      async getReportSumBuy () {
        const param = {
          token: this.token,
          queryDate: this.date,
          deliveryType: '2'
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_COMPANY_REPORT_SUM_QUERY, param)
          .then(response => {
            if (response.returnObject) {
              this.sumBuy = response.returnObject[0]
            }
          })
      },
      async getReportDetailSell () {
        const param = {
          token: this.token,
          queryDate: this.date,
          deliveryType: '1'
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_COMPANY_REPORT_DETAIL_QUERY, param)
          .then(response => {
            this.tableDataSale = response.returnObject
          })
      },
      async getReportDetailBuy () {
        const param = {
          token: this.token,
          queryDate: this.date,
          deliveryType: '2'
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_COMPANY_REPORT_DETAIL_QUERY, param)
          .then(response => {
            this.tableDataBuy = response.returnObject
          })
      },
      async getReportEchartsBarSell () {
        const param = {
          token: this.token,
          queryDate: this.date,
          deliveryType: '1'
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_COMPANY_REPORT_HISTOGRAM_QUERY, param)
          .then(response => {
            this.histogramSell = response.returnObject
            let domBarSell = document.getElementById('barSell')
            if (this.histogramSell) {
              if (this.histogramSell.volume == undefined) {
                domBarSell.style.display = 'block'
                this.resizeWorldMapContainer(domBarSell)
              } else {
                domBarSell.style.display = 'none'
              }
              this.echartsBarSale()
            }
          })
      },
      async getReportEchartsPieSell () {
        const param = {
          token: this.token,
          queryDate: this.date,
          deliveryType: '1'
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_COMPANY_REPORT_PIECHART_QUERY, param)
          .then(response => {
            this.pieChart = response.returnObject
            let domPieSell = document.getElementById('pieSell')
            if (this.pieChart) {
              if (this.pieChart.data == undefined) {
                domPieSell.style.display = 'block'
                this.resizeWorldMapContainer(domPieSell)
              } else {
                domPieSell.style.display = 'none'
                domPieSell.style.display = 'none'
              }
              this.echartsPieSale()
            }
          })
      },
      async getReportEchartsBuy () {
        const param = {
          token: this.token,
          queryDate: this.date,
          deliveryType: '2'
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_COMPANY_REPORT_HISTOGRAM_QUERY, param)
          .then(response => {
            this.histogramBuy = response.returnObject
            let domBarBuy = document.getElementById('barBuy')
            if (this.histogramBuy) {
              if (this.histogramBuy.volume == undefined) {
                domBarBuy.style.display = 'block'
                this.resizeWorldMapContainer(domBarBuy)
              } else {
                domBarBuy.style.display = 'none'
              }
              this.echartsBuy()
            }
          })
      },
      async getUserDetail () {
        const param = {
          token: this.token
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_COMPANY_REPORT_USER_REFRESH, param)
          .then(response => {
            // 判断当前用户身份 1买家 2卖家 3卖家和买家
            this.reportType = response.returnObject.user.auths.companyIdentity
            if (this.reportType == 1) {
              this.selected = '2'
            } else {
              this.selected = '1'
            }
            if(window._czc){
              window._czc.push(['_trackPageview', '/企业报表/'])
            }
          })
      },
      // android获取token
      getTokenAndroid () {
        let _this = this
        if (!window.getJsBridge) {
          let arg = {}
          let argString = JSON.stringify(arg)
          let jsonObj = _dsbridge.call('jsGetUserSync', argString)
          _this.token = JSON.parse(jsonObj).data.token
          _this.getUserDetail()
          _this.getReportSumSell()
          _this.getReportSumBuy()
          _this.getReportDetailSell()
          _this.getReportDetailBuy()
          _this.getReportEchartsBuy()
          _this.getReportEchartsBarSell()
          _this.getReportEchartsPieSell()
        } else {
          let bridge = getJsBridge()
          bridge.call('jsGetUser', {}, function (jsonObj) {
          })
        }
      }
    },
    async mounted () {
      this.loading = this.$loading({
        lock: true,
        text: '请稍等',
        spinner: 'el-icon-loading'
      })
      let myDate = new Date()
      this.date = this.moment(myDate).format('YYYY-MM')
      this.pickerValue = myDate

      // 判断终端
      let u = navigator.userAgent
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

      if (this.isIOS) {
        window.getAccessToken = this.getAccessToken
        window.webkit.messageHandlers.AskForToken.postMessage('')
      }
      if (this.isAndroid) {
        this.getTokenAndroid()
      }
    }
  }
</script>

<style lang="scss" scoped>
  body {
    height: 100%;
    margin: 0;
  }

  #containerBarSale, #containerPieSale, #containerBarBuy {
    width: 7rem;
    height: 7rem;
  }

  #q-echartsBox-sellbar, #q-echartsBox-sellpie, #q-echartsBox-Buy {
    float: left;
    position: relative;
    .container-box {
      position: relative;
      width: 7rem;
      height: 7rem;
    }
  }

  #barBuy, #barSell, #pieSell {
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 7rem;
    height: 7rem;
    line-height: 7rem;
    text-align: center;
    vertical-align: middle;
  }

  .q-head {
    text-align: center;
    background: #fff;
    padding: 0.1rem 0;
    border-bottom: 0.01rem solid #f1f1f1;
    font-size: 0.32rem;
    color: #222;
  }

  .flex-around {

    div {
      flex: 1;
      text-align: center;
      border-bottom: 0.01rem solid #f1f1f1;
      padding: 0.3rem 0;
      p:nth-child(1) {
        font-size: 0.27rem;
        color: #666;
      }
      p:nth-child(2) {
        font-size: 0.27rem;
        color: #222;
      }
    }
  }

  .q-center {
    border-left: 0.01rem solid #f1f1f1;
    border-right: 0.01rem solid #f1f1f1;
  }

  .mint-tab-container {
    background: #fff;
    height: 100%;
    p {
      line-height: 0.5rem;
    }
    h4 {
      margin: 0.34rem 0 0 0.3rem;
      color: #222;
      font-size: 0.3rem;
      i {
        border-left: 0.05rem solid #5970fd;
        margin-right: 0.08rem;
      }
    }
  }

  .mint-navbar {
    background: #f1f1f1;
  }

  .q-navbar {

    .is-selected {
      background: #5970fd;
      border-bottom: 0 !important;
      color: #fff !important;
      margin-bottom: 0;
    }
  }

  .q-navbar-top {

    .is-selected {
      color: #5970fd !important;
      margin-bottom: 0;
      border-bottom: 0.05rem solid #5970fd !important;
      .mint-tab-item-label {
        font-size: 0.32rem !important;
      }
    }
  }

  .el-table__fixed-header-wrapper {

    .cell {
      text-align: center;
    }
  }

  .mint-popup, .mint-datetime, .mint-popup-bottom {
    z-index: 99999999;
  }
</style>
