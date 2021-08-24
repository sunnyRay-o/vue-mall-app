<template>
    <div class="my-history-container">
        <h4>历史记录：</h4>
        <div class="history-list">
            <div class="list-item"
              v-for="item in list"
              :key="item.time"
              @touchend="search(item.value)"
            >{{item.value}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    list: {
      default: () => [],
      type: Array,
    },
  },
  methods: {
    search(value) {
      this.$emit('searchGoods', value);
    },
  },
};
</script>

<style lang="less" scoped>
.my-history-container {
    position: relative;
    top: 70px;
    margin: 0 auto;
    width: 345px;
    left: 10px;
    .history-list {
        .list-item {
            display: inline-block;
            padding: 15px;
            background: #eee;
            border-radius: 10px;
            margin: 0 0 10px 10px;
        }
    }
}
</style>
