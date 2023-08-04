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
<form class="flex flex-col items-center justify-center" on:submit|preventDefault={handleSubmit}>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <Label for="first_name" class="mb-2">First name</Label>
        <Input type="text" id="first_name" placeholder="John" bind:value={$message.firstName} required />
      </div>
      <div>
        <Label for="last_name" class="mb-2">Last name</Label>
        <Input type="text" id="last_name" placeholder="Doe" bind:value={$message.lastName} required />
      </div>
    </div>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" id="email" placeholder="john.doe@company.com" class='w-96' bind:value={$message.email} required />
    </div>
    <div>
        <Label for="message" class="mb-2">Your message</Label>
        <Textarea id="message" class='w-96' placeholder="Your message" bind:value={$message.message}/>
    </div>
    <Button type="submit" class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5">Submit</Button>
  </form>