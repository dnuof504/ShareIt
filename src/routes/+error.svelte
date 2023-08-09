<script lang='ts'>
    import { page } from '$app/stores';
	import Error from '../components/Error.svelte';
    const msg: any = $page.error?.message
    const status = $page.status
</script>
  <Error status={status} msg={msg} />