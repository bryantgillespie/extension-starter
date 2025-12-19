<script setup lang="ts">
defineProps<{
	value: string | null;
	placeholder?: string;
	disabled?: boolean;
}>();

const emit = defineEmits<{
	input: [value: string | null];
}>();
</script>

<template>
	<v-input
		:model-value="value"
		:placeholder="placeholder"
		:disabled="disabled"
		@update:model-value="emit('input', $event)"
	/>
</template>
