<script lang="ts">
	import type { IndexPokemon } from '$lib/types/pokemon';

	export let pokemon: IndexPokemon;
</script>

<a class="block card card-hover p-5 shadow-md" href={`/pokemon/${pokemon.id}`}>
	<div class="flex justify-between items-center w-80 overflow-hidden">
		<div class="w-full">
			<p>#{pokemon.id}</p>
			<p>{pokemon.name}</p>
		</div>
		<img src={pokemon.image} alt={pokemon.name} class="h-40 w-40" />
	</div>
</a>
