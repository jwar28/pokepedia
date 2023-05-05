<script lang="ts">
	import Pokecard from '$lib/components/Pokecard.svelte';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Combobox from '$lib/components/Combobox.svelte';

	export let data: PageData;

	let pokemonList = data.pokemons;
	let regionList = data.regions;

	let pokemonNameSearch: string = '';

	let pokemonRegionSelection: string = 'Kanto';

	let filteredPokemon: any;

	$: {
		filteredPokemon = pokemonNameSearch
			? pokemonList.filter((pokemon) =>
					pokemon.name.toLowerCase().includes(pokemonNameSearch.toLowerCase())
			  )
			: [...pokemonList];
	}

	let pokemonNames: AutocompleteOption[] = pokemonList.map((pokemon) => {
		return { label: pokemon.name, value: pokemon.id };
	});

	let onPokemonSelection = (event: any): void => {
		pokemonNameSearch = event.detail.label;
	};

	let pokemonRegions = regionList.map((region) => {
		return { name: region.name, value: region.name, id: region.id };
	});

	$: selectedGenerationId = regionList.find((region) => region.name === pokemonRegionSelection)?.id;
</script>

<!-- Header -->
<div class="sticky top-0 bg-[#e4e6ee] w-full z-30 py-5">
	<div class="flex justify-center">
		<div class="flex justify-center w-full max-lg:flex-wrap max-lg:gap-2 gap-10 z-40">
			<p class="flex items-center">Filtrar por:</p>
			<Searchbar
				autocompleteOptions={pokemonNames}
				bind:searchString={pokemonNameSearch}
				onSelection={onPokemonSelection}
				placeholder="Pokémon..."
			/>

			<p class="flex items-center">Region:</p>
			<Combobox comboboxItems={pokemonRegions} bind:comboboxValue={pokemonRegionSelection} />
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
