<script>
    import Showdown from 'showdown'
    
    const converter = new Showdown.Converter()
    export let content, link, local
</script>

{#await content() then content}
    {@html converter.makeHtml(content)}
{/await}

