<script lang="ts">
  import { fetchAllStories, postStory } from "../../server";
  import { loggedAs, stories } from "../store";
  import { onDestroy } from 'svelte';
  import { Textarea, Label, Select, Input } from 'flowbite-svelte'



  let selected:any;
  let dropDownCategories = [
   
    {value:"workplace", name:"workplace"},
    {value:"family", name: "family"},
    {value:"romance", name: "romance"},
    {value:"friends", name:"friends"},
    {value:"pets", name: "pets"},
    {value:"general", name: "general"},
  ]




  let newStory = {
     title: "",
     username:$loggedAs,
     body:"",
     img_url:"",
     votes: 0,
     category_name: selected,

}

const unsubscribe = loggedAs.subscribe((newUser) => {
		newStory.username = newUser;
	});
	onDestroy(unsubscribe);


async function handleSubmit() {
   newStory.category_name = selected
	 await postStory(newStory).then(() => {
		 stories.update((newStory) => [...newStory]);
      console.log(newStory)
      newStory.body = ""
            newStory.title= ""  
            newStory.img_url = ""
            selected = ""
            
		})
    await fetchAllStories().then((data)=> {
         return stories
      })
	};
</script>

<form action="" on:submit|preventDefault={handleSubmit}>
  <div class='mb-6'>
    <Label for='title' class='block mb-2'>Title</Label>
    <Input type="text" id="title" size="lg" placeholder='title' class='w-96' bind:value={newStory.title} />
</div>
<Label for='story' class='block mb-2'>Story</Label>
  <Textarea id="story" class='w-96' bind:value={newStory.body} />
  <div class='mb-6'>
    <Label for='img_url' class='block mb-2'>Image url</Label>
    <Input type="text" id="img_url" size="lg" placeholder='image_url' class='w-96' bind:value={newStory.img_url} />
</div>
  <Label class='w-96'>Select a Category
    <Select class="form-select mt-2" items={dropDownCategories} bind:value={selected}  />
  </Label>
	<button
		type="submit"
		class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5"
		>Add Story</button
	>
</form>
