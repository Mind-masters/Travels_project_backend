class Helpers {
 static async checkDate(last_in_logged) {
    const current_year = new Date().getFullYear();
    const current_month = new Date().getMonth() + 1;
    const current_day = new Date().getDate();
    if (current_year === last_in_logged.getFullYear()) {
      if (current_month === last_in_logged.getMonth()) {
        if (current_day > last_in_logged.getDate()) {
          return true;
        }
        return false;
      } else {
        if (current_day <= last_in_logged.getDate()) {
          return false;
        }
        return true;
      }
    }
  }
}

module.exports = Helpers;
