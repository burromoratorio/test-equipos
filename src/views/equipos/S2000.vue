<template>
  <div class="animated fadeIn">
    <b-row class="justify-content-center">
      <b-form>
        <h1>Test de Comandos</h1>
        <b-form-group>
            <b-input-group>
              <!-- Attach Left button -->
              <b-input-group-prepend>
                <b-button v-on:click="search(equipo_id)" variant="primary">
                  <i class="fa fa-search"></i> Search
                </b-button>
              </b-input-group-prepend>
              <b-form-input type="text" placeholder="EquipoID" v-model="equipo_id" name="equipo_id"></b-form-input>
              <b-col cols="6" sm="4" md="2" xl class="mb-3 mb-xl-0">
                <b-button block variant="outline-info" v-on:click="testEquipo(equipo_id)">Test</b-button>
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
              Card with header actions
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
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </b-card-body>
            </b-collapse>
          </b-card>
        </transition>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
      <b-card :header="caption">
        <b-table small  :items="comandos" :fields="fields" :current-page="currentPage" :per-page="perPage"></b-table>
        <nav>
         <b-pagination :total-rows="getRowCount(comandos)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
      </b-card>
      </b-col><!--/.col-->
    </b-row><!--/.row-->

  </div>

</template>

<script>
import Vue from 'vue';
import DataService from '../../services/DataService';
var comandos = [];
var trs=[];
var recargas=0; 
var equipo_id = '7702';
const dataservice = new DataService();

export default {
  name: 's2000',
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
      trs:[],
      recargas:0,
      fields: [
        {
          key : 'tr_id',
          sortable: true
        },      
        {
          label: 'Usuario',
          key : 'usuario'
        },
        {
          key : 'estado',
          sortable: true
        },
        {
          label: 'ComandoID',
          key : 'cmd_id'
        },
        {
          label: 'Valores',
          key : 'auxiliar'
        },
        {
          label: 'Comando',
          key : 'comando',
          sortable: true
        },
        {
          label: 'RTA',
          key : 'respuesta'
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
        },
        {
          label: 'Estacion',
          key : 'nombre_estacion'
        }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      show: false,
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
        this.comandos = result.data; 
      }).then(()=>{
       this.recargaConstante(this.comandos);
      });  
      
    },
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (comandos) {
      return comandos.length
    },
    search(equipo_id){
      this.fetchData(equipo_id);
    },
    testEquipo(equipo_id){
      dataservice.testEquipo({id:equipo_id}).then(()=>{
        this.fetchData(equipo_id);
        /*setTimeout(function run() {
            console.log("d");
            setTimeout(run, 1000);
          }, 1000);*/
        //this.$router.push({ path: '../equipos/lista/'});
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
      //this.fetchData(this.trs);
      /*if(this.recargas>0){
          console.log("quedan : "+this.recargas+ " sin respuestas");
          console.log(new Date());
          this.trs.map(myFunction);
          function myFunction(item, index) {
            console.log(item);
            
          }
          var i=0;
          do {
            i += 1;
            console.log(i);
            this.search(equipo_id);
            sleep(150000) ;
          } while (i < this.recargas);
        }else{
          console.log("no hay comandos no itero un choto");
        }*/
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
