/**
 * 检测值是否为数值
 */
//【拓展】❶ ^ 匹配开始位置 ❷ $ 匹配结束位置 ❸ * 匹配前项0次或多次 ❹ + 匹配前项1次或多次 ❺ ?匹配前项0次或1次
const isNumber = valStr => /^[0-9]+\.?[0-9]*$/.test(valStr) ? true : false

/**
 * 格式化 Date 为字符串
 * @param {Date} date
 * @return  {string} 格式为`年-月-日`
 */
const formatDate = date => {
  //【拓展】Array.prototype.map(cb) 对数组的每个元素调用定义的回调函数并返回包含结果的数组
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join('-')
} 

/**
 * 字符串转化为 Date
 * @param {string} dateStr 格式为`年-月-日`
 * @return  {?Date}
 */
const toDate = dateStr => {
  if (/^\d{1,4}-\d{1,2}-\d{1,2}$/.test(dateStr)) {
    //【拓展】RegExp.prototype.test(str) 用来查看正则表达式与指定的字符串是否匹配，返回true或false
    var [year, month, day] = dateStr.split('-')
    return new Date(year, month - 1, day)
  } else {
    return null
  }
}

/**
 * 获取当前日期的年月日信息
 * @param {Date|string} date Date对象或格式为`年-月-日`的日期字符串
 * @return  {Array.<string>} 格式为 `[年,月,日]`
 */
const getYearMonthDay = date => {
  if (Object.prototype.toString.call(date) == "[object Date]") {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  } else {
    return [toDate(date).getFullYear(), toDate(date).getMonth() + 1, toDate(date).getDate()]
  }
}

/**
 * 两个 Date 之间间隔的天数
 * @param {Date} startDate 起始日期
 * @param {Date} endDate 截至日期
 * @return  {number} 间隔的天数
 */
const daysBetweenTwoDates = (startDate, endDate) => Math.round((Date.parse(endDate) - Date.parse(startDate)) / 1000 / 60 / 60 / 24)

module.exports = {
  isNumber,
  formatDate,
  toDate,
  getYearMonthDay,
  daysBetweenTwoDates
}