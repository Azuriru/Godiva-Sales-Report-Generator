<script lang="ts">
    export let title: string;
</script>

<div class="group">
    <div class="title">{title}</div>
    <div class="inputs">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    .title {
        text-transform: uppercase;
        margin: 0 4px 8px;
        font-size: 20px;
    }

    .group {
        display: flex;
        flex-direction: column;
        width: 300px;
        flex-shrink: 0;
        margin: 0 0 40px;
        max-width: 100%;
    }

    .group:not(:last-of-type) {
        padding-right: 40px;
    }
</style>