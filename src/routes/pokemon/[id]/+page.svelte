<script lang="ts">
	import type { Pokemon } from 'pokenode-ts';
	import type { PageData } from '../$types';
	import PokemonStatCard from '$lib/components/PokemonStatCard.svelte';

	export let data: PageData;

	let pokemon: Pokemon = data.pokemon;
</script>

<div class="flex justify-center items-center h-full">
	<div>
		<PokemonStatCard {pokemon} />
	</div>
</div>
