<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Seleccion de menu</strong>  {{this.today}} 
        <div class="card-header-actions">
          <b-dropdown text="Elegir Semana" variant="primary" right >
            <b-dropdown-item @click="cargaSelectores($event)">Semana Actual</b-dropdown-item>
            <b-dropdown-item @click="cargaSelectores($event)">Semana Siguiente</b-dropdown-item>
          </b-dropdown>
        </div>
        
      </div>
      <b-row>
        <b-col sm="12">
          <b-row>
    <b-col sm="6" md="2">
        <b-card class="bg-secondary text-center"><blockquote class="card-blockquote"><p>Menus</p></blockquote></b-card>
    </b-col>
    <b-col sm="6" md="2">
        <b-card class="bg-secondary text-center"><blockquote class="card-blockquote"><p>Lunes</p></blockquote></b-card>
    </b-col>
    <b-col sm="6" md="2">
        <b-card class="bg-secondary text-center"><blockquote class="card-blockquote"><p>Martes</p></blockquote></b-card>
    </b-col>
    <b-col sm="6" md="2">
        <b-card class="bg-secondary text-center"><blockquote class="card-blockquote"><p>Miercoles</p></blockquote></b-card>
    </b-col>
    <b-col sm="6" md="2">
        <b-card class="bg-secondary text-center"><blockquote class="card-blockquote"><p>Jueves</p></blockquote></b-card>
    </b-col>
    <b-col sm="6" md="2">
        <b-card class="bg-secondary text-center"><blockquote class="card-blockquote"><p>Viernes</p></blockquote></b-card>
    </b-col>   
  </b-row>
  <b-row>
  <template> 
    <b-col sm="6" md="2">
        <b-card class="bg-success text-center">
          <blockquote class="card-blockquote">
            <p>Menu XL</p>
            
          </blockquote>
        </b-card>
      </b-col>   
    <b-col v-for="xl in this.xl" :key="xl.comida_id" sm="6" md="2">
        <b-card class="card-accent-info" no-body v-if="show">
        <div slot="header" >
          <b-form-checkbox-group id="xlCheckboxes" name="Checkboxes" :checked="pedidos">
            <b-form-checkbox v-model="pedidos" :id="xl.comida_id" :value="xl"></b-form-checkbox>
          </b-form-checkbox-group>
         <!-- <div v-if="xl.checker==='yes'">
            <input type="checkbox" checked v-model="pedidos" :id="xl.comida_id" :value="xl" @change="actualizar($event)">
          </div>
          <div v-else>
           lalala
          </div>
          -->
          <!--

            <c-switch v-if='xl.checker=="yes"' checked class="mx-1" color="primary" @change="actualizar" :id="xl.comida_id" :value="xl" />-->
          <!--<c-switch v-else class="mx-1" color="primary" @change="actualizar" :id="xl.comida_id" :value="xl" />-->
        </div>
        <b-card-body>
        {{xl.comida}}-{{xl.checker}}
        </b-card-body>
        </b-card>
    </b-col>      
  </template>
  </b-row>
   <!--regular -->
   <b-row>
  <template> 
    <b-col sm="6" md="2">
        <b-card class="bg-warning text-center">
          <blockquote class="card-blockquote">
            <p>Menu Regular</p>
            
          </blockquote>
        </b-card>
      </b-col>   
    <b-col v-for="regular in this.regular"  :key="regular.comida_id" sm="6" md="2">
        <b-card class="card-accent-info" no-body v-if="show">
        <div slot="header" >
          <b-form-checkbox-group id="regularCheckboxes" name="Checkboxes" :checked="pedidos">
            <b-form-checkbox v-model="pedidos" :id="regular.comida_id" :value="regular"></b-form-checkbox>
          </b-form-checkbox-group>
        </div>
        <b-card-body>
        {{regular.comida}}-{{regular.checker}}
        </b-card-body>
        </b-card>
    </b-col>      
  </template>
  </b-row>
  <!-- Liviano-->
  <b-row>
  <template> 
    <b-col sm="6" md="2">
        <b-card class="bg-success text-center">
          <blockquote class="card-blockquote">
            <p>Menu Liviano</p>
            
          </blockquote>
        </b-card>
      </b-col>   
    <b-col v-for="liviano in this.liviano"  :key="liviano.comida_id" sm="6" md="2">
        <b-card class="card-accent-info" no-body v-if="show">
        <div slot="header" >
          <b-form-checkbox-group id="livianoCheckboxes" name="Checkboxes" :checked="pedidos">
            <b-form-checkbox v-model="pedidos" :id="liviano.comida_id" :value="liviano"></b-form-checkbox>
          </b-form-checkbox-group>
        </div>
        <b-card-body>
        {{liviano.comida}}-{{liviano.checker}}
        </b-card-body>
        </b-card>
    </b-col>      
  </template>
  </b-row>
  <!-- Ensalada-->
  <b-row>
  <template> 
    <b-col sm="6" md="2">
        <b-card class="bg-warning text-center">
          <blockquote class="card-blockquote">
            <p>Ensaladas</p>
            
          </blockquote>
        </b-card>
      </b-col>   
    <b-col v-for="ensalada in this.ensalada"  :key="ensalada.comida_id" sm="6" md="2">
        <b-card class="card-accent-info" no-body v-if="show">
        <div slot="header" >
         <b-form-checkbox-group id="ensaladaCheckboxes" name="Checkboxes" :checked="pedidos">
            <b-form-checkbox v-model="pedidos" :id="ensalada.comida_id" :value="ensalada"></b-form-checkbox>
          </b-form-checkbox-group>
        </div>
        <b-card-body>
        {{ensalada.comida}}-{{ensalada.checker}}
        </b-card-body>
        </b-card>
    </b-col>      
  </template>
  </b-row>
        </b-col>
      </b-row>
      <div slot="footer">
        <b-button block variant="success" @click="guardarPedidos">Guardar</b-button>
      </div>
    </b-card>
  
  </div>
</template>

<script>
import Vue from 'vue';
import { Switch as cSwitch } from '@coreui/vue'
import DataService from '../../services/DataService';
import Helpers from '../../services/Helpers';
var xl = [];
var regular  = [];
var liviano=[];
var ensalada=[];
var today = new Date();
var pedidos=[];
var mensajito ='';
const dataservice = new DataService();
const helpers = new Helpers();
export default {
  name: 'menuDiario',
  components:{cSwitch},
  props: {
    caption: {
      type: String,
      default: 'Table'
    }
  },
  data () {
    return {
      show:true,
      today : helpers.getDate(),
      loading: false,
      equipo_id: null,
      xl:[
      { fecha: 'Lunes',comida: 'Hamburguesas', comida_id: '1',checker: 'yes'},
      { fecha: 'Martes',comida: 'Sorrentinos', comida_id:'2',checker: 'no'},
      { fecha: 'Miercoles',comida: 'Asado', comida_id:'3',checker: 'no'},
      { fecha: 'Jueves',comida: 'Pizza', comida_id:'4',checker: 'no'},
      { fecha: 'Viernes',comida: 'Choripan', comida_id:'5',checker: 'no-body'}],
      regular:[
      { fecha: 'Lunes',comida: 'Tarta Jamon y Queso', comida_id: '6',checker: 'no'},
      { fecha: 'Martes',comida: 'Rissoto', comida_id:'7',checker: 'yes'},
      { fecha: 'Miercoles',comida: 'Bife con Arroz', comida_id:'8',checker: 'no'},
      { fecha: 'Jueves',comida: 'Fideos con Crema', comida_id:'9',checker: 'yes'},
      { fecha: 'Viernes',comida: 'Empanadas', comida_id:'10',checker: 'yes'}],
      liviano:[
      { fecha: 'Lunes',comida: 'Pascualina', comida_id: '11',checker: 'no'},
      { fecha: 'Martes',comida: 'Sopa', comida_id:'12',checker: 'no'},
      { fecha: 'Miercoles',comida: 'Arroz al Wok', comida_id:'13',checker: 'no'},
      { fecha: 'Jueves',comida: 'Zapallitos Revueltos', comida_id:'14',checker: 'no'},
      { fecha: 'Viernes',comida: 'Merluza con Ensalada', comida_id:'15',checker: 'no'}],
      ensalada:[
      { fecha: 'Lunes',comida: 'Ensalada Mixta', comida_id: '16',checker: 'no'},
      { fecha: 'Martes',comida: 'Ensalda Rusa', comida_id:'17',checker: 'no'},
      { fecha: 'Miercoles',comida: 'Ensalda Caesar', comida_id:'18',checker: 'yes'},
      { fecha: 'Jueves',comida: 'Ensalada vegana', comida_id:'19',checker: 'no'},
      { fecha: 'Viernes',comida: 'Ensalada de Carne', comida_id:'20',checker: 'no'}],
      pedidos:[],
      togglePress: false,
      mensajito:'',
      disabled:0,
      
    }
  },
  created: function () {
    // `this` hace referencia a la instancia vm
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
   //this.search(equipo_id);
  },
  methods: {
    fetchData (equipo_id) {
      this.show = true;
      dataservice.getComandos(equipo_id).then( result => {
        if(result.tipo==200){
          this.comandos = result.data; 
          comandos=result.data;
          console.log(result.tipo);
        }
      },
      (error) => {
        this.showAlert();
        this.disabled=1;
      }
      ).then(()=>{
        if(comandos.length>0){
          this.mensajito= 'Test en equipo: '+ equipo_id+ ' en proceso...';
        }else{
          this.mensajito= 'No se encontraron Datos';
        }
      }); 
      
    },
    cargaSelectores($evt){
      helpers.get_start_end_week()
      helpers.get_next_week_start();
      //xl
      for (var pedido in this.xl) {
        if(this.xl[pedido].checker=='yes'){
          this.pedidos.push(this.xl[pedido]);
        }
      }
      //regular
      for (var pedido in this.regular) {
        if(this.regular[pedido].checker=='yes'){
          this.pedidos.push(this.regular[pedido]);
        }
      }
      //liviano
      for (var pedido in this.liviano) {
        if(this.liviano[pedido].checker=='yes'){
          this.pedidos.push(this.liviano[pedido]);
        }
      }
      //ensalada
      for (var pedido in this.ensalada) {
        if(this.ensalada[pedido].checker=='yes'){
          this.pedidos.push(this.ensalada[pedido]);
        }
      }
    },
    actualizar(evt){
      console.log(evt);
     /*evt.value
      if(evt){
        alert(evt.comida+'--'+evt.checker);
        this.pedidos.push(evt);
      }else{
        this.pedidos.push(evt);
        
      }*/
      
    },
    guardarPedidos(){
      var idEmpleado = this.$route.params.id;
      alert(idEmpleado);
      for (var pedido in this.pedidos) {
          alert(this.pedidos[pedido].comida+'--'+this.pedidos[pedido].checker);
      }
      
    },
    fetchAlarmas (equipo_id) {
      this.show = true;
      dataservice.getAlarmas(equipo_id).then( result => {
        this.alarmas = result.data; 
        alarmas=result.data;
      });  
      
    },
    getBadge (tipo) {
      return tipo === 'MenuXL' ? 'warning'
        : tipo === 'Regular' ? 'success'
          : tipo === 'Liviano' ? 'warning'
            : tipo === 'Ensalada' ? 'success' : 'warning'
    },
    getRowCount (items) {
      return items.length
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
      if(dismissCountDown==1){
        this.disabled=0;
        console.log(this.disabled);
      }
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    search(equipo_id){
      this.fetchData(equipo_id);
      this.fetchAlarmas (equipo_id);
    },
    testEquipo(equipo_id){
      dataservice.testEquipo({id:equipo_id}).then(()=>{
        this.fetchData(equipo_id);
        this.mensajito= 'Test en equipo: '+ equipo_id+ ' en proceso...';
        
      });

    },
    finalizarTest(modem_id){
      /*dataservice.finalizarTest(modem_id).then(()=>{
        this.fetchData(modem_id);
        mensajito= result;
      });
      console.log(modem_id);*/

      dataservice.finalizarTest(modem_id).then( result => {
        this.mensajito= result.data;
      }).then(()=>{
        this.fetchData(modem_id);
      });



    },
    recargaConstante(comandos){
      var trs = [];
      var sResp = 0;
      comandos.map(myFunction);
      function myFunction(item, index) {
        if(!item.respuesta)sResp++
        trs.push(item.tr_id);
      }
      this.recargas = sResp;
      this.trs      = trs;
      console.log(this.recargas);
      
    }
    
  }
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
</script>
<style scoped>
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
