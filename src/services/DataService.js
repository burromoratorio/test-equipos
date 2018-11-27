
import axios from 'axios';

export default class DataService {

  constructor() {
    this.baseUrl = 'http://code.siacseguridad.com:8080/api/';
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
  

}
