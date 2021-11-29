<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/char" class="nav-link">
        <img
          width="100"
          src="https://cdn2.steamgriddb.com/file/sgdb-cdn/logo_thumb/2465517595f5ea9f225d52ed73a4d0db.png"
        />
      </router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/char" class="nav-link"> Character </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/weapon" class="nav-link"> Weapon </router-link>
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link"> Đăng ký </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link"> Đăng nhập </router-link>
        </li>
      </div>
      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <span class="badge badge-primary" style="font-size: 16px">
              {{ currentUser.username }}
            </span>
          </router-link>
        </li>
        <li class="nav-item" v-show="currentUser!=null && currentUser.username=='ncloi'">
          <router-link to="/char-add" class="nav-link">
            Thêm Nhân Vật
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logout"> Đăng xuất </a>
        </li>
      </div>
    </nav>
    <div class="container">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser",
    }),
  },
  methods: {
    ...mapMutations(["initAuthState"]),
    logout() {
      this.$store.commit("logout");
      //this.$router.push("login");
    },
  },
  mounted() {
    this.initAuthState();
  },
};
</script>

<style>
body {
  background-image: url(https://uploadstatic-sea.mihoyo.com/contentweb/20210715/2021071516521972191.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
