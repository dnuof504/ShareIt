<script>
    import { setContext } from 'svelte';
    import CategoryPage from "../../../components/CategoryPage.svelte";

    export let data;
    setContext('category_name', data.params.slug)

</script>

<CategoryPage />