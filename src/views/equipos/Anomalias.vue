<template>
  <div class="animated fadeIn">
    <b-row class="justify-content-center">
      <b-col lg="6">
       <b-card :header="captionTotal">
        <b-table responsive  :items="totales" :fields="fields" :current-page="currentPage" :per-page="perPage"
        @row-clicked="expandAdditionalInfo" >
         <template slot="reset" slot-scope="totales">
            <b-button type="button" size="sm" variant="primary" @click="activModal(totales.item.idMovil)">
             <i class="fa fa-flash"></i>
            </b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination :total-rows="getRowCount(totales)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
      </b-card>    
      </b-col><!--/.col-->
      <b-col lg="6">
        <b-card :header="caption">
        <b-table responsive  :items="anomalias" :fields="fieldsAnomalias" :current-page="currentPageAno" :per-page="perPageAno">
        </b-table>
        <nav>
          <b-pagination :total-rows="getRowCount(anomalias)" :per-page="perPageAno" v-model="currentPageAno" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
      </b-card>  
      </b-col><!--/.col-->
    </b-row>
    <b-row>
        <b-col md="6">
          <b-modal title="Modal title" class="modal-danger" v-model="dangerModal" @ok="resetear()" ok-variant="danger">
          Está Ud. seguro de resetear el equipo?
        </b-modal>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import Vue from 'vue';
import cTable from '../base/Table.vue'
import DataService from '../../services/DataService';
const dataservice = new DataService();
var caption= 'Table';
var captionTotal='Moviles con anomalias detectadas:';
export default {
  name: 'anomalias',
  components: {cTable},
  data () {
    return {
      loading: false,
      equipo_id: 0,
      totales:[],
      anomalias:[],
      disabled:0,
      fields: [
        {key : 'id_movil',key:'idMovil',sortable: true},      
        {label: 'Dominio',key : 'dominio',sortable: true},
        {label: 'Anomalias',key : 'total',sortable: true },
        {label: 'Resetear',key : 'reset'}
      ],
      fieldsAnomalias: [
        {label: 'Anomalia',key : 'anomalia',sortable: true }     
      ],
      currentPage: 1,
      perPage: 11,
      currentPageAno: 1,
      perPageAno: 8,
      totalRows: 0,
      show: false,
      dangerModal: false,
      movilReset:0,
    }
  },
  created () {
    this.fetchTotales (this.equipo_id);
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
   //this.search(equipo_id);
  },
  methods: {
    fetchTotales (equipo_id) {
      dataservice.getAnomalias(equipo_id).then( result => {
        if(result.status==200){
          console.log(result.data);
          this.totales = result.data;
          this.caption='Anomalias'; 
          this.captionTotal='Moviles con anomalias detectadas:<b>'+result.data.length+'</b>';
        }
      })
      
    },
    fetchAnomalias (equipo_id) {
      dataservice.getAnomalias(equipo_id).then( result => {
        if(result.status==200){
          console.log(result.data);
          this.anomalias = result.data; 
        }
      })
      
    },
    expandAdditionalInfo(row) {
      this.fetchAnomalias(row.idMovil);
      this.caption='Movil:<b>'+row.dominio+'</b>';
    },
    getRowCount (items) {
      return items.length
    },
    resetear(){
      console.log("en reset");
      dataservice.resetearEquipo(this.movilReset).then( result => {
        if(result.status==200){
          this.fetchTotales (this.equipo_id);
        }
      })

      
    },
    activModal(eq){
      this.movilReset=eq;
      this.dangerModal=true;
      //this.resetear(eq);
    },
  }

}
</script>
