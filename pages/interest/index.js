import { $wuxSelect, $wuxCalendar } from '../../components/wux-weapp/index'
import { formatDate, isNumber, toDate, getYearMonthDay, daysBetweenTwoDates } from '../../utils/common'

Page({

  data: {
    benJinVal: '',
    liLvType: {
      title: '月利率',
      value: 2
    },
    liLvVal: 2,
    startDate: [],
    endDate: [formatDate(new Date)],
    gongShiType: 1,
    days: '',
    result: ''
  },

  // 输入本金时触发
  inputBenJin(e) {
    // console.log('onInputBenJin', this.data.benJinVal, e)
    var val = e.detail.value
    this.setData({
      benJinVal: val
    })
  },
  // 选择利率类型时触发
  selectLiLvType(e) {
    // console.log('onSelectLiLvType', this.data.liLvType, e)
    $wuxSelect().open({
      value: this.data.liLvType.value, //（弹出窗口的）当前选中的条目
      options: [ // 下拉列表
        { title: '年利率', value: 1 },
        { title: '月利率', value: 2 },
        { title: '日利率', value: 3 },
      ],
      toolbar: { // 工具栏配置项
        title: '请选择乁( ˙ ω˙乁)',
        confirmText: '确认',
        cancelText: '取消'
      },
      onConfirm: (value, index, options) => { // 点击确定按钮时的回调函数
        if (index !== -1) {
          this.setData({
            liLvType: { 
              title: options[index].title, 
              value: Number(value)
            }
          })
        }
      },
    })
  },
  // 输入利率时触发
  inputLiLv(e) { 
    // console.log('onInputLiLv', this.data.liLvVal, e)
    var val = e.detail.value
    this.setData({
      liLvVal: val
    })
  },
  chooseStartDate(e) {
    // console.log('chooseStartDate', this.data.startDate, e)
    $wuxCalendar().open({
      value: this.data.startDate, // 默认时间选择值，默认值[]
      onChange: (values, displayValues) => { // 选择日期时的回调函数
        this.setData({
          startDate: displayValues,
        })
      },
    })
  },
  chooseEndDate(e) {
    // console.log('chooseEndDate', this.data.endDate, e)
    $wuxCalendar().open({
      value: this.data.endDate,
      onChange: (values, displayValues) => {
        this.setData({
          endDate: displayValues,
        })
      },
    })
  },
  // 选择计算公式时触发
  selectGongShiType(e) {
    // console.log('selectGongShiType', e.detail.value, e)
    this.setData({
      gongShiType: e.detail.value,
      days: '' // 间隔天数清零
    })
  },
  // 点击本金input的清除图标时触发
  clearLiLv(e) {
    // console.log('onClearLiLv', e)
    this.setData({
      liLvVal: ''
    })
  },
  // 点击利率input的清除图标时触发
  clearBenJin(e) {
    // console.log('onClearBenJin', e)
    this.setData({
      benJinVal: ''
    })
  },
  // 重置
  reset(e) {
    // console.log('reset', e)
    this.setData({
      benJinVal: '',
      liLvType: { title: '月利率', value: 2 },
      liLvVal: 2,
      startDate: [],
      endDate: [formatDate(new Date)],
      gongShiType: 1,
      days: '',
      result: ''
    })
  },
  // 计算利率
  calc(e) {
    // console.log('calc', e)
    var [benJinVal, liLvType, liLvVal, startDate, endDate, gongShiType] = [this.data.benJinVal, this.data.liLvType, this.data.liLvVal, this.data.startDate[0], this.data.endDate[0], this.data.gongShiType]

    if (isNumber(benJinVal)
      && isNumber(liLvVal)
      && startDate
      && endDate
      && toDate(endDate) - toDate(startDate)) {

      var days = 0
      if (gongShiType == 1) {
        // 本金 × (Δ年 x 年利率 + Δ月 x 月利率 + Δ日 x 日利率)
        // = 本金 × (((Δ年 x 12) + Δ月) x 30 + Δ日) x 日利率
        // = 本金 x “天数” x 日利率
        var [startY, startM, startD] = getYearMonthDay(startDate)
        var [endY, endM, endD] = getYearMonthDay(endDate)
        days = ((endY - startY) * 12 + endM - startM) * 30 + endD - startD
      } else if(gongShiType == 2) {
        // 本金 × 天数 × 日利率
        days = daysBetweenTwoDates(toDate(startDate), toDate(endDate))
        this.setData({
          days: days
        })
      }

      var result = 0
      switch (liLvType.value) {
        case 1: // 年利率
          result = benJinVal * days * liLvVal / 100 / 360
          break
        case 2: // 月利率
          result = benJinVal * days * liLvVal / 100 / 30
          break
        case 3: // 日利率
          result = benJinVal * days * liLvVal / 100
          break
      }
      this.setData({
        result: result.toFixed(2)
      })
    } else {
      //TODO:
    }
  }
 })
