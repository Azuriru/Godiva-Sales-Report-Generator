<script lang="ts">
    import Group from "./Group.svelte";
    import Input from "./Input.svelte";

    let value1 = "abc";
    let value2 = "def";
    let x = 1;
</script>

<Group title="Main group lol">
    <Input label="First input" bind:value={value1} />
    <Input label="Second input" bind:value={value2} />

    {#each value1 as char, i}
        <div>{char} {i}</div>
    {/each}
</Group>

{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}

<style lang="scss">
    .hehe {
        color: red;

        &:hover {
            text-shadow: #fff 0 0 5px;
        }
    }
</style>
