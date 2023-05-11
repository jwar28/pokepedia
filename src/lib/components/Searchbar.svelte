<script lang="ts">
	export let searchString: string;
	export let placeholder: string;
</script>

<input class="input autocomplete w-80" type="search" bind:value={searchString} {placeholder} />
