<template>
  <div class="chart">

  </div>
</template>
<script>
const Highcharts = require('highcharts/highstock');
require('highcharts/modules/map')(Highcharts);

export default {
  props: ['coin'],
  data() {
    return {
      coinValues: [],
    };
  },

  watch: {
    coin() {
      this.initCoinValues();
      this.buildChart();
    },
  },

  methods: {
    initCoinValues() {
      if (this.coin.length) {
        this.coinValues = this.coin.map(val => [val.timestamp * 1000, val.value]);
      }
    },

    buildChart() {
      Highcharts.stockChart(this.$el, {
        rangeSelector: {
          buttons: [
            {
              type: 'all',
              count: 1,
              text: 'All',
            },
          ],
          selected: 1,
          inputEnabled: false,
        },

        title: {
          text: 'Coin Price',
        },

        xAxis: {
          type: 'datetime',
          labels: {
            format: '{value:%b %d}',
          },
        },

        series:
        [
          {
            name: 'Coin Price',
            pointRange: 24 * 3600,
            data: this.coinValues,
            type: 'spline',
            tooltip: {
              valueDecimals: 2,
            },
          },
        ],
      });
    },
  },

  mounted() {
    this.initCoinValues();
    this.buildChart();
  },
};
</script>
