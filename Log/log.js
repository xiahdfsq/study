/**
 * @Description 日志系统
 *  本系统不仅仅是监听系统异常，也包括其他必要的日志
 *
 * 属性说明
 * @Param logNode Dom 日志操作界面
 */

class Reporter {
  /**
   * @Function 构造器
   * @Param option function 异常回调
   */
  constructor(_option) {
    // 操作界面
    let innerHtml =
      '<div style="padding: 10px;background: #fff;position: absolute;width: 90%;top: 34%;z-index:999;">' + '<div style="text-align: center;padding: 5px;line-height: 2em;border-bottom: 1px solid #ccc;position: relative;">' + '<div>日志系统</div>' + '<div id="log_close" style="position: absolute;right: 10px;top: 5px;color: #999;">关闭</div>' + '</div>' + '<div style="padding: 5px;">' + '<div style="display: flex;">' + '<span>Inspect:</span>' + '<div style="flex: 1;padding: 0 10px;">' + '<input id="log_server" type="text" style="width: 95%;" />' + '</div>' + '<a id="log_inspect" style="width: 80px;text-align: center;background: #44f;border-radius: 3px;color: #fff;">Add</a>' + '</div>' + '</div>' + '</div>',
      option = _option || {},
      logNode = document.createElement("div"),
      devMod = option.devMod || true,
      inspected = option.inspected || true,
      thisTmp = this

    logNode.style.display = "none"
    logNode.innerHTML = innerHtml
    document.body.appendChild(logNode)
    this.logNode = logNode

    // 事件
    document.getElementById("log_close").addEventListener("click", () => {
      thisTmp.closePop()
    }, false);

    document.getElementById("log_inspect").addEventListener("click", function () {
      if (thisTmp.inspected) {
        thisTmp.removeInspect()
      } else {
        thisTmp.server = document.getElementById("log_server").value
        thisTmp.openInspect()
      }
    }, false);

    devMod && this.openDev()
  }

  /**
   * @Function 发送日志
   * @Param log object 日志信息
   */
  send(log) {
    console.log(log.name)
    console.log(log.stack)
    console.log(log.message)
  }

  // 启动监听
  listen() {
    console.log("启动监听")

    // 关闭监听
    this.stop = () => {}
  }

  // 查看日志
  view() {
    console.log("查看日志")
    this.logNode.style.display = "block"
    if (this.inspected) {
      document.getElementById("log_inspect").innerHTML = "Remove"
    } else {
      document.getElementById("log_inspect").innerHTML = "Add"
    }
  }

  // 关闭查看窗口
  closePop() {
    console.log("关闭查看窗口")
    this.logNode.style.display = "none"
  }

  // 开启开发模式
  openDev() {
    let log = this,
      times = 0,
      timer

    function bodyhandle(event) {
      times++;
      if (times > 5) {
        log.view()
      }

      if (!timer) {
        timer = window.setTimeout(() => {
          times = 0
          clearTimeout(timer)
          timer = null
        }, 1000)
      }
    }
    document.body.addEventListener('click', bodyhandle, false)

    // 关闭开发模式
    this.closeDev = () => {
      document.body.removeEventListener("click", bodyhandle, false);
    }
  }

  // 打开inspect
  openInspect() {
    if (!this.server) {
      return
    }

    let scriptNode = document.createElement("script")
    scriptNode.src = this.server + "/target/target-script-min.js#anonymous"
    document.body.appendChild(scriptNode)
    this.closePop()
    this.inspected = true;

    // 移除inspect
    this.removeInspect = () => {
      scriptNode.remove()
      this.inspected = false;
      document.getElementById("log_inspect").innerHTML = "Add"
    }
  }
}

export default Reporter