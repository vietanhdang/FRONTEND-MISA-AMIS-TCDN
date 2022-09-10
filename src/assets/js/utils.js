const Utils = {
  /**
   * Định dạng số tiền VND
   * @param {any} date
   * @returns
   */
  formatCurrencyToString: (value) => {
    if (value) {
      return parseInt(value).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    }
  },
  formatCurrency: (number) => {
    return new Intl.NumberFormat("vi-IN", {
      maximumSignificantDigits: 3,
    }).format(number);
  },
  formatCurrencyToInt: (value) => {
    if (value) {
      value = value.replace(/[^0-9]/g, "");
      return parseInt(value);
    } else {
      return value;
    }
  },
  // format date day/month/year
  formatDate: (date) => {
    if (date) {
      return date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      });
    } else {
      return date;
    }
  },
  /**
   *
   * @param {*} date
   * @returns
   */
  formatDateMonthYear: (date) => {
    if (date) {
      date = new Date(date);
      let day = date.getDate();
      day = day < 10 ? "0" + day : day;
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      return date;
    }
  },
  formatYearMonthDay: (date) => {
    if (date) {
      return date.split("T")[0];
    } else {
      return date;
    }
  },
  validateEmail: (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  validatePhone: (phone) => {
    const re = /^[0-9]{10,11}$/;
    return re.test(String(phone));
  },
};
