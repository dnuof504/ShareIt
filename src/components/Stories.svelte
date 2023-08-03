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

async function handleDeleteClick(story_id : number){
await deleteSingleStory(story_id)

await fetchAllStories().then((responseStories) => {
    renderStories = responseStories
})

}
</script>

<ul>
    <AddStories/>
    {#if renderStories.length}
    {#each renderStories as story}
    <StoryCard title={story.title} id={story.story_id} body={story.body}/>
    {#if $loggedAs === story.username} 
    <button type="button"
    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
     on:click={() => handleDeleteClick(story.story_id)}>Delete Story</button>
    {/if}
    {/each}
    {/if}
</ul>