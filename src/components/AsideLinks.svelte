<script>
    import settings from '../settings.json'
    import Icon from '@yababay67/svelte-meets-bootstrap-icons/book.svelte'
</script>

{#each settings.asideLinks as link}
    <li>
        <a href={link.link} class="nav-link link-secondary">
            <Icon size="24" />
            {link.title}
        </a>
    </li>
{/each}
