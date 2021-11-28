<template>
  <div class="edit-form">
    <div class="card">
      <div class="card-body">
        <h4>Thêm Nhân Vật</h4>
        <CharAddFrom :char="char" @char-submit="addChar" />
        <p>{{ messenger }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import GIService from "../services/GI.service";
import CharAddFrom from "../components/CharAddFrom";

export default {
  name: "CharAdd",
  components: {
    CharAddFrom,
  },
  data() {
    return {
      char: {
        name: "",
        img: "",
        rarity: "",
        weapon: "",
        element: "",
        attalentsE: "",
        imgE: "",
        attalentsQ: "",
        imgQ: "",
        cvjp: "",
        cven: "",
        ingamedescription: "",
      },
    };
  },
  methods: {
    initChar() {},
    async addChar(data) {
      console.log("input: ", data);
      const [error, response] = await this.handle(GIService.create(data));
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Nhân vật được thêm thành công.";
      }
    },
  },
  mounted() {
    this.message = "";
    this.initChar();
  },
};
</script>
<style>
.edit-form {
  max-width: 60%;
  margin: auto;
}
</style>