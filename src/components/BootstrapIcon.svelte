<script>
    export let icon, size
    export let title = ''
</script>

<svg width={size} height={size}>
    <title>{title}</title>
    <use xlink:href={`#${icon}`} />
</svg>

