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
            </b-input-group>
          </b-form-group>
      </b-form>
    </b-row>
    <b-row class="justify-content-center">
     <b-col sm="12" md="4">
        <transition name="fade">
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
//import correntintable from '../../components/Correntintable.js'
//import buttoncounter from '../../components/globalTable.js'
//import correntintable from '../../components/CorrentinTable.vue'
import Vue from 'vue';
import DataService from '../../services/DataService';
var comandos = [];
var equipo_id = '7702';
const dataservice = new DataService();

export default {
  name: 's2000',
  //components: {correntintable,buttoncounter},
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
      fields: [
        {
          key : 'tr_id',
          sortable: true
        },      
        {
          label: 'Usuario',
          key : 'usuario',
          sortable: true
        },
        {
          key : 'estado',
          sortable: true
        },
        {
          label: 'ComandoID',
          key : 'cmd_id',
          sortable: true
        },
        {
          label: 'Valores',
          key : 'auxiliar',
          sortable: true
        },
        {
          label: 'Comando',
          key : 'comando',
          sortable: true
        },
        {
          label: 'RTA',
          key : 'respuesta',
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
        },
        {
          label: 'Estacion',
          key : 'nombre_estacion',
          sortable: true
        }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0
    }
  },
   created (equipo_id) {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData(equipo_id)
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData (equipo_id) {
      this.loading = true;
      dataservice.getComandos(equipo_id).then( result => {
        console.log(result.data);
        //sleep(500);
        this.comandos = result.data;      
      }).then(()=>{
        console.log("test");
        //this.loading = false;
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
      //this.post=
      //this.equipo_id=equipo_id;
      this.fetchData(equipo_id);
      console.log(equipo_id);
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
