<script>
    import Initializer from '../components/Initializer.svelte'
    //import Editor from '../components/Editor.svelte'

    export let link
</script>    

{#if link == '/api/initialize'}
    <Initializer />
{/if}

<!--
{#if link == '/api/editor'}
    <Editor />
{/if}
-->

