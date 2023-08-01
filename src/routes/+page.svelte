<script lang='ts'>
	import Categories from "../components/Categories.svelte";
	import Comments from "../components/Comments.svelte";
	import Main from "../components/Main.svelte";
	import Users from "../components/Users.svelte";
	import "../../dist/output.css"
	import {ourUser} from "../store"
	// import "../main.css"
</script>

<h1>Logged in as {$ourUser}</h1>
<Main/>
<div class="text-3xl">
<Comments />
</div>
<Users />
<Categories />

