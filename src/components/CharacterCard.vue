<script setup lang="ts">
defineProps<{
  character: {
    id?: string | null;
    name?: string | null;
    image?: string | null;
    status?: string | null;
    species?: string | null;
  };
}>();
</script>
<template>
  <q-card
    class="character-card cursor-pointer"
    flat
    bordered
    style="width: 200px; height: 320px; border-radius: 15px"
  >
    <q-img
      :src="character.image ?? ''"
      no-spinner
      :alt="character.name ?? 'Rick And Morty Character'"
      ratio="1"
    />

    <q-card-section class="text-center">
      <div class="text-subtitle1 text-weight-bold">{{ character.name ?? 'Desconhecido' }}</div>
      <div class="text-caption">
        {{ character.species ?? 'Espécie desconhecida' }} -
        {{ character.status ?? 'Status desconhecido' }}
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.character-card {
  transition: transform 0.2s ease;
}

.character-card:hover {
  transform: scale(1.05);
}
</style>
