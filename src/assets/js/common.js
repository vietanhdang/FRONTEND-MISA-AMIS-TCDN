var common = {
  test() {
    this.dialogConfirm(
      "Xóa nhân viên 1",
      "Bạn có chắc chắn muốn xóa nhân viên này?",
      "danger",
      "Xóa",
      "Hủy"
    );
  },
  /**
   * Show dialog with message
   * @param {message} message - message to show
   *
   */
  dialogConfirm(message) {
    let type = {
      warning: "info",
      danger: "danger",
    };
    try {
      let _default = {
        msg: "This is a dialog confirm",
        type: "danger",
        btnYes: "",
        btnNo: "",
        btnCancel: "",
      };
      _default = Object.assign(_default, message);
      const idRandom = Math.random().toString(36).substring(7);
      let dialogHTML = $(`
              <div class="dialog" style="display: block;">
              <div class="dialog__modal dialog__modal__popup">
                  <div class="dialog__body dialog__body__popup">
                      <div class="dialog__body--icon">
                          <div class="icon-${type[_default.type]}"></div>
                      </div>
                      <div class="dialog__body--text">
                               ${_default.msg}
                      </div>
                  </div>
                  <div class="body-line"></div>
                  <div class="dialog__footer">
                      <div class="dialog__footer__left">
                          ${_default.btnCancel ? `<button class="btn btn-hover-focus-secondary btn-close-${idRandom}">Hủy</button>` : ""}
                      </div>
                      <div class="dialog__footer__right">
                          ${_default.btnNo ? `<button class="btn btn-hover-focus-secondary btn-no-${idRandom}">Không</button>` : ""}
                          ${_default.btnYes ? `<button class="btn btn-hover-focus-success btn-yes-${idRandom}">Có</button>` : ""}
                      </div>
                  </div>
              </div>
          </div>
              `);
      $("body").append(dialogHTML);
      dialogHTML.fadeIn();
      var promise = new Promise((resolve) => {
        $("html").on("click", `.btn-close-${idRandom}`, function () {
          dialogHTML.fadeOut().remove();
          resolve('close');
        });
        $("html").on("click", `.btn-yes-${idRandom}`, function () {
          dialogHTML.fadeOut().remove();
          resolve('yes');
        });
        $("html").on("click", `.btn-no-${idRandom}`, function () {
          dialogHTML.fadeOut().remove();
          resolve('no');
        });
      });
      return promise;
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Show Toast message
   * @param {message} message - message to show
   */
  toast(message) {
    let _default = {
      description: "Toast success",
      type: "success",
      duration: 3000,
    };
    _default = Object.assign(_default, message);
    const bg = {
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger",
    };
    const icon = {
      success: "fa-regular fa-check",
      warning: "fa-regular fa-exclamation",
      danger: "fa-regular fa-triangle-exclamation",
    };
    const text = {
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
    };
    const html = `
        <div class="toast" style="animation: slideIn ease 1s, fadeOut linear 1s ${
          _default.duration / 1000
        }s forwards;">
                <div class="toast__icon ${
                  bg[_default.type]
                } text-white"><i class="${icon[_default.type]}"></i>
                </div>
                <div class="toast__text">${_default.description}</div>
                <div class="toast__button ${
                  text[_default.type]
                }"><i class="fa-solid fa-xmark"></i></div>
        </div>
    `;
    const toast_wrapper = $("#toast-wrapper");
    if (toast_wrapper.length === 0) {
      $("body").append(`<div id="toast-wrapper">${html}</div>`);
    } else {
      toast_wrapper.append(html);
    }
    setTimeout(() => {
      $("#toast-wrapper").children().first().remove();
    }, _default.duration + 2000);
  },
};
