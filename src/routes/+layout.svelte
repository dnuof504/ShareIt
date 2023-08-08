<script>
	import NavBar from '../components/NavBar.svelte';
	import '../main.css';
</script>

<main>
	<NavBar />
	<div class="container mx-auto p-4">
		<slot />
	</div>
</main>
