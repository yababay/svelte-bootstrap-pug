<script>
    import { onDestroy } from 'svelte'
    export let content, close, file
    let editor
    onDestroy(async ()=>{
        const res = await fetch(`/api/save/${file}`, {
            method: 'post', 
            headers: {"Content-Type": "text/plain"}, 
            body: editor.value.trim() + '\n'
        })
        if(res.status != 200) return alert('Не удалось сохранить файл.')
    })
</script>


{#await content() then content}
    <textarea class="form-control editor" bind:this={editor}>{content + close()}</textarea>
{:catch error}
    <div class="alert alert-danger text-center mt-3" role="alert">
        {error + close()}
    </div>
{/await}

<style>
    .editor {
        width: 100%;
        height: '480px'
    }
</style>
