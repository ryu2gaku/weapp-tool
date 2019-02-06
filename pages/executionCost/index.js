import { isNumber } from '../../utils/common.js'

Page({

  data: {
    result: '',
    switchVal: false
  },

  // 键盘输入时触发	
  onInput(e) {
    // console.log('onInput', e)
    var val = e.detail.value
    if (isNumber(val)) {
      this.setData({
        result: calc(val).toFixed(2)
      })
    }
  },
  // 点击清除图标时触发	
  onClear(e) {
    // console.log('onClear', e)
    this.setData({
      result: ''
    })
  },
  // 滑动开关时触发
  switchChange(e) {
    // console.log('switchChange', e)
    this.setData({
      switchVal: e.detail.value
    })
  }
})

/**
 * 计算执行费
 */
const calc = val => {
  if (val <= 10000) {
    return 50
  } else if (val <= 500000) {
    return val * 0.015 - 100
  } else if (val <= 5000000) {
    return val * 0.01 + 2400
  } else if (val <= 10000000) {
    return val * 0.005 + 27400
  } else {
    return val * 0.001 + 67400
  }
}