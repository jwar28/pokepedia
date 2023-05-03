<script lang="ts">
	import type { PageData } from './$types';
	import { generations } from './generations';

	export let data: PageData;
</script>

<div>
	<div class="flex justify-center mt-2"><p>Inicio</p></div>

	{#each data.monsters as monster (monster.id)}
		<p>{monster.id}: {monster.name}</p>
	{/each}

	{#each generations as generation (generation.id)}
		<h1>{generation.name}</h1>
		<p>Games: {generation.games.join(', ')}</p>
		<p>Main region: {generation.main_region}</p>
	{/each}
</div>
