<script lang='ts'>
    import { getStoriesByCategory } from '../../server'; 
    import { getContext} from 'svelte';
    import { category_slug} from '../store'

    let categoryName:string = getContext('category_name')
    let stories:any= [];
    let a
    getStoriesByCategory(categoryName)
    .then((fetchedStories)=>{
        stories=fetchedStories!
    })
    category_slug.subscribe((value)=>{
      a = value
    })

  </script>

{#key a}
<ul>
  {#each stories as story}
    <li>{story.body}</li>
  {/each}
</ul>
{/key}