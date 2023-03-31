<script lang="ts">
    import { SOFTSERVE } from "./assets/data.json";
    import Input from "./lib/Input.svelte";
    import Group from "./lib/Group.svelte";

    let ssd = 0;
    let fd = 0;
    let bd = 0;

    // DC = Dark chocolate // CM = Caramel/Mixed
    let ssdc = 0;
    let sscm = 0;

    let ssMTD = 0;
    let foodMTD = 0;
    let beveragesMTD = 0;
    let retailMTD = 0;

    let cc = 0;
    let total = 0;
    let transactions = 0;
    let quantity = 0;
    let crm = 0;

    $: totalDiscount = [ssd, fd, bd].reduce((c, v) => c + v);

    $: ss = SOFTSERVE.DARKCHOCO * ssdc + SOFTSERVE.CARAMELMIX * sscm;
</script>

<div id="App">
    <div class="wrapper">
        <div class="header">Sales Report Generator</div>
        <div class="body">
            <Group title="Discounts">
                <Input type="number" label="Soft Serve" bind:value={ssd} />
                <Input type="number" label="Food" bind:value={fd} />
                <Input type="number" label="Beverages" bind:value={bd} />
            </Group>
            <Group title="Soft Serve">
                <Input
                    type="number"
                    label="Dark Chocolate"
                    bind:value={ssdc}
                    arrows={true}
                />
                <Input
                    type="number"
                    label="Caramel / Mixed"
                    bind:value={sscm}
                    arrows={true}
                />
            </Group>
            <Group title="Month To Dates">
                <Input
                    type="number"
                    label="Soft Serve MTD"
                    bind:value={ssMTD}
                />
                <Input type="number" label="Food MTD" bind:value={foodMTD} />
                <Input
                    type="number"
                    label="Beverages MTD"
                    bind:value={beveragesMTD}
                />
                <Input
                    type="number"
                    label="Retail MTD"
                    bind:value={retailMTD}
                />
            </Group>
            <Group title="Miscellaneous">
                <Input type="number" label="Cracked Cones" bind:value={cc} />
                <Input type="number" label="Total" bind:value={total} />
                <Input
                    type="number"
                    label="Transactions"
                    bind:value={transactions}
                />
                <Input type="number" label="Quantity" bind:value={quantity} />
                <Input type="number" label="CRM" bind:value={crm} />
            </Group>
        </div>

        <pre>
            {quantity}
            {total}
            {cc}
            totalDiscount - {totalDiscount}
            ss - {ss} asd
        </pre>
    </div>
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 40px 80px;
    }

    #App {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .header {
        display: flex;
        justify-content: center;
        margin-bottom: 48px;
        font-size: 24px;
        text-align: center;
    }

    .body {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>
