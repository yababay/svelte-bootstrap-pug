<script>
    import ArticleEditor from './ArticleEditor.svelte'
    import ArticleViewer from './ArticleViewer.svelte'

    export let editing, link, close, file

    async function content() {
        const res = await fetch(link)
        if(res.status != 200) throw "Не удалось загрузить запрашиваемый ресурс."
        content = await res.text()
        close()
        return content
    }

    const viewerParams = {content, close}
    const editorParams = {content, close, file}
</script>

{#if editing}
    <ArticleEditor {...editorParams} />
{:else}
    <ArticleViewer {...viewerParams} />
{/if}

