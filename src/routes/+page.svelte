<script async script lang="ts">
	import Pokecard from '$lib/components/Pokecard.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Combobox from '$lib/components/Combobox.svelte';
	import type { IndexPokemon } from '$lib/types/pokemon';
	import { onMount } from 'svelte';
	import type { Region } from '$lib/types/region';
	import { getPokemonRegions, getPokemonsByRegion } from '$lib/api/pokemonApi';

	let pokemonList: IndexPokemon[] = [];
	let regionList: Region[] = [];
	let pokemonRegionsNames: any = [];
	let pokemonNameSearch = '';
	let pokemonRegionSelection = 'Kanto';
	let filteredPokemon: any;

	$: selectedRegionId =
		regionList.find((region) => region.name === pokemonRegionSelection)?.id || '1';

	$: {
		filteredPokemon = pokemonNameSearch
			? pokemonList.filter((pokemon) =>
					pokemon.name.toLowerCase().includes(pokemonNameSearch.toLowerCase())
			  )
			: [...pokemonList];
	}

	$: {
		if (selectedRegionId) {
			(async () => {
				pokemonList = await getPokemonsByRegion(selectedRegionId);
			})();
		}
	}

	onMount(async () => {
		const regions = await getPokemonRegions();
		regionList = regions;
		pokemonRegionsNames = regions.map((region) => {
			return { name: region.name, value: region.name, id: region.id };
		});

		const pokemons = await getPokemonsByRegion(selectedRegionId);
		pokemonList = pokemons;
	});
</script>

<!-- Header -->
<div class="sticky top-0 bg-[#e4e6ee] w-full z-30 py-2 shadow-md">
	<div class="flex justify-center">
		<div class="flex justify-center w-full max-lg:flex-wrap max-lg:gap-2 gap-10">
			<p class="flex items-center">Filtrar por:</p>
			<Searchbar bind:searchString={pokemonNameSearch} placeholder="Pokémon..." />

			<p class="flex items-center">Region:</p>
			<Combobox
				bind:comboboxSelection={pokemonRegionSelection}
				comboboxItems={pokemonRegionsNames}
			/>
		</div>
	</div>
	<div class="bg-gray-300 w-full h-px absolute bottom-0" />
</div>

<!-- Pokemons -->
<div class="m-5">
	<div class="flex justify-center">
		<div class="flex flex-row flex-wrap justify-evenly gap-9 w-full">
			{#each filteredPokemon as pokemon}
				<Pokecard
					pokemonId={pokemon.id}
					pokemonName={pokemon.name}
					pokemonSprite={pokemon.image}
					{pokemon}
				/>
			{/each}
		</div>
	</div>
</div>
