export default class Helpers {
  get_start_end_week(){
    var dt = new Date(); // current date of week
    var currentWeekDay = dt.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
    var wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
    var wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));
    alert(wkStart);
    alert(wkEnd);
  }
  get_next_week_start() {
    var now = new Date();
    var next_week_start = new Date(now.getFullYear(), now.getMonth(), now.getDate()+(8 - now.getDay()));
    alert(next_week_start);
  }
  getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today;
  }
}