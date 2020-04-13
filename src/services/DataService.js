
import axios from 'axios';

export default class DataService {

  constructor() {
    this.baseUrl = 'http://code.siacseguridad.com:8080/api/';
  }
  getMenu(tipo,usuario_id,inicio,fin){
    const url = this.baseUrl+tipo+'/';
    return(axios.post(url,{'usuario_id': usuario_id,'inicio':inicio,'fin': fin},
                      { 'headers': { 'content-type': 'application/json' } }));
  }
  getXl(inicio,fin,usuario_id){
    const url = this.baseUrl+'xl/';
    var xl = [
                    { fecha: 'Lunes',comida: 'Hamburguesas', comida_id: '1',checker: 'yes'},
                    { fecha: 'Martes',comida: 'Sorrentinos', comida_id:'2',checker: 'no'},
                    { fecha: 'Miercoles',comida: 'Asado', comida_id:'3',checker: 'no'},
                    { fecha: 'Jueves',comida: 'Pizza', comida_id:'4',checker: 'no'},
                    { fecha: 'Viernes',comida: 'Choripan', comida_id:'5',checker: 'no-body'}];
    return xl;
  }
  getRegular(inicio,fin,usuario_id){
    var regular =[
      { fecha: 'Lunes',comida: 'Tarta Jamon y Queso', comida_id: '6',checker: 'no'},
      { fecha: 'Martes',comida: 'Rissoto', comida_id:'7',checker: 'yes'},
      { fecha: 'Miercoles',comida: 'Bife con Arroz', comida_id:'8',checker: 'no'},
      { fecha: 'Jueves',comida: 'Fideos con Crema', comida_id:'9',checker: 'yes'},
      { fecha: 'Viernes',comida: 'Empanadas', comida_id:'10',checker: 'yes'}]
    return regular;
  }
  getLiviano(inicio,fin,usuario_id){
    var liviano =[
      { fecha: 'Lunes',comida: 'Pascualina', comida_id: '11',checker: 'no'},
      { fecha: 'Martes',comida: 'Sopa', comida_id:'12',checker: 'no'},
      { fecha: 'Miercoles',comida: 'Arroz al Wok', comida_id:'13',checker: 'no'},
      { fecha: 'Jueves',comida: 'Zapallitos Revueltos', comida_id:'14',checker: 'no'},
      { fecha: 'Viernes',comida: 'Merluza con Ensalada', comida_id:'15',checker: 'no'}]
    return liviano;
  }
  getEnsalada(inicio,fin,usuario_id){
    var ensalada =[
      { fecha: 'Lunes',comida: 'Ensalada Mixta', comida_id: '16',checker: 'no'},
      { fecha: 'Martes',comida: 'Ensalda Rusa', comida_id:'17',checker: 'no'},
      { fecha: 'Miercoles',comida: 'Ensalda Caesar', comida_id:'18',checker: 'yes'},
      { fecha: 'Jueves',comida: 'Ensalada vegana', comida_id:'19',checker: 'no'},
      { fecha: 'Viernes',comida: 'Ensalada de Carne', comida_id:'20',checker: 'no'}]
    return ensalada;
  }
  guardarPedido(usuario_id,comidas){
    const url = this.baseUrl+'pedidos/guardar/'+usuario_id;
    let arrOfObj =comidas;
    axios.post(url,arrOfObj,{ 'headers': { 'content-type': 'application/json' } });
    
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
