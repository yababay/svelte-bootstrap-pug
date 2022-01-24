<script>
    import BootstrapIcon from './BootstrapIcon.svelte'
    export let link, icon, title, style
    const size = 24
    const params = {icon, size}
</script>

<li>
    <a href={link} class={`nav-link link-${style || 'secondary'}`}>
        <BootstrapIcon {...params}/>
        {title}
    </a>
</li>

