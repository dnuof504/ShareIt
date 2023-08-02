<script lang='ts'>
    import { getStoriesByCategory } from '../../server'; 
    import { getContext} from 'svelte';

    let categoryName:string = getContext('category_name')
    let stories:any= [];

    getStoriesByCategory(categoryName)
    .then((fetchedStories)=>{
        stories=fetchedStories!
    })


  </script>

<ul>
  {#each stories as story}
    <li>{story.body}</li>
  {/each}
</ul>