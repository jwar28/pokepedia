<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	const items = data.items;

	let page = {
		offset: 0,
		limit: 5,
		size: items.length,
		amounts: [1, 2, 3, 4, 5, 10]
	};

	$: paginatedSource = items.slice(page.offset * page.limit, page.offset * page.limit + page.limit);
</script>

<div class="h-full w-full flex justify-center items-center overflow-hidden p-5">
	<div class="mx-5 md:w-[75%]">
		<div class="table-container">
			<table class="table table-compact shadow-md">
				<thead>
					<tr>
						<th class="w-72">Name</th>
						<th class="w-72 max-sm:table-cell-fit">Category</th>
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
			<div class="my-2">
				<Paginator bind:settings={page} />
			</div>
		</div>
	</div>
</div>
