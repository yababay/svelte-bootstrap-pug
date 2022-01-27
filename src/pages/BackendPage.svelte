<script>
    import Initializer from '../components/Initializer.svelte'
    //import Editor from '../components/Editor.svelte'

    export let link
</script>    

<section class="container comfortable-reading">
    {#if link == '/api/initialize'}
        <Initializer />
    {/if}

    <!--
    {#if link == '/api/editor'}
        <Editor />
    {/if}
    -->
</section>

