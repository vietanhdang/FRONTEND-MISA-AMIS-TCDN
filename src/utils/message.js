// define message code and message text

export default (res, message) => {
  let messageCode = res.response.data.messageCode;
  var messageText = "";
  switch (messageCode) {
    case "e001":
      messageText = "This is message 0001";
      break;
    case "e002":
      messageText = "This is message 0002";
      break;
    case "e003":
      messageText = `Mã nhân viên ${message} đã tồn tại trong hệ thống`;
      break;
  }
  return messageText;
};
