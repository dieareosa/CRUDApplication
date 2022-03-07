<template>
  <div class='tutorial-form'>
    <div class='form-header'>
        <slot></slot>
        <div v-if="tutorialId">
            <ui-button @click="remove(tutorialId)" icon="delete"></ui-button>
        </div>
    </div>
    <ui-divider></ui-divider>
    <ui-form type="|" item-margin-bottom="16]" action-align="center">
      <template #default="{ subitemClass, actionClass }">
        <ui-form-field class="required">
          <label>Titulo</label>
          <ui-textfield v-model="title"></ui-textfield>
        </ui-form-field>
        <ui-form-field>
          <label>Descripcion</label>
          <ui-textfield v-model="description"></ui-textfield>
        </ui-form-field>
        <ui-form-field>
          <label>Video URL</label>
          <ui-textfield v-model="videoUrl"></ui-textfield>
        </ui-form-field>
        <ui-form-field>
          <label>Como quieres mantener el tutorial?</label>

          <ui-form-field>
            <ui-radio v-model="isPublic" v-bind:value="false"></ui-radio>
            <label>Oculto</label>
            <ui-radio v-model="isPublic" v-bind:value="true"></ui-radio>
            <label>Publico</label>
          </ui-form-field>
        </ui-form-field>
        <ui-form-field :class="actionClass">
          <ui-button @click="submit" raised>Aceptar</ui-button>
          <ui-button outlined @click="showTutorialForm(false)">Cancelar</ui-button>
        </ui-form-field>
      </template>
    </ui-form>
  </div>
</template>


<script>
import { ref, toRefs } from "vue";
import TutorialService from "../services/TutorialService";
import Validators from "../lib/Validators"
export default {
  props: {
    getAllTutorials: Function,
    tutorial: Object,
    showTutorialForm: Function
  },

  setup(props) {
    const { tutorial } = toRefs(props);
    const { getAllTutorials, showTutorialForm } = props;
    const tutorialId = ref(tutorial?.value?.id ?? null);
    const title = ref(tutorial?.value?.title ?? null);
    const videoUrl = ref(tutorial?.value?.videoUrl ?? null);
    const description = ref(tutorial?.value?.title ?? null);
    const isPublic = ref(tutorial?.value?.id ? tutorial.value?.isPublic : true);

    const submit = async () => {
      if (!title.value) return alert("Titulo no ingresado.");

      if (!!videoUrl.value) {
        if (!Validators.isValidHttpUrl(videoUrl.value)){
            return alert("Formato de URL incorrecto.");
        }
      } 

      if (tutorial.value?.id) {
        await TutorialService.updateTutorial(tutorialId.value, {
          title: title.value,
          description: description.value,
          isPublic: isPublic.value,
          videoUrl: videoUrl.value
        });
      } else {
        await TutorialService.createTutorial({
          title: title.value,
          description: description.value,
          isPublic: isPublic.value,
          videoUrl: videoUrl.value
        });
      }
      await getAllTutorials();
      showTutorialForm(false);
    };

    const remove = async () => {
      await TutorialService.deleteTutorial(tutorialId.value);
      await getAllTutorials();
      showTutorialForm(false);
    };

    return {
      tutorialId,
      submit,
      description,
      title,
      isPublic,
      videoUrl,
      remove,
      showTutorialForm
    };
  }
};
</script>

<style>
 .tutorial-form{
     justify-content: flex-start;
     width: 25%;
 }
 .form-header {
     display: flex;
    justify-content: space-between;
 }
</style>