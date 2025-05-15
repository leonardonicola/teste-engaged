<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal bordered :class="$q.dark.isActive ? '' : 'bg-white text-slate-900'">
      <q-toolbar class="q-px-xl q-py-md">
        <q-toolbar-title class="text-weight-bold">Rick and Morty Explorer</q-toolbar-title>
        <q-btn
          @click="() => $q.dark.toggle()"
          flat
          round
          dense
          :icon="$q.dark.isActive ? 'fas fa-moon' : 'fas fa-sun'"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style scoped></style>
