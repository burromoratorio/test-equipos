
import axios from 'axios';

export default class DataService {

  constructor() {
    this.baseUrl = 'http://code.siacseguridad.com/api/';
  }
  
  getComandos(equipo_id){
    const url = this.baseUrl+'comandos/'+equipo_id;
    return(axios.get(url));
  }
  createLote(lote){
    const url = this.baseUrl+'lotes';
    return(axios.post(url, lote));
  }
  deleteLote(id){
    const url = this.baseUrl+'lotes/'+id;
    return(axios.delete(url));
  }

  getEquipos(page, size, token){
    const url = this.baseUrl+'equipos?page_size='+size+'&page='+page;
    return(axios.get(url, { 'headers': { 'Authorization': 'Bearer '+token } }));
  }

  getEventos(id){
    const url = this.baseUrl+'eventos_equipos?equipo='+id;
    return(axios.get(url));
  }

  getVersiones(){
    const url = this.baseUrl+'versioneshard';
    return(axios.get(url));
  }

  getEquipo(id){
    const url = this.baseUrl+'equipos/'+id;
    return(axios.get(url));
  }

  createEquipo(lote, token){
    const url = this.baseUrl+'equipos';
    return(axios.post(url, lote, { 'headers': { 'Authorization': 'Bearer '+token } }));
  }
  deleteEquipo(id){
    const url = this.baseUrl+'equipos/'+id;
    return(axios.delete(url));
  }

  updateEquipo(id, equipo, token){
    const url = this.baseUrl+'equipos-estado-update/'+id;
    return(axios.put(url, equipo, { 'headers': { 'Authorization': 'Bearer '+token } }));
  }

  getFirmwareVersions(tipo){
    const url = this.baseUrl+'versionesfirm?TipoEquipo='+tipo;
    return(axios.get(url));
  }

  createLineas(lineas, token){
    const url = this.baseUrl+'lineas_create';
    return(axios.post(url, lineas, { 'headers': { 'Authorization': 'Bearer '+token } }));
  }
  createChofer(chofer, token){
    const url = this.baseUrl+'chofer';
    return(axios.post(url, chofer, { 'headers': { 'Authorization': 'Bearer '+token } }));
  }

  getChoferes(page, size, token){
    const url = this.baseUrl+'chofer?page_size='+size+'&page='+page;
    return(axios.get(url, { 'headers': { 'Authorization': 'Bearer '+token } }));
  }
  getChofer(id){
    const url = this.baseUrl+'chofer/'+id;
    return(axios.get(url));
  }

}
