<script lang='ts'>
    import {deleteSingleStory, fetchAllStories} from "../../server"
	import { loggedAs, stories } from "../store";
	import AddStories from "./AddStories.svelte";
	import StoryCard from "./StoryCard.svelte";
    import type { Stories } from "./interfaces"
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
    <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4 place-content-center h-100 ...">
    {#if renderStories.length}
    {#each renderStories as story}
    <StoryCard title={story.title} id={story.story_id} body={story.body} username={story.username}/>
    {/each}
    {/if}
</div>  
</div>