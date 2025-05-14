<script setup lang="ts">
import { Client, provideClient, cacheExchange, fetchExchange } from '@urql/vue';
import { useMeta } from 'quasar';

const client = new Client({
  url: 'https://rickandmortyapi.com/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

provideClient(client);

useMeta({
  title: 'EngagED Técnico',
});
</script>

<template>
  <router-view />
</template>
