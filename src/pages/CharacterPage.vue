<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@urql/vue';
import { getCharacterDetails } from 'src/queries/characters';
import { computed } from 'vue';
import { Notify, useMeta, useQuasar } from 'quasar';

const route = useRoute();
const q = useQuasar();
const characterId = route.params.id as string;

const { data, error, fetching } = useQuery({
  query: getCharacterDetails,
  variables: { id: characterId },
});

const statusColor = computed(() => {
  switch (data?.value?.character?.status) {
    case 'Alive':
      return 'green';
    case 'Dead':
      return 'red';
    default:
      return 'primary';
  }
});

useMeta({
  titleTemplate: (title) => `${title} | ${data.value?.character?.name}`,
});

if (error.value) {
  Notify.create({
    message: error.value?.message,
  });
}
</script>
<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs :active-color="q.dark.isActive ? 'amber-1' : 'primary'">
        <q-breadcrumbs-el icon="fas fa-home" to="/" label="Home" />
        <q-breadcrumbs-el :label="data?.character?.name ?? 'Detalhes'" />
      </q-breadcrumbs>
    </div>
    <q-card
      v-if="data?.character"
      class="q-pa-md q-mx-auto"
      style="max-width: 800px; border-radius: 20px"
      flat
      bordered
    >
      <q-card-section class="row q-col-gutter-md">
        <q-img
          :src="data.character.image ?? ''"
          :alt="data.character.name ?? 'Rick and Morty Character'"
          class="character-img col-8"
          style="width: 350px; height: 300px; border-radius: 16px"
          spinner-color="primary"
          transition="fade"
        />
        <div class="col-5">
          <h1 class="text-h4 text-weight-bold q-mb-sm">
            {{ data.character.name }}
          </h1>

          <div class="row q-gutter-sm">
            <q-badge color="accent" outline>{{ data.character.species }}</q-badge>
            <q-badge color="indigo" outline>{{ data.character.gender }}</q-badge>
            <q-badge :color="statusColor" outline>{{ data.character.status }}</q-badge>
          </div>
        </div>
      </q-card-section>

      <q-separator class="q-my-md" />

      <q-card-section class="q-gutter-md">
        <q-item>
          <q-item-section avatar>
            <q-icon name="fas fa-location-dot" size="40px" />
          </q-item-section>
          <q-item-section>
            <q-item-label
              ><strong>Ultima localização:</strong>
              {{ data.character.location?.name }}</q-item-label
            >
            <q-item-label caption
              >Dimensão: {{ data.character.location?.dimension || 'Desconhecida' }}</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="fas fa-globe" size="40px" />
          </q-item-section>
          <q-item-section>
            <q-item-label><strong>Origem:</strong> {{ data.character.origin?.name }}</q-item-label>
            <q-item-label caption
              >Dimensão: {{ data.character.origin?.dimension || 'Unknown' }}</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="fas fa-film" size="40px" />
          </q-item-section>
          <q-item-section>
            <q-item-label
              ><strong>Episódios:</strong>
              {{ data.character.episode.flatMap((ep) => ep?.episode).join(', ') }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
    <div class="q-pa-md q-mx-auto row" v-else-if="fetching" style="max-width: 800px">
      <div class="col-12">
        <q-skeleton height="300px" square animation="fade" />

        <div class="row items-start no-wrap q-mt-sm" v-for="infos in 3" :key="infos">
          <q-skeleton size="90px" square animation="fade" />

          <div class="col q-pl-sm">
            <q-skeleton type="text" square width="30%" animation="fade" />
            <q-skeleton type="text" square height="12px" animation="fade" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
