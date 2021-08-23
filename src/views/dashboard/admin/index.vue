<template>
  <div class="dashboard-editor-container">
    <div class="display_name">
      欢迎
      <span>{{ realname }}</span>
      登陆库柏爱迪生国网系统
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardEditor',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'realname', 'roles', 'id'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  display: flex;
  width: 100%;
  height: 90vh;
  .display_name {
    margin: 20% auto;
    font-size: 50px;
    font-weight: bold;
    color: #007A59;
    letter-spacing: 3px;
    span {
      margin: 0 10px;
      color: orange;
    }
  }
}
</style>
