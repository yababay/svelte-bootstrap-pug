<script>
    import showdown from 'showdown'

    const converter = new showdown.Converter()

    export let link

    const fetched = fetch(`content/${link}${link.endsWith(".md") ? "" : ".md"}`)
        .then(res => res.text())
        .then(txt => converter.makeHtml(txt))

</script>

<section class="container">
    {#await fetched}
        <article>
            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </article>
    {:then markup}
        <article>{@html markup}</article>
    {:catch error}
        <article>
            <div class="alert alert-danger text-center" role="alert">
              Ошибка при загрузке контента.
            </div>
        </article>
    {/await}
</section>    

<style>
    article {margin-top: 2rem; max-width: 732px;}
</style>
