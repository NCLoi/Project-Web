<template>
  <div class="row">
    <div class="col-md-12 mt-4">
      <div class="mb-3 input-group bg-light">
        <input
          type="text"
          class="form-control"
          placeholder="Tìm Nhân Vật"
          v-model="nameToSearch"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchName"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      <div
        v-for="(CharGI, index) in CharsGI"
        :key="CharGI.id"
        @click="setActiveCharGI(CharGI, index)"
      >
        <div class="card mb-4">
          <div class="row no-gutters">
            <div class="col-md-5">
              <img
                class="px-2 py-4 rounded"
                style="width: 100%"
                v-bind:src="CharGI.img"
                alt="Card image cap"
              />
            </div>
            <div class="col-md-7 shadow-sm p-4 mb-5 bg-light rounded">
              <div class="container">
                <div class="card-body">
                  <h2 class="card-title">{{ CharGI.name }}</h2>
                  <b>CV Japan: {{ CharGI.cvjp }} </b>
                  <p>
                    <b>CV ENG: {{ CharGI.cven }} </b>
                  </p>
                  <p class="card-text">{{ CharGI.ingamedescription }}</p>
                  <div class="row">
                    <div class="col-md-12">
                      <b> Rarity:</b>
                      <img width="100" v-bind:src="CharGI.rarity" />
                    </div>
                    <div class="col-md-4 mt-2">
                      <b>Weapon</b>
                      <div class="card">
                        <img :src="CharGI.weapon" class="card-img-bottom" />
                      </div>
                    </div>
                    <div class="col-md-2 mt-2">
                      <b>Element</b>
                      <div class="card">
                        <img :src="CharGI.element" class="card-img-bottom" />
                      </div>
                    </div>
                    <div class="col-md-12 mt-2">
                      <b>Attack Talents</b>
                      <div class="row">
                        <div class="col-md-4 mt-2">
                          <b>{{ CharGI.attalentsE }}</b>
                          <div
                            class="card"
                            style="
                              background-color: #546e7a;
                              border: none !important;
                            "
                          >
                            <img :src="CharGI.imgE" class="card-img-bottom" />
                          </div>
                        </div>
                        <div class="col-md-4 mt-2">
                          <b>{{ CharGI.attalentsQ }}</b>
                          <div
                            class="card"
                            style="
                              background-color: #546e7a;
                              border: none !important;
                            "
                          >
                            <img :src="CharGI.imgQ" class="card-img-bottom" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <router-link
                  :to="'/char-edit/' + CharGI.id"
                  v-show="
                    currentUser != null && currentUser.username == 'ncloi'
                  "
                  ><button class="btn btn-danger">
                    Chỉnh sửa thông tin
                  </button></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GIService from "../services/GI.service";

export default {
  name: "CharGI",
  data() {
    return {
      CharsGI: [],
      currentCharId: -1,
      currentChar: null,
      nameToSearch: "",
      currentUser: null,
    };
  },
  methods: {
    setActiveCharGI(CharGI, index) {
      this.currentCharId = index;
      this.currentChar = CharGI;
    },
    async retrieveGI() {
      const [error, response] = await this.handle(GIService.getAll());
      if (error) {
        console.log(error);
      } else {
        this.CharsGI = response.data;
        console.log(response.data);
      }
    },
    async searchName() {
      const [error, response] = await this.handle(
        GIService.findByName(this.nameToSearch)
      );
      if (error) {
        console.log(error);
      } else {
        this.CharsGI = response.data;
        this.setActiveCharGI(null);
        console.log(response.data);
      }
    },
  },
  mounted() {
    this.currentUser = this.$store.getters.loggedInUser;
    this.retrieveGI();
  },
};
</script>
<style></style>
