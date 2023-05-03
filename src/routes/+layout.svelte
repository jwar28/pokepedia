<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import Header from '../components/Header.svelte';

	function drawerOpen(): void {
		drawerStore.open({});
	}
</script>

<Drawer><Navigation /></Drawer>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header"
		><AppBar background="bg-[#d6320c]" padding="p-1"
			><svelte:fragment slot="lead">
				<div class="flex items-center justify-center">
					<button class="lg:hidden btn btn-sm" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
				</div>
			</svelte:fragment>
			<div class="flex justify-between items-center max-lg:justify-center">
				<Header />

				<div class="max-lg:hidden w-1/2">
					<Navigation />
				</div>
			</div>
		</AppBar></svelte:fragment
	>
	<!-- Router Slot -->
	<div class="bg-black w-full h-1 absolute" />

	<div class="flex h-full w-full justify-center items-center">
		<div class="bg-white w-[95%] h-[90%] m-10 shadow-xl max-md:mx-2 max-md:mt-10">
			<slot />
		</div>
	</div>

	<div class="bg-gray-300 w-full h-px absolute" />
	<!--  footer  -->
	<svelte:fragment slot="footer">
		<div class="flex justify-center h-10">
			<button>
				<a href="https://github.com/jwar28" target="_blank"
					><img
						src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
						class="w-6 h-auto"
						alt="github-logo"
					/></a
				>
			</button>
		</div></svelte:fragment
	>
</AppShell>
