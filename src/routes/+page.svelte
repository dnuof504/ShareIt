<script lang='ts'>
	import Categories from "../components/Categories.svelte";
	import Main from "../components/Main.svelte";

	import {fetchAllStories} from "../../server"
	import { stories } from "../store";
	import StoryCard from "../components/StoryCard.svelte";
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

<main  class="flex items-center justify-center py-4 md:py-10 flex-wrap gap-20 mb-3 mx-auto">
	<div>
		<Main />
	</div>

	<ul class="grid grid-cols-2 gap-4 place-content-center h-100 ...">
		{#if renderStories.length}
		{#each renderStories as story}
		<StoryCard title={story.title} id={story.story_id} body={story.body} img_url={story.img_url} username={renderStories.username}/>
		{/each}
		{/if}
	</ul>

</main>