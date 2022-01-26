<script>
    import BootstrapIcon from './BootstrapIcon.svelte'
    export let link, icon, title 
    export let style = 'secondary'
    const size = 24
    const params = {icon, size}
</script>

<li>
    <a href={link} class={`nav-link link-${style}`}>
        <BootstrapIcon {...params}/>
        {title}
    </a>
</li>

