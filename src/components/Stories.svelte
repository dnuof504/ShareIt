<script lang='ts'>
    import {deleteSingleStory, fetchAllStories} from "../../server"
	import { loggedAs, stories, coverIsChanged } from "../store";
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
<div class="flex flex-col items-center justify-center gap-4">
    <AddStories/>
    <StoriesQueries />
</div>