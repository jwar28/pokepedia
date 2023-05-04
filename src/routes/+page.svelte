<script lang="ts">
	import Pokecard from '$lib/components/Pokecard.svelte';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Combobox from '$lib/components/Combobox.svelte';

	export let data: PageData;

	let pokemonNameSearch: string = '';
	let pokemonRegionSelection: string = 'Region';
	let pokemonTypeSelection: string = 'Tipo';

	let pokemonNames: AutocompleteOption[] = data.pokemons.map((pokemon) => {
		return { label: pokemon.name, value: pokemon.id };
	});

	let onPokemonSelection = (event: any): void => {
		pokemonNameSearch = event.detail.label;
	};

	let pokemonRegions = data.regions.map((region) => {
		return { name: region.name, value: region.id };
	});
</script>

<!-- Header -->
<div class="sticky top-0 bg-[#e4e6ee] w-full z-30 py-5">
	<div class="flex justify-center">
		<div class="flex justify-center w-full max-lg:flex-wrap max-lg:gap-2 gap-10 z-40">
			<p class="flex items-center">Filtrar por:</p>
			<Searchbar
				autocompleteOptions={pokemonNames}
				searchString={pokemonNameSearch}
				onSelection={onPokemonSelection}
				placeholder="Pokémon..."
			/>

			<Combobox bind:comboboxItems={pokemonRegions} comboboxValue={pokemonRegionSelection} />
		</div>
	</div>
	<div class="bg-gray-300 w-full h-px absolute bottom-0" />
</div>

<!-- Pokemons -->
<div class="m-5">
	<div class="flex justify-center">
		<div class="flex flex-row flex-wrap justify-evenly gap-9 w-[90%]">
			{#each data.pokemons as pokemon}
				<Pokecard pokemonId={pokemon.id} pokemonName={pokemon.name} pokemonSprite={pokemon.image} />
			{/each}
		</div>
	</div>
</div>
