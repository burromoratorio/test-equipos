<template>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export default {
  name: 'Correntintable',
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      arreglo: 'value',
      items: shuffleArray([
        {equipo: '{{this.arreglo}}', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'},
        {equipo: 'saracho', comando: '2012/01/01', role: 'respuesta', status: 'Active'}
      ]),
      fields: [
        {key: 'equipo'},
        {key: 'comando'},
        {key: 'respuesta'},
        {key: 'status'}
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0
    }
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    }
  }
}
</script>

