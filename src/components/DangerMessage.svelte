<script>
    import closeOffcanvas from '../router/util'
    export let message
</script>

<div class="alert alert-danger text-center mt-3" role="alert">
    {message + closeOffcanvas()}
</div>