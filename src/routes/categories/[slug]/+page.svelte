<script>
    import { setContext } from 'svelte';
    import CategoryPage from "../../../components/CategoryPage.svelte";
	import { category_slug } from '../../../store';

    export let data;
    setContext('category_name', data.params.slug)
    category_slug.set(data.params.slug)
    
</script>

<CategoryPage />