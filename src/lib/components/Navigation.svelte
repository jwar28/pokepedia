<script>
	import NavLink from './NavLink.svelte';
</script>

<nav class="list-nav">
	<ul
		class="lg:flex lg:justify-evenly lg:items-center lg:text-white max-sm:p-5 max-sm:flex max-sm:flex-col max-sm:gap-5"
	>
		<li>
			<NavLink href="/">Home</NavLink>
		</li>
		<li>
			<NavLink href="/items">Items</NavLink>
		</li>
		<li>
			<NavLink href="/randomizer">Randomizer</NavLink>
		</li>
	</ul>
</nav>
