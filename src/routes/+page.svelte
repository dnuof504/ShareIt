<script lang='ts'>
	import Categories from "../components/Categories.svelte";
	import Comments from "../components/Comments.svelte";
	import Main from "../components/Main.svelte";
	import Users from "../components/Users.svelte";
	import "../../dist/output.css"
	// import "../main.css"
</script>


<Main/>
<div class="text-3xl">
<Comments />
</div>
<Users />
<Categories />

