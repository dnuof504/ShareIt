<script lang='ts'>
    import {fetchAllStories} from "../../server"
	import StoryCard from "./StoryCard.svelte";
    import type { Stories } from "./interfaces"

let stories: Stories[] | [] = [];

fetchAllStories()
    .then((data)=>{
        stories = data!
    })
</script>

<ul>
    {#if stories.length}
    {#each stories as story}
    <StoryCard title={story.title} id={story.story_id} body={story.body}/>
    {/each}
    {/if}
</ul>