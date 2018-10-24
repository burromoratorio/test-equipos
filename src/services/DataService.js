
import axios from 'axios';

export default class DataService {

  constructor() {
    this.baseUrl = 'http://code.siacseguridad.com/api/';
  }
  
  getComandos(equipo_id){
    const url = this.baseUrl+'comandos/'+equipo_id;
    return(axios.get(url));
  }
  testEquipo(equipo){
    const url = this.baseUrl+'comandos/test';
    console.log(equipo);
    return(axios.post(url,equipo,{ 'headers': { 'content-type': 'application/json' } }));
  }
  

  createEquipo(lote, token){
    const url = this.baseUrl+'equipos';
    return(axios.post(url, lote, { 'headers': { 'Authorization': 'Bearer '+token } }));
  }
  

}
