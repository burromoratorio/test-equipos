
import axios from 'axios';

export default class DataService {

  constructor() {
    this.baseUrl = 'http://code.siacseguridad.com/api/';
  }
  
  getComandos(equipo_id){
    const url = this.baseUrl+'comandos/'+equipo_id;
    return(axios.get(url));
  }
  getAlarmas(equipo_id){
    const url = this.baseUrl+'alarmas/'+equipo_id;
    return(axios.get(url));
  }
  testEquipo(equipo){
    const url = this.baseUrl+'comandos/test';
    console.log(equipo);
    return(axios.post(url,equipo,{ 'headers': { 'content-type': 'application/json' } }));
  }
  

  finalizarTest(equipo){
    const url = this.baseUrl+'test/finalizar/'+equipo;
    return(axios.post(url,{ 'headers': { 'content-type': 'application/json' } }));

  }
  getAnomalias(equipo_id){
    var endpoint='anomalias'
    if(equipo_id>0){
      endpoint += '/'+equipo_id;
    }
    const url = this.baseUrl+endpoint;
    return(axios.get(url));
  }
  resetearEquipo(movil_id){
    const url = this.baseUrl+'anomalias/resetear/'+movil_id;
    return(axios.post(url,{ 'headers': { 'content-type': 'application/json' } }));
  }

}
