<script>
    const NONE = 0
    const ERR  = 1
    const OK   = 2
    
    let form, messages, link
    let state = 0

    async function send(e){
        e.preventDefault()
        const title = form.title.value
        if(title.trim().length < 6) return alert('Слишком короткий заголовок')
        const date = form.date.value
        const url = new URL(document.URL)
        url.hash = ''
        url.pathname = "/api/initialize"    
        url.searchParams.set('title', title)    
        url.searchParams.set('date', date)    
        const res = await fetch(url)
        if(res.status != 200) {state = ERR; return}
        link = await res.text()
        state = OK
    }

    function cleanForm(e){
        e.preventDefault()
        form.reset()
        state = NONE
    }

</script>

<form action="/api/initialize" bind:this={form} on:submit={send}>
    <fieldset class="fieldset">
        <legend>Создать новый текст</legend>
        <p>
            <input name="title"  class="form-control" placeholder="Заголовок">
        </p>
        <p>
            <input name="date" class="form-control" placeholder="Дата публикации">
        </p>
        <p class="text-end">
            <input type="submit" class="btn btn-primary mb-3" value="Выгрузить">
        </p>
    <fieldset>
</form> 

<div class="container">
    {#if state == ERR}
        <div class="alert alert-danger text-center mt-3" role="alert">
            <span>Не удалось создать материал. Убедитесь, что запущен соответствующий сервис.</span>
            <a href="#clean" class="link link-danger fw-bold" on:click={cleanForm}>Очистить форму.</a>
        </div>
    {/if}

    {#if state == OK}
        <div class="alert alert-success text-center mt-3" role="alert">
            <span>
                Создан <a href={link} class="link-success">материал в статусе черновика</a>. 
                Он появится в списке после публикации.
            </span>
            <a href="#clean" class="link link-success fw-bold" on:click={cleanForm}>Очистить форму.</a>
        </div>
    {/if}
</div>

<style>
    .fieldset {
        max-width: 80ch;
        margin: 3rem auto;
    }
</style>
