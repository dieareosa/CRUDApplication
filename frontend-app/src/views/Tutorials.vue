<template>
  <div class="crud-tutorials">
    <h1>Tutoriales</h1>
    <div class="search">
      <div class="search-box">
        <ui-textfield class="search-bar" placeholder="Buscar por titulo o descripcion" v-model="query" outlined/>
        <ui-button @click="getAllTutorials(query)" raised>Buscar</ui-button>
      </div>
      <br/>
      <div>
        <ui-button @click="resetSearch">Limpiar busqueda</ui-button>
        <ui-button @click="showTutorialForm(true)" raised>Crear</ui-button>
      </div>
    </div>
    <div v-if="!tutorialFormVisible">
      <tutorial-list
          :query="query"
          :tutorials="tutorials"
          :getAllTutorials="getAllTutorials"
          :showTutorialForm="showTutorialForm"
          :tutorialFormVisible="tutorialFormVisible"
      >
        <template v-slot:empty-search><h2><a v-button @click="resetSearch()">Mostrar todos</a></h2></template>
        <template v-slot:empty-tutorials><h2>Comencemos por <a v-button @click="showTutorialForm(true)">agregar</a> uno
        </h2></template>
        <template v-slot:default="slotProps">
          <TutorialForm
              :tutorial="slotProps.currentTutorial"
              :getAllTutorials="getAllTutorials"
              :showTutorialForm="slotProps.showTutorialForm"
          >Editar tutorial
          </TutorialForm>
        </template>
      </tutorial-list>
    </div>
    <div v-else>
      <tutorial-form
          :getAllTutorials="getAllTutorials"
          :showTutorialForm="showTutorialForm"
      >Crear tutorial
      </tutorial-form>
    </div>

    <ui-button v-if='tutorials.length > 0 && !tutorialFormVisible' @click="removeAll">Eliminar todos</ui-button>
  </div>
</template>

<script>
import {ref, reactive, computed} from 'vue';
import TutorialList from '../components/TutorialList.vue';
import TutorialForm from '../components/TutorialForm.vue';
import TutorialService from '../services/TutorialService';

export default {
  components: {
    TutorialList,
    TutorialForm
  },
  setup() {
    const query = ref('');
    const tutorials = ref([]);
    const tutorialFormVisible = ref(false);
    const resetSearch = async () => {
      query.value = '';
      await getAllTutorials();
    };

    const getAllTutorials = async (filter) => {
      const response = await TutorialService.getTutorials(filter);
      tutorials.value = response.data.result;
    };
    const removeAll = async () => {
      await TutorialService.massDeleteTutorials();
      await getAllTutorials();
    };

    const showTutorialForm = value => {
      tutorialFormVisible.value = value;
    };

    return {
      resetSearch,
      query,
      getAllTutorials,
      tutorials,
      tutorialFormVisible,
      removeAll,
      showTutorialForm
    };
  },
  created() {
    this.getAllTutorials();
  }
};
</script>

<style>
.crud-tutorials {
  width: 1000px;
  text-align: left;
}

.search {
  margin-bottom: 20px;
}

.search-bar {
  width: 70%;
  margin-right: 15px;
}

.search-box {
  width: 100%;
}

</style>