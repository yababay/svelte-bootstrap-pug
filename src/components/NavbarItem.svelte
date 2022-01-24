<script>
    import BootstrapIcon from './BootstrapIcon.svelte'
    export let link, icon, title 
    const size = 32
    const params = {size, icon, title}
</script>

<li class="navbar-item icon-holder ms-3">
    <a class="navbar-link link-secondary" href={link} target={link.startsWith('#') && "_self" || "_blank"}>
        <BootstrapIcon {...params} />
    </a>
</li>

