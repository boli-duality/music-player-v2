<template>
  <header class="app-header">
    <div class="left-wrap">
      <!-- logo -->
      <div class="logo">
        <div class="logo-icon"><i class="a-icon-ic_music"></i></div>
        <span class="logo-title">声 海 空 游</span>
      </div>
      <!-- 搜索框 -->
      <div class="search-box music-layout-drag-cancel">
        <div class="step-btn pre"><i class="a-icon-zuosanjiao"></i></div>
        <div class="step-btn next"><i class="a-icon-yousanjiao"></i></div>
        <el-input
          class="search-input"
          :placeholder="searchHolder"
          v-model="input4"
          prefix-icon="el-icon-search"
          @keydown.enter.native="onSearch"
        ></el-input>
      </div>
    </div>
    <!-- 右侧综合功能 -->
    <div class="setting music-layout-drag-cancel">
      <a href="#"><img class="user" src="@/assets/images/common/user.png" title="用户" /></a>
      <el-button class="login-btn" type="text">
        <div class="login" @click="dialogVisible = true">
          未登录
          <i class="el-icon-caret-bottom"></i>
          <div class="vip"><i class="a-icon-f-vip"></i> 开通</div>
        </div>
      </el-button>
      <i class="a-icon-yifu"></i>
      <i class="el-icon-setting"></i>
      <i class="el-icon-message"></i>
      <div class="line"></div>
      <i class="a-icon-Minion-"></i>
      <i class="a-icon-zuixiaohua-2"></i>
      <i v-if="isMaximize" class="a-icon-zuidahua-3" @click="inject('minimize')"></i>
      <i v-else class="a-icon-zuidahua-1" @click="inject('maximize')"></i>
      <i class="a-icon-close2"></i>
    </div>
    <QRLogin></QRLogin>
  </header>
</template>

<script>
import { getRandomItem } from '@/common/utils/functions'
import { searchHotList } from '@/api/search'
import QRLogin from '@/components/QRLogin/index.vue'

export default {
  name: 'AppHeader',
  components: {
    QRLogin,
  },
  inject: ['maximize', 'minimize'],
  data() {
    return {
      isMaximize: false,
      hotList: [],
      searchHolder: '',
      // XXX 变量名需要语义化
      input4: '',
      dialogVisible: false,
    }
  },
  created() {
    this.searchDefaultAPI()
    this.input4 = this.$route.params.keyword ?? ''
  },
  methods: {
    inject(emit) {
      this.isMaximize = !this.isMaximize
      this[emit]()
    },
    async searchDefaultAPI() {
      const { data } = await searchHotList()
      this.hotList = data
      this.searchHolder = data[0].searchWord
    },
    onSearch() {
      this.input4 = this.input4.trim()
      if (this.input4 == this.$route.params.keyword) return
      if (!this.input4) this.input4 = this.searchHolder
      if (this.input4) this.$router.push({ name: 'search', params: { keyword: this.input4 } })
      this.searchHolder = getRandomItem(this.hotList).searchWord
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => done())
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: var(--theme-red);
  color: #fff;
  .left-wrap {
    display: flex;
    margin-right: 136px;
    .logo {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding-left: 19px;
      width: 229px;
      &-icon {
        @include flex-c;
        margin-right: 6px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #fff;
        color: var(--theme-red);
        .icon-ic_music {
          font-size: 14px;
        }
      }
      &-title {
        font-size: 16px;
      }
    }
    .search-box {
      display: flex;
      align-items: center;
      width: 230px;
      background: #ec4141;
      .step-btn {
        @include flex-c;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: rgba($color: #000000, $alpha: 0.08);
        &.pre {
          margin-right: 8px;
        }
      }
      ::v-deep .search-input {
        margin-left: 12px;
        width: 160px;
        .el-input__inner {
          height: 32px;
          border: none;
          border-radius: 32px;
          background: rgba($color: #000000, $alpha: 0.05);
        }
        .el-icon-search {
          @include flex-c;
        }
      }
    }
  }
  .setting {
    display: flex;
    align-items: center;
    margin-right: 16px;
    .user {
      width: 28px;
      height: 28px;
    }
    .login-btn {
      display: flex;
      padding: 0;
      color: #fff;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
      div {
        display: flex;
      }
      .vip {
        font-size: 3px;
      }
    }
    .login {
      line-height: 18px;
    }
    [class^='a-icon-'],
    [class^='el-icon-'] {
      cursor: pointer;
      background: var(--theme-red);
      color: #fff;
      font-size: 18px;
      margin-left: 15px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    .el-icon-caret-bottom {
      margin: 0;
    }
    // XXX 可以优化
    .line {
      width: 1px;
      height: 14px;
      margin-left: 15px;
      border: #f2f2f2 1px solid;
    }
    .a-icon-zuidahua-1 {
      font-size: 16px;
      margin-left: 25px;
    }
  }
}
</style>
