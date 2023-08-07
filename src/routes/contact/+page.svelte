<script lang="ts">
	import { Button, Label, Input, Textarea} from "flowbite-svelte";
    import { message } from "../../store";


function handleSubmit() {
    alert("Message submitted!")
    $message.firstName = ''
    $message.lastName = ''
    $message.email = ''
    $message.message = ''
}

</script>

<h1 class="text-5xl text-center my-10">Contact us</h1>
<form class="flex flex-col max-w-md mx-auto gap-2 " on:submit|preventDefault={handleSubmit}>
   
      <div>
        <Label for="first_name" class="mb-2">First name</Label>
        <Input type="text" id="first_name" placeholder="John" bind:value={$message.firstName} required />
      </div>
      <div>
        <Label for="last_name" class="mb-2">Last name</Label>
        <Input type="text" id="last_name" placeholder="Doe" bind:value={$message.lastName} required />
      </div>

    <div>
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" id="email" placeholder="john.doe@company.com"  bind:value={$message.email} required />
    </div>
    <div>
        <Label for="message" class="mb-2">Your message</Label>
        <Textarea id="message"  placeholder="Your message" bind:value={$message.message}/>
    </div>
    <Button type="submit" class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5">Submit</Button>
  </form>