<script lang="ts">
	export let searchString: string;
	export let placeholder: string;
</script>

<input class="input w-80 py-3" type="search" bind:value={searchString} {placeholder} />
