<script lang='ts'>
    import { fetchAllStories} from "../../server"
	import { stories } from "../store";
	import AddStories from "./AddStories.svelte";
	import StoriesQueries from "./StoriesQueries.svelte";
    import {  onDestroy } from 'svelte';

let renderStories: any = [];

const unsubscribe = stories.subscribe(() => {
    fetchAllStories()
    .then((data)=>{
        renderStories = data!
    })
}) 

onDestroy(unsubscribe);

</script>
<ul class="flex flex-col items-center justify-center gap-4">
    <AddStories/>
    <StoriesQueries />
</ul>