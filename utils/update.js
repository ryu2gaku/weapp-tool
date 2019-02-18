/**
 * @overview 版本更新
 */

// 获取全局唯一的版本更新管理器
const updateManager = wx.getUpdateManager()

/**
 * 实现版本更新
 */
const versionUpdate = () => {
  // 当向微信后台请求完新版本信息，会进行回调
  updateManager.onCheckForUpdate((res) => {
    // 是否有新的版本
    if (res.hasUpdate) {
      // 当新版本下载完成，会进行回调
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好（即收到 onUpdateReady 回调），可强制重启小程序并应用上最新版本
              updateManager.applyUpdate()
            }
          }
        })
      })

      // 当新版本下载失败，会进行回调
      updateManager.onUpdateFailed(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本下载失败',
          showCancel: false
        })
      })
    }
  })
}

module.exports = {
  versionUpdate
}
