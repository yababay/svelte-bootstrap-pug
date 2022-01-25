<script>
    import settings from '../settings.json'
    import NavbarItem from './NavbarItem.svelte'
</script>

{#each settings.navbarLinks as link}
    <NavbarItem {...link} />
{/each}

