<script>
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';

	$: currentRoute = $page.url.pathname;
</script>

<nav class="list-nav">
	<ul
		class="lg:flex lg:justify-evenly lg:items-center lg:text-white max-sm:p-5 max-sm:flex max-sm:flex-col max-sm:gap-5"
	>
		<li>
			<a href="/" class="hover:text-secondary-900" on:click={drawerStore.close}>Home</a>
		</li>
		<li>
			<a href="/items" class="hover:text-secondary-900" on:click={drawerStore.close}> Items </a>
		</li>
		<li>
			<a href="/randomizer" class="hover:text-secondary-900" on:click={drawerStore.close}>
				Randomizer
			</a>
		</li>
	</ul>
</nav>
