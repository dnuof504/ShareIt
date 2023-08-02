<script lang='ts'>
    import { getStoriesByCategory } from '../../server'; 
    import { getContext} from 'svelte';
    import { category_slug} from '../store'

    let categoryName:string = getContext('category_name')
    let stories:any= [];
  
    category_slug.subscribe((newCategory)=>{
      getStoriesByCategory(newCategory)
        .then((fetchedStories)=>{
            stories=fetchedStories!
        })
})


  </script>


<ul>
  {#each stories as story}
    <li>{story.body}</li>
  {/each}
</ul>
