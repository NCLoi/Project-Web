<template>
  <div class="edit-form" v-if="char">
<div class="card"> <div class="card-body">
        <h4>Thêm Nhân Vật</h4>
    <CharAddFrom
      :char="char"
      @char-submit="updateChar"
      @char-delete="deleteChar"
    />
    <p>{{ message }}</p></div></div>
  </div>
</template>

<script>
import GIService from "../services/GI.service";
import CharAddFrom from "../components/CharAddFrom";

export default {
  name: "CharEdit",
  components: {
    CharAddFrom,
  },
  data() {
    return {
      char: null,
      message: "",
    };
  },
  methods: {
    async updateChar(data) {
      const [error, response] = await this.handle(
        GIService.update(this.char.id, data)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Nhân vật được cập nhật thành công.";
      }
    },
    async deleteChar() {
      const [error, response] = await this.handle(
        GIService.delete(this.char.id)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.$router.push({ name: "CharGI" });
      }
    },
    async getChar(id) {
      const [error, response] = await this.handle(GIService.get(id));
      if (error) {
        console.log(error);
      } else {
        this.char = response.data;
        console.log(response.data);
      }
    },
  },
  mounted() {
    this.getChar(this.$route.params.id);
    console.log(this.char);
    this.message = "";
  },
};
</script>
<style>
.edit-form {
  max-width: 60%;
  margin: auto;
}
</style>