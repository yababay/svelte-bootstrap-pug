<script>
    import Article from '../components/Article.svelte'

    export let link, local
    export let prefix = 'content'
    let editing = false

    const fileName = `${link}${link.endsWith(".md") ? "" : ".md"}`
    link = `${prefix}/${fileName}`
    
    const tocClose = document.querySelector('#toc-offcanvas .btn-close')

    function closeOffcanvas(){
        if(tocClose) tocClose.click()
        return ''
    }

</script>

<section class="container comfortable-reading">
    {#if local}
        <div class="text-end button-holder">
            <button class="btn btn-primary same-width" on:click={e => editing = !editing}>{editing ? "Сохранить" : "Редактировать"}</button>
        </div>
    {/if}
    <Article link={link} editing={editing} close={closeOffcanvas} file={fileName}/>
</section>    

<style>
    .button-holder {
        margin: 2rem 0;
    }
    .same-width {
        width: 12rem;
    }
</style>

