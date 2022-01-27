<script>
    import Initializer from '../components/Initializer.svelte'
    import Publish from '../components/Publish.svelte'
    export let link, local
</script>    

<section class="container comfortable-reading">
    {#if link == '/api/initialize'}
        <Initializer />
    {/if}
    {#if link == '/api/publish'}
        <Publish />
    {/if}
    {#if !local}
        <div class="alert alert-info text-center mt-3" role="alert">
            Сервис размещен на хостинге, отличном от `localhost`.
            Возможности API могут быть недоступны.
        </div>
    {/if}
</section>

