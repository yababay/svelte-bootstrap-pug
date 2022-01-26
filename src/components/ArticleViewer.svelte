<script>
    import Showdown from 'showdown'
    const converter = new Showdown.Converter()
    export let content, close
</script>

{#await content() then content}
    {@html converter.makeHtml(content) + close()}
{:catch error}
    <div class="alert alert-danger text-center mt-3" role="alert">
        {error + close()}
    </div>
{/await}

