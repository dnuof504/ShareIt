<script lang='ts'>
    import { Card } from "flowbite-svelte";
    let hCard = false;
    export let title: string;
    export let id: number;
    export let body: string;
</script>

<Card img={`https://picsum.photos/10${id}`} href={`/stories/${id}`} horizontal>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
      {body.slice(0, 35)}...
    </p>
</Card>