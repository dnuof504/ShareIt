<script lang=ts>


import { loggedAs } from '../../src/store'
	import Login from './Login.svelte';

function handleClick (){
    loggedAs.set("Anonymous")
}
</script>
<section>
    {#if $loggedAs !== "Anonymous"}
<h2>Logged in as {$loggedAs}</h2>
<button on:click={handleClick} type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Logout</button>

    {:else}
    <a href="/signup"> Sign up</a>
{/if}
</section>