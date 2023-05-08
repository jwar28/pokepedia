<script async script lang="ts">
	import Pokecard from '$lib/components/Pokecard.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Combobox from '$lib/components/Combobox.svelte';
	import type { IndexPokemon } from '$lib/types/pokemon';
	import type { Region } from '$lib/types/region';
	import { getAllPokemons, getPokemonsByRegion } from '$lib/api/pokemonApi';
	import type { PageData } from './$types';
	import { selectedRegion, selectedRegionName } from '$lib/stores/regionStore';

	export let data: PageData;

	let pokemonList: IndexPokemon[] = data.pokemonList;
	let filteredPokemon: IndexPokemon[];
	let pokemonNameSearch: string = '';

	let regionList: Region[] = data.regionsList;
	let regionName;
	selectedRegionName.subscribe((value) => {
		regionName = value;
	});
	let pokemonRegionSelection: string = regionName || '- All -';
	let regionComboboxOptions = data.regionComboboxOptions;

	$: selectedRegionId = regionList.find((region) => region.name === pokemonRegionSelection)?.id;

	$: {
		filteredPokemon = pokemonNameSearch
			? pokemonList.filter((pokemon) =>
					pokemon.name.toLowerCase().includes(pokemonNameSearch.toLowerCase())
			  )
			: [...pokemonList];
	}

	const setRegionStoresById = (selectedRegionId: string) => {
		selectedRegion.set(selectedRegionId);
		selectedRegionName.set(regionList.find((region) => region.id === selectedRegionId)?.name || '');
	};

	$: {
		if (selectedRegionId) {
			(async () => {
				pokemonList = await getPokemonsByRegion(selectedRegionId);
				setRegionStoresById(selectedRegionId);
			})();
		}

		if (selectedRegionId?.includes('0')) {
			(async () => {
				pokemonList = await getAllPokemons();
				setRegionStoresById(selectedRegionId);
			})();
		}
	}
</script>

<!-- Header -->
<div class="sticky top-0 bg-[#e4e6ee] w-full z-30 py-2 shadow-md">
	<div class="flex justify-center">
		<div class="flex justify-center w-full max-lg:flex-wrap max-lg:gap-2 gap-10">
			<p class="flex items-center">Filter:</p>
			<Searchbar bind:searchString={pokemonNameSearch} placeholder="Pokémon..." />

			<p class="flex items-center">Region:</p>
			<Combobox
				bind:comboboxSelection={pokemonRegionSelection}
				comboboxItems={regionComboboxOptions}
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
