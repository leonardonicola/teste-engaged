<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@urql/vue';
import { getCharacterDetails } from 'src/queries/characters';
import { computed } from 'vue';
import { Notify, useQuasar } from 'quasar';

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
      return 'amber';
  }
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
        <div class="col-auto">
          <h1 class="text-h4 text-weight-bold q-mb-sm">
            {{ data.character.name }}
          </h1>

          <div class="flex q-gutter-sm">
            <div class="column">
              Espécie:
              <q-badge color="accent" outline align="middle" style="width: fit-content">{{
                data.character.species || 'Desconhecida'
              }}</q-badge>
            </div>
            <div class="column">
              Gênero:
              <q-badge
                color="indigo"
                outline
                v-if="data.character.gender"
                style="width: fit-content"
                >{{ data.character.gender || 'Desconhecido' }}</q-badge
              >
            </div>
            <div class="column">
              Status:
              <q-badge
                :color="statusColor"
                outline
                v-if="data.character.status"
                style="width: fit-content"
                >{{ data.character.status || 'Desconhecido' }}</q-badge
              >
            </div>
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
            <q-item-label data-testid="location"
              ><strong>Ultima localização:</strong>
              {{ data.character.location?.name || 'Desconhecida' }}</q-item-label
            >
            <q-item-label caption data-testid="location-dimension"
              >Dimensão: {{ data.character.location?.dimension || 'Desconhecida' }}</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="fas fa-globe" size="40px" />
          </q-item-section>
          <q-item-section>
            <q-item-label data-testid="origin"
              ><strong>Origem:</strong>
              {{ data.character.origin?.name || 'Desconhecida' }}</q-item-label
            >
            <q-item-label caption data-testid="origin-dimension"
              >Dimensão: {{ data.character.origin?.dimension || 'Desconhecida' }}</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="fas fa-film" size="40px" />
          </q-item-section>
          <q-item-section>
            <q-item-label data-testid="episodes"
              ><strong>Episódios: </strong>
              <span v-if="data.character.episode.length">{{
                data.character.episode.flatMap((ep) => ep?.episode).join(', ')
              }}</span>
              <span v-else>Nenhuma participação</span>
            </q-item-label>
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
