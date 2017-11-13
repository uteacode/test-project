<template>
  <div id="coin-info">
    <div class="card" style="text-align: left;">
      <div class="card-body">
        <h4 class="card-title">{{ coin.name }} ({{ coin.short }})</h4>
        <div class="card-text">
          <p>Цена: {{ coin.price_usd }}</p>
          <p>% изменения: {{ coin.change ? coin.change.day : '' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['coin'],
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
}
</style>


