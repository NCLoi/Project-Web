<template>
  <div class="row">
    <div class="col-md-12 mt-4">
      <div class="mb-3 input-group bg-light">
        <input
          type="text"
          class="form-control"
          placeholder="Tìm Vũ Khí"
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
        v-for="(WeaponGI, index) in WeaponsGI"
        :key="WeaponGI.id"
        @click="setActiveWeaponGI(WeaponGI, index)"
      >
        <div
          class="card mb-4"
          style="border-color: grey; box-shadow: 5px 5px 1px #343a40"
        >
          <div class="row no-gutters">
            <div class="col-md-4">
              <img v-bind:src="WeaponGI.imgwp" alt="Card image cap" />
            </div>
            <div class="col-md-8">
              <div class="container">
                <div class="card-body">
                  <h2 class="card-title">{{ WeaponGI.namewp }}</h2>
                  <div class="row">
                 <div class="col-md-12">
                      <b> Rarity:</b>
                      <img width="100" v-bind:src="WeaponGI.raritywp" />
                    </div>
                    <div class="col-md-6">
                      <p style="font-weight: bold">
                        Base Attack : {{ WeaponGI.baseatk }}
                      </p>
                    </div>
                    <div class="col-md-6">
                      <p style="font-weight: bold">
                        Secondary Stat : {{ WeaponGI.scstat }}
                      </p>
                    </div>
                    <div class="col-md-12">
                      <p style="font-weight: bold">
                        Special Ability Description : {{ WeaponGI.specialAD }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WPService from "../services/weapon.service";

export default {
  name: "WeaponGI",
  data() {
    return {
      WeaponsGI: [],
      currentWeaponId: -1,
      currentWeapon: null,
      nameToSearch: "",
    };
  },
  methods: {
    setActiveWeaponGI(WeaponGI, index) {
      this.currentWeaponId = index;
      this.currentWeapon = WeaponGI;
    },
    async retrieveWeaponGI() {
      const [error, response] = await this.handle(WPService.getAll());
      if (error) {
        console.log(error);
      } else {
        this.WeaponsGI = response.data;
        console.log(response.data);
      }
    },
    async searchName() {
      const [error, response] = await this.handle(
        WPService.findByName(this.nameToSearch)
      );
      if (error) {
        console.log(error);
      } else {
        this.WeaponsGI = response.data;
        this.setActiveWeaponGI(null);
        console.log(response.data);
      }
    },
  },
  mounted() {
    this.retrieveWeaponGI();
  },
};
</script>

