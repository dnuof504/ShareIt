<script lang='ts'>
    import type { Stories } from './interfaces';
    import { getContext } from 'svelte';
    import { loggedAs } from "../store"
    let slug: number = getContext('slug')
    let story: Stories [] | [] = [];

    console.log($loggedAs)
    import { fetchSingleStory } from '../../server';
    fetchSingleStory(slug)
    .then((fetchedStory)=>{
        story=fetchedStory!;
    })

</script>

<section>
    <ul>
        {#if story.length}
        {#each story as story}
        <li>
            {story.title}
        </li>
        <li>
            {story.body}
        </li>
        <li>
            Author: {story.username}
        </li>
        <li>
            <img src='' alt="this is something that we can see"/>
        </li>
        <li>
            Posted at: {story.created_at}
        </li>
        <li>
            🫣{story.votes}
        </li>
        <li>
            Category: {story.category_name}
        </li>
        {/each}
        {/if}
    </ul>

    
</section>