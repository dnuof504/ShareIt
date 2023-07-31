<script lang='ts'>
    import { fetchAllComments, fetchAllStories } from "../../server";
    let comments: {}[] | [] = [];
    let stories: {}[] | [] = [];

    fetchAllComments()
    .then((data)=>{
        comments = data!
    })

    fetchAllStories()
    .then((data)=>{
        stories = data!
    })

</script>

<section class='home'>
    <ul>
        {#if comments.length}
        {#each comments as comments}
        <li>
            {comments.body}
        </li>
        {/each}
        {/if}
    </ul>
    <h1>This is the main component</h1>
    <ul>
        {#if stories.length}
        {#each stories as stories}
        <li>
            {stories.body}
        </li>
        {/each}
        {/if}
    </ul>
</section>