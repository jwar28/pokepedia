<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Combobox from '$lib/components/Combobox.svelte';
	import type { CustomItem } from '$lib/types/item';

	export let data: PageData;

	const itemsList = data.items;

	let itemSearch: string = '';
	let filteredItem: CustomItem[] = [];

	let selectedItem: string = 'All';

	let itemCategories = Array.from(new Set(itemsList.map((item) => item.category))).map(
		(category) => ({
			name: category,
			value: category
		})
	);

	itemCategories.unshift({
		name: 'All',
		value: 'All'
	});

	let page = {
		offset: 0,
		limit: 5,
		size: itemsList.length,
		amounts: [1, 2, 3, 4, 5, 10]
	};

	$: {
		filteredItem = itemSearch
			? itemsList.filter((item) => item.name.toLowerCase().includes(itemSearch.toLowerCase()))
			: [...itemsList];

		if (selectedItem && selectedItem !== 'All') {
			filteredItem = filteredItem.filter((item) =>
				item.category.toLowerCase().includes(selectedItem.toLowerCase())
			);
		}

		page.size = filteredItem.length;
	}

	$: paginatedSource = filteredItem.slice(
		page.offset * page.limit,
		page.offset * page.limit + page.limit
	);
</script>

<div class="sticky top-0 bg-[#e4e6ee] w-full z-30 py-2 shadow-md">
	<div class="flex justify-center">
		<div class="flex justify-center w-full max-lg:flex-wrap max-lg:gap-2 gap-10">
			<p class="flex items-center">Filter:</p>
			<Searchbar bind:searchString={itemSearch} placeholder="Item..." />

			<p class="flex items-center">Category:</p>
			<Combobox
				bind:comboboxSelection={selectedItem}
				comboboxName="RegionCombobox"
				comboboxItems={itemCategories}
			/>
		</div>
	</div>
	<div class="bg-gray-300 w-full h-px absolute bottom-0" />
</div>

<div class="w-full flex justify-center items-center overflow-hidden">
	<div class="max-sm:mx-5 md:w-[75%] my-5">
		<div class="table-container">
			<table class="table table-compact shadow-md">
				<thead>
					<tr>
						<th class="w-72">Name</th>
						<th class="w-72">Category</th>
						<th class="max-sm:hidden">Effect</th>
					</tr>
				</thead>
				<tbody>
					{#each paginatedSource as item}
						<tr>
							<td>
								<div class="flex items-center gap-1 flex-wrap w-fit">
									<span>#{item.id}</span>
									<img src={item.sprite} alt="sprite" />
									<span>{item.name}</span>
								</div>
							</td>
							<td class="max-sm:table-cell-fit">{item.category}</td>
							{#if item.effect}
								<td class="max-sm:hidden">{item.effect}</td>
							{:else}
								<td class="max-sm:hidden">No info</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="my-5">
				<Paginator bind:settings={page} />
			</div>
		</div>
	</div>
</div>
