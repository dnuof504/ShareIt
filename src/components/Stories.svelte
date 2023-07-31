
<script lang='ts'>
    import {fetchAllStories} from "../../server"
    import type { Stories } from "./interfaces"

let stories: Stories[] | [] = [];

fetchAllStories()
    .then((data)=>{
        stories = data!
    })
</script>

<ul>
    {#if stories.length}
    {#each stories as stories}
    <li>
        {stories.body}
    </li>
    {/each}
    {/if}
</ul>