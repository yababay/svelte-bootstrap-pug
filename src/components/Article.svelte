<script>
    //import ArticleEditor from './ArticleEditor.svelte'
    //import ArticleViewer from './ArticleViewer.svelte'
    import DangerRouter from '../router/DangerRouter'
    import Showdown from 'showdown'
    
    const converter = new Showdown.Converter()

    export let link, local
    let editing = false

    async function getContent() {
        const url = `${link}?r=${Math.random()}`
        try {
            const res = await fetch(url)
            if(res.status > 299) throw "Не удалось загрузить запрашиваемый ресурс."
            let content = await res.text()
            return content
        }
        catch(err){
            DangerRouter.showError(err)
            return ''
        }
    }

    const viewerParams = {content, link, local}
    const editorParams = {content, link, local}
</script>

{#await getContent() then text}
    {@html converter.makeHtml(text)}
{/await}
<!--
{#if editing}
    <ArticleEditor {...editorParams} />
{:else}
    <ArticleViewer {...viewerParams} />
{/if}
-->
