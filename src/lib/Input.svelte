<script lang="ts">
    export let type: string;
    export let label: string;
    export let value: string | number;
    export let arrows: boolean = false;

    function rotateValue(increment: number) {
        (value as number) += increment;
    }

    function setType(node: HTMLInputElement) {
        node.type = type;
    }
</script>

<div class="input">
    <div class="label">{label}</div>
    {#if type == 'text'}
        <input type="text" bind:value />
    {:else if type == 'number'}
        <input type="number" bind:value />
    {/if}
    {#if arrows}
        <div class="arrows">
            <button class="up" on:click={() => rotateValue(1)} />
            <button class="down" on:click={() => rotateValue(-1)} />
        </div>
    {/if}
</div>

<style lang="scss">
    .label {
        font-variant: all-small-caps;
        padding: 0px 4px 2px;
    }

    .input {
        margin-bottom: 8px;
        font-size: 20px;
    }

    input:enabled:read-write:-webkit-any(
            :focus,
            :hover
        )::-webkit-inner-spin-button {
        display: none;
    }

    input:is([type="number"]) {
        background: rgb(255 255 255 / 10%);
        padding: 2px 4px;
        font-family: monospace;
        width: 100%;
    }
</style>
