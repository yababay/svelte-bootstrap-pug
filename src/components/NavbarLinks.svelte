<script>
    import settings from '../settings.json'
    import NavbarLink from './NavbarLink.svelte'

    const isLocal = document.URL.includes('localhost')
    const restrictedRemote = ['#/api/publish', '#/api/initialize']
    const noRestrictedRemote = el => !(restrictedRemote.includes(el.link) && !isLocal)
</script>

{#each settings.navbarLinks.filter(noRestrictedRemote) as link}
    <NavbarLink {...link} />
{/each}

