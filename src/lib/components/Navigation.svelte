<script>
	import { page } from '$app/stores';
</script>

<nav class="list-nav">
	<ul
		class="lg:flex lg:justify-evenly lg:items-center lg:text-white max-sm:p-5 max-sm:flex max-sm:flex-col max-sm:gap-5"
	>
		<li>
			<a href="/" class="hover:text-secondary-900">Home</a>
		</li>
		<li>
			<a
				href="/items"
				class:active={$page.url.pathname === '/items'}
				class="hover:text-secondary-900"
			>
				Items
			</a>
		</li>
		<li>
			<a
				href="/randomizer"
				class:active={$page.url.pathname === '/randomizer'}
				class="hover:text-secondary-900"
			>
				Randomizer
			</a>
		</li>
	</ul>
</nav>
