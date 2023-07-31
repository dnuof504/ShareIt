<script lang='ts'>
    import { fetchAllCategories, fetchAllComments, fetchAllStories, fetchAllUsers } from "../../server";
    import type { Comments, Stories, Category, Users } from "./interfaces";
    
    let comments: Comments[] | [] = [];
    let stories: Stories[] | [] = [];
    let category : Category[] | [] = [];
    let users: Users[] | [] = [];

    fetchAllComments()
    .then((data)=>{
        comments = data!
    })

    fetchAllStories()
    .then((data)=>{
        stories = data!
    })

    fetchAllCategories()
    .then((data)=>{
        category = data!
    })

    fetchAllUsers()
    .then((data)=>{
        users = data!
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
    <ul>
        {#if stories.length}
        {#each stories as stories}
        <li>
            {stories.body}
        </li>
        {/each}
        {/if}
    </ul>
    <ul>
        {#if users.length}
        {#each users as user}
        <li>
            {user.username}
        </li>
        {/each}
        {/if}
    </ul>
    <ul>
        {#if category.length}
        {#each category as category}
        <li>
            {category.slug}
        </li>
        {/each}
        {/if}
    </ul>
</section>