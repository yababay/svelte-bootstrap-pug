<script>
    import Icon from '@yababay67/svelte-meets-bootstrap-icons/github.svelte'

    export let link = '#/'
    export let title = 'Проект на Github&apos;е'
</script>

<li class="navbar-item icon-holder ms-3">
    <a class="navbar-link link-secondary" href={link} target="_blank">
        <Icon {title}/>
    </a>
</li>

