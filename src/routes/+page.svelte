<script lang='ts'>
	import { get } from "svelte/store";
	import Categories from "../components/Categories.svelte";
	import Comments from "../components/Comments.svelte";
	import Main from "../components/Main.svelte";
	import Users from "../components/Users.svelte";
	import "../../dist/output.css"
	import {loggedAs} from "../store"
</script>
{#if $loggedAs}
<h1>Logged in as {$loggedAs}</h1>
{/if}
<Main/>

<Comments />

<Users />
<Categories />
