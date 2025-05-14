<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useQuery } from '@urql/vue';
import { useRouter } from 'vue-router';
import { getCharacters } from 'src/queries/characters';
import CharacterCard from 'src/components/CharacterCard.vue';
import { Notify } from 'quasar';

const search = ref('');
const page = ref(1);
const router = useRouter();

const variables = computed(() => ({ page: page.value, name: search.value }));

// eslint-disable-next-line @typescript-eslint/unbound-method
const { data, executeQuery, fetching } = useQuery({
  query: getCharacters,
  variables,
});

watch([search, page], () => {
  const { error } = executeQuery({ requestPolicy: 'network-only' });
  if (error.value) {
    Notify.create({
      message:
        error.value?.message ?? 'Um erro ocorreu ao listar seus personagens! Tente novamente',
    });
  }
});

const characters = computed(() => data.value?.characters);

function goToCharacter(id?: string | null) {
  if (id) void router.push({ name: 'character', params: { id } });
}
</script>

<template>
  <q-page class="q-pa-xl q-gutter-y-lg">
    <div class="row justify-center">
      <q-input
        debounce="400"
        v-model="search"
        placeholder="Procure pelo personagem..."
        class="full-width"
        outlined
        style="max-width: 500px"
        dense
      >
        <template #prepend>
          <q-icon name="fas fa-search" />
        </template>
      </q-input>
    </div>
    <div v-if="fetching" class="row justify-center q-gutter-md">
      <q-skeleton height="250px" width="200px" v-for="item in 8" :key="item" />
    </div>
    <div class="row justify-center q-gutter-md" v-else-if="characters?.results?.length">
      <div
        @click="goToCharacter(char?.id)"
        v-for="(char, index) in characters.results"
        :key="char?.id || index"
      >
        <CharacterCard v-if="char" :character="char" />
      </div>
    </div>
    <h6 class="text-center" v-else>Nenhum personagem foi encontrado!</h6>

    <q-pagination
      v-if="characters?.info"
      :disable="fetching"
      v-model="page"
      :max="characters.info.pages || 1"
      :max-pages="10"
      color="secondary"
      class="row justify-center q-mt-lg"
      direction-links
    />
  </q-page>
</template>
