<script>
    import AsideLink from './AsideLink.svelte'
    export let links
</script>

{#each links as link}
    <AsideLink {...link} />
{/each}

