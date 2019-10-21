<template>
  <div class="animated fadeIn">
    <b-row class="justify-content-center">
      <b-form>
        <h1>Test de Comandos</h1>
        <b-form-group>
            <b-input-group>
              <!-- Attach Left button -->
              <b-input-group-prepend>
                <b-button v-on:click="search(equipo_id)" variant="primary" :disabled="disabled==1?true:false">
                  <i class="fa fa-search"></i>Buscar 
                </b-button>
              </b-input-group-prepend>
              <b-form-input type="text" placeholder="EquipoID" v-model="equipo_id" name="equipo_id"></b-form-input>
              <b-col cols="6" sm="4" md="2" xl class="mb-3 mb-xl-0">
               <!-- <b-button block variant="outline-info" v-on:click="testEquipo(equipo_id)">Test</b-button>-->
              <b-button v-on:click="togglePress ?testEquipo(equipo_id):finalizarTest(equipo_id)" variant="outline-primary" :pressed.sync="togglePress">
                    Test {{togglePress ? 'Off ' : 'On'}}
                </b-button>
              </b-col>
            </b-input-group>
          </b-form-group>
      </b-form>
    </b-row>
    <b-row class="justify-content-center">
     <b-col sm="12" md="4">
        <transition name="fade" v-if="show">
          <b-card class="bg-secondary" no-body >
            <div slot="header">
              Informacion de equipos
              <div class="card-header-actions">
                <b-link href="#" class="card-header-action btn-setting">
                  <i class="icon-settings"></i>
                </b-link>
                <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
                  <i class="icon-arrow-up"></i>
                </b-link>
                <b-link href="#" class="card-header-action btn-close" >
                  <i class="icon-close"></i>
                </b-link>
              </div>
            </div>
            <b-collapse id="collapse1" visible>
              <b-card-body>
                {{mensajito}}
              </b-card-body>
            </b-collapse>
          </b-card>
        </transition>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
      <b-alert :show="dismissCountDown"
                       dismissible
                       variant="warning"
                       @dismissed="dismissCountdown=0"
                       @dismiss-count-down="countDownChanged">
                Espera un poco y deja de dar clicks!! <strong>{{dismissCountDown}}</strong> restan...
      </b-alert>
      <b-card header="Comandos">
        <b-table responsive  :items="comandos" :fields="fields" :current-page="currentPage" :per-page="perPage">
          <template slot="estado" slot-scope="comandos">
            <b-badge :variant="getBadge(comandos.item.estado)">{{comandos.item.estado}}</b-badge>
          </template>
        </b-table>
      </b-card>
      </b-col><!--/.col-->
    </b-row><!--/.row-->
    <b-row>
      <b-col>
      <b-card header="Entradas">
        <b-table responsive  :items="alarmas" :fields="fieldsAlarm" :current-page="currentPage" :per-page="perPage">
          <template slot="estado" slot-scope="comandos">
            <b-badge :variant="getBadge(alarmas.item.estado)">{{alarmas.item.estado}}</b-badge>
          </template>
        </b-table>
        
      </b-card>
      </b-col><!--/.col-->
    </b-row><!--/.row-->
  </div>

</template>

<script>
import Vue from 'vue';
import DataService from '../../services/DataService';
var comandos = [];
var alarmas  = [];
var trs=[];
var recargas=0; 
var equipo_id = 0;
var mensajito ='';
const dataservice = new DataService();

export default {
  name: 's3000',
  props: {
    caption: {
      type: String,
      default: 'Table'
    }
  },
  data () {
    return {
      loading: false,
      equipo_id: null,
      comandos:[],
      alarmas:[],
      trs:[],
      recargas:0,
      togglePress: false,
      mensajito:'',
      dismissSecs: 25,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      disabled:0,
      fields: [
        {
          key : 'tr_id',
          sortable: true
        },      
        {
          label: 'ComandoID',
          key : 'cmd_id'
        },
        {
          label: 'Comando',
          key : 'comando',
          sortable: true
        },
         {
          label: 'Valores',
          key : 'auxiliar'
        },
        {
          label: 'RTA',
          key : 'respuesta'
        },
        {
          key : 'estado',
          sortable: true
        },
        {
          label: 'Fecha',
          key : 'fecha_final',
          sortable: true
        },
        {
          label: 'prioridad',
          key : 'prioridad',
          sortable: true
        }
        
      ],
      currentPage: 1,
      perPage: 11,
      totalRows: 0,
      show: false,
      fieldsAlarm: [
        {
          key : 'tipo',
          sortable: true
        },
        {
          key : 'dominio',
        },
        {
          label: 'Fecha',
          key : 'fecha_alarma',
          sortable: true
        },      
      ],
    }
  },
   created () {
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
        if(result.status==200){
          this.comandos = result.data; 
          comandos=result.data;
          console.log(result.status);
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
    fetchAlarmas (equipo_id) {
      this.show = true;
      dataservice.getAlarmas(equipo_id).then( result => {
        this.alarmas = result.data; 
        alarmas=result.data;
      });  
      
    },
    getBadge (status) {
      return status === 'Ok' ? 'success'
        : status === 'En Espera' ? 'secondary'
          : status === 'En Proceso' ? 'warning'
            : status === 'Cancelado' ? 'danger' : 'primary'
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
