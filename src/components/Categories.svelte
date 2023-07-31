<script lang='ts'>
	import { fetchAllCategories } from "../../server";
	import type { Category } from "./interfaces";


let category : Category[] | [] = [];

fetchAllCategories()
.then((data)=>{
    category = data!
})
</script>

<section class='home'>
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