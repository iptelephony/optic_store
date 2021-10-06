<template>
  <div class="os-root">
    <refraction-form-main v-bind="{ doc, on_change, get_formatted, on_blur }" />
    <refraction-form-supplement v-bind="{ doc, on_change, get_formatted }" />
  </div>
</template>

<script>
import { get_formatted } from '../utils/format';
import RefractionFormMain from './RefractionFormMain.vue';
import RefractionFormSupplement from './RefractionFormSupplement.vue';

export default {
  components: {
    RefractionFormMain,
    RefractionFormSupplement,
  },
  props: { doc: Object, update: Function, fields: Object, blur: Function },
  methods: {
    get_formatted: function(side, param) {
      return get_formatted(this.doc)(side, param);
    },
    on_change: function(e) {
      return this.update(e.target.name, e.target.value);
    },
    on_blur: function(e) {
      return this.blur(e.target.name, e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
