<script lang="ts">
    import { Blockquote } from 'flowbite-svelte'
    import { fetchAllQuotes } from '../../server';
	import { onMount } from 'svelte';
    let quotes:[]|any = []
    let value:number = 0
    let singleQuote:any = null

  onMount(()=>{
    fetchAllQuotes()
    .then((data:any)=>{
      quotes = [...data]
      value = Math.ceil(Math.random() * (quotes.length))
      singleQuote = {
        body:quotes[value].body,
        author:quotes[value].author,
        author_picture:quotes[value].author_picture,
        author_position:quotes[value].author_position,
      } 

    })
    .catch((err)=>{
      console.log(err)
    })
  })


  </script>

{#if singleQuote !== null}
  <figure class="mx-auto max-w-screen-md text-center">
    <svg aria-hidden="true" class="mx-auto mb-3 w-12 h-12 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
    <Blockquote alignment="center" size='2xl'>
  
    {singleQuote.body}

    </Blockquote>
    <figcaption class="flex justify-center items-center mt-6 space-x-3">
      <img class="w-6 h-6 rounded-full" src={singleQuote.author_picture} alt="Micheal Gough profile">
      <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
          <cite class="pr-3 font-medium text-gray-900 dark:text-white">{singleQuote.author}</cite>
          <cite class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{singleQuote.author_position}</cite>
      </div>
    </figcaption>
  </figure>
  {/if}
