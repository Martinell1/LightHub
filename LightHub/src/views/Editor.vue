<template>
  <editor v-model="text" style="height:calc(100vh - 4rem)"></editor>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import _ from 'lodash'

const store = useStore();

const text = ref('');
watch(
  text,
  _.debounce(() => {
    store.commit('updateArticleText', text.value)
  }, 500)
)

</script>

