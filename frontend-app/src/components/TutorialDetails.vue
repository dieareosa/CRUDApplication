<template>
  <div>
    <div>Titulo: <slot name="title"></slot></div>
    <div>Descripcion: <slot name="description"></slot></div>
    <div>Video URL: <slot name="videoURL"></slot></div>
    <div>Estado: <slot name="state"></slot></div>
    <ui-button @click="showTutorialForm(true)">Editar</ui-button>
  </div>
</template>


<script>
import { ref, toRefs } from "vue";
import axios from "axios";
export default {
  props: {
    tutorial: Object,
    showTutorialForm: Function
  },

  setup(props) {
    const { tutorial, showTutorialForm } = props;

    return {
      tutorial,
      showTutorialForm
    };
  }
};
</script>

<style>
</style>