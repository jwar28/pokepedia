<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	const items = data.items;

	let page = {
		offset: 0,
		limit: 5,
		size: items.length,
		amounts: [1, 2, 3, 4, 5]
	};

	$: paginatedSource = items.slice(page.offset * page.limit, page.offset * page.limit + page.limit);
</script>

<div class="h-full w-full overflow-hidden">
	<div class="m-5">
		<div class="table-container">
			<table class="table table-comfortable shadow-md">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Category</th>
						<th>Effect</th>
					</tr>
				</thead>
				<tbody>
					{#each paginatedSource as item}
						<tr>
							<td>{item.id}</td>
							<td>
								<div class="flex items-center gap-3">
									<img src={item.sprite} alt="sprite" />
									<span>{item.name}</span>
								</div>
							</td>
							<td>{item.category}</td>
							<td>{item.effect}</td>
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
