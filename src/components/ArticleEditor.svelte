<script>
    import { onMount, onDestroy } from 'svelte'
    export let content, close, file
    let editor

    onMount(()=>{
        /*const main = document.querySelector('main')
        const editorBox = editor.getBoundingClientRect()
        const mainBox = editor.getBoundingClientRect()
        const top = editorBox.top - mainBox.top
        editor.height = (main.offsetHeight - top) * .9*/
    })

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
        max-width: 80ch;
        min-height: 640px;
        background-color: #282828;
        color: #ded795;
        margin: 0 auto;
    }
</style>
