export default class Helpers {
  get_start_end_week(inicio){
    var rango = [];
    var dt = new Date(); // current date of week
    if(inicio==""){
      var dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()+(8 - dt.getDay()));//next week start
    }
    var currentWeekDay = dt.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
    var wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
    var wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));
    rango.push(this.formatDate(wkStart,'ddbb'));
    rango.push(this.formatDate(wkEnd,'ddbb'));
    return rango;
  }
  get_next_week_start() {
    var now = new Date();
    var next_week_start = new Date(now.getFullYear(), now.getMonth(), now.getDate()+(8 - now.getDay()));
    return next_week_start;//this.formatDate(next_week_start,'ddbb');
  }
  formatDate(dia,tipo){
    var dd = String(dia.getDate()).padStart(2, '0');
    var mm = String(dia.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dia.getFullYear();
    if(tipo=='ddbb'){
      var formatedDate = yyyy + '-' + mm + '-' + dd;
    }else{
      var formatedDate = dd + '/' + mm + '/' + yyyy;
    }
    
    return formatedDate;
  }
  /*getDate(){
    var today = this.formatDate(new Date());
    return today;
  }*/
}