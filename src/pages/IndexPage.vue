<template>
  <div>
    <div class="row nav-menu">
      <div class="col-md-12">
        <ul class="nav justify-content-center">
          <li class="nav-item" v-for="item in responseData" :key="item">
            <router-link :to="item" class="nav-link">{{ item }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <coin-chart :coin="coinChartInfo"></coin-chart>
      </div>
      <div class="col-md-4">
        <coin-info-panel :coin="coinInfo"></coin-info-panel>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import CoinInfoPanel from '@/components/CoinInfoPanel';
import CoinChart from '@/components/CoinChart';

export default {
  data() {
    return {
      responseData: {},
      coinInfo: {},
      routeParam: '',
      coinChartInfo: {},
    };
  },

  beforeRouteUpdate(to, from, next) {
    this.routeParam = to.params.coin;
    this.getFullData();
    next();
  },

  methods: {
    getCoinInfo() {
      axios.get(`http://api.icex.ch/api/coins/${this.routeParam}`).then((response) => {
        this.coinInfo = response.data.data;
      });
    },

    getCoinsList() {
      axios.get('http://api.icex.ch/api/coins?coinlist=icextop10').then((response) => {
        this.responseData = response.data.data;
      });
    },

    getCoinChartInfo() {
      const monthAgo = moment().subtract(1, 'months').unix();
      const currentDate = moment().unix();
      axios.get(`http://api.icex.ch/api/coins/${this.routeParam}/hist?interval=day&start=${monthAgo}&end=${currentDate}`).then((response) => {
        this.coinChartInfo = response.data.data;
      });
    },

    getFullData() {
      this.getCoinInfo();
      this.getCoinChartInfo();
    },
  },

  mounted() {
    this.getCoinsList();
    this.routeParam = this.$route.params.coin;
    if (this.routeParam) {
      this.getFullData();
    }
  },

  components: {
    'coin-info-panel': CoinInfoPanel,
    'coin-chart': CoinChart,
  },
};
</script>
<style lang="scss" scoped>
.nav-menu {
  margin-bottom: 15px;
}

li {
  padding: 5px 5px;
  margin-right: 5px;
}

li > a.active {
  color: darkslateblue;
}
</style>

