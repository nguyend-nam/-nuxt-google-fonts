<template>
  <div :class="props.class">
    <TypographyTitle :level="4" class="!font-medium !text-base">
      <slot name="title" />
    </TypographyTitle>
    <div class="rounded-md bg-blue-50 p-4">
      <pre class="whitespace-pre-wrap break-words text-[13px]"><code>{{ source }}</code></pre>
      <Button type="primary" class="mt-4" @click="() => copy()">
        {{ copied ? 'Copied!' : 'Copy' }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { Button, TypographyTitle } from 'ant-design-vue';

const props = defineProps<{
  source: string;
  class?: string;
}>();

definePageMeta({
  layout: 'font-detail',
});

const code = ref('');

watchEffect(() => {
  code.value = props.source;
});

const { copy, copied } = useClipboard({ source: code });
</script>

<style scoped></style>
