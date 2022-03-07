<template>
  <div class="root" v-if="tutorials.length > 0 && !tutorialFormVisible">
    <div class="list">
      <ul>
        <ui-item
          @click="setCurrentTutorial(tutorial)"
          v-for="tutorial in tutorials"
          :key="tutorial.id"
        >
          <ui-item-text-content>{{ tutorial.title }}</ui-item-text-content>
        </ui-item>
      </ul>
    </div>
    <div v-if="currentTutorial">
      <TutorialDetails :showTutorialForm="showTutorialForm" :tutorial="currentTutorial">
        <template v-slot:title>{{ currentTutorial.title }}</template>
        <template v-slot:description>{{ currentTutorial.description }}</template>
		<template v-slot:videoURL>{{ currentTutorial.videoURL }}</template>
        <template v-slot:state>{{ currentTutorial.isPublic ? 'Publico' : 'Oculto' }}</template>
      </TutorialDetails>
    </div>
  </div>
  <div v-else>
    <div v-if="tutorialFormVisible">
      <slot v-bind:currentTutorial="currentTutorial" v-bind:showTutorialForm="showTutorialForm"></slot>
    </div>
    <div v-else>
      <div class="empty-list" v-if="tutorials.length > 0 || !!query">
        <h1>No se encontraron tutoriales con el titulo "{{ query }}"!</h1>
        <slot name="empty-search"></slot>
      </div>
      <div class="empty-list" v-else>
        <h1>No hay tutoriales aqui</h1>
        <slot name="empty-tutorials"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRefs } from "vue";
import TutorialDetails from "./TutorialDetails.vue";
import TutorialForm from "./TutorialForm.vue";
export default {
  components: {
    TutorialDetails,
    TutorialForm
  },
  props: {
    query: String,
    tutorialFormVisible: Boolean,
    tutorials: Object,
    getAllTutorials: Function
  },

  setup(props) {
    const { tutorials, query } = toRefs(props);
    const { getAllTutorials } = props;
    const currentTutorial = ref(null);
    const tutorialFormVisible = ref(false);

    const setCurrentTutorial = tutorial => {
      currentTutorial.value = tutorial;
    };

    const showTutorialForm = value => {
      tutorialFormVisible.value = value;
    };

    return {
      query,
      tutorials,
      setCurrentTutorial,
      currentTutorial,
      getAllTutorials,
      showTutorialForm,
      tutorialFormVisible
    };
  }
};
</script>

<style scoped>
.root {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-start;
}

.list {
  width: 50%;
  margin-right: 180px;
}

.root p {
  text-align: right;
  font-size: 0.7em;
}

ul {
  list-style: none;
  width: 50px 0;
  padding: 0;
  background-color: #fafafa;
  border-radius: 5px;
  border: 1px solid #ddd;
}

li {
  text-align: left;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

li:nth-last-of-type(1) {
  border-bottom: none;
}
.empty-list {
	display: flex;
    flex-direction: column;
    align-items: center;
}
</style>