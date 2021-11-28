<template>
  <Form
    @submit="$emit('char-submit', charLocal)"
  >
    <div class="form-group">
      <label for="name">Name</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="charLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="img">Img</label>
      <Field name="img" type="text" class="form-control" v-model="charLocal.img" />
      <ErrorMessage name="img" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="cvjp">CV Japan</label>
      <Field
        name="cvjp"
        type="text"
        class="form-control"
        v-model="charLocal.cvjp"
      />
      <ErrorMessage name="cvjp" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="cven">CV ENG</label>
      <Field
        name="cven"
        type="text"
        class="form-control"
        v-model="charLocal.cven"
      />
      <ErrorMessage name="cven" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="ingamedescription">In-game description</label>
      <Field
        name="ingamedescription"
        type="text"
        class="form-control"
        v-model="charLocal.ingamedescription"
      />
      <ErrorMessage name="ingamedescription" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="rarity">Rarity</label>
      <Field
        name="rarity"
        type="text"
        class="form-control"
        v-model="charLocal.rarity"
      />
      <ErrorMessage name="rarity" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="weapon">Weapon</label>
      <Field
        name="weapon"
        type="text"
        class="form-control"
        v-model="charLocal.weapon"
      />
      <ErrorMessage name="weapon" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="element">Element</label>
      <Field
        name="element"
        type="text"
        class="form-control"
        v-model="charLocal.element"
      />
      <ErrorMessage name="element" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="attalentsE">Attack Talents E</label>
      <Field
        name="attalentsE"
        type="text"
        class="form-control"
        v-model="charLocal.attalentsE"
      />
      <ErrorMessage name="attalentsE" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="imgE">Image E</label>
      <Field
        name="imgE"
        type="text"
        class="form-control"
        v-model="charLocal.imgE"
      />
      <ErrorMessage name="imgE" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="attalentsQ">Attack Talents Q</label>
      <Field
        name="attalentsQ"
        type="text"
        class="form-control"
        v-model="charLocal.attalentsQ"
      />
      <ErrorMessage name="attalentsQ" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="imgQ">Image Q</label>
      <Field
        name="imgQ"
        type="text"
        class="form-control"
        v-model="charLocal.imgQ"
      />
      <ErrorMessage name="imgQ" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="charLocal.id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="$emit('char-delete', charLocal.id)"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "addChar",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["char-submit", "char-delete"],
  props: ["char"],
  data() {
    return {
      charLocal: this.char,
    };
  },
};
</script>
<style>
@import "../assets/styles/main.css";
</style>