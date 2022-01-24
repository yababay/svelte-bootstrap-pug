<script>
    import AsideItem from './AsideItem.svelte'
    export let links
</script>

{#each links as link}
    <AsideItem {...link} />
{/each}

