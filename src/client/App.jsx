import { useState, useEffect } from 'react';
import { Collapsible, Group, Radio, Input, Button } from './Components';
import data from '../data.json';
import './App.css';

// function Date() {
//     // this is not a component
//     const d = new Date();
//     const dd = d.getDate();
//     const mm = d.getMonth() + 1;
//     const yyyy = d.getFullYear();
//     const p = n => `${n}`.padStart(2, 0);

//     return date = `${p(dd)}/${p(mm)}/${p(yyyy)}`;
// }

const { EMPLOYEE, STORE, TARGET, SOFTSERVE, FOOD, BEVERAGES } = data;

export default function App() {
    const [store, setStore] = useState(1);
    const [time, setTime] = useState(2);

    const SELECTED_TARGET = TARGET[store];

    // Discounts
    const [ssd, setSoftServeDiscount] = useState(0);
    const [fd, setFoodDiscount] = useState(0);
    const [bd, setBeveragesDiscount] = useState(0);
    const [rd, setRetailDiscount] = useState(0);

    // DC = Dark chocolate // CM = Caramel/Mixed
    const [ssdc, setChocoSSAmount] = useState(0);
    const [sscm, setCMSSAmount] = useState(0);

    // Targets
    const [storeTarget, setStoreTarget] = useState(0);
    const [ssTarget, setSSTarget] = useState(0);
    const [foodTarget, setFoodTarget] = useState(0);
    const [beveragesTarget, setBeveragesTarget] = useState(0);
    const [retailTarget, setRetailTarget] = useState(0);

    // const DAILY_TARGET = [ SOFTSERVE_TARGET, FOOD_TARGET, BEVERAGES_TARGET, RETAIL_TARGET ].reduce((c, v) => c + v);
    const DAILY_TARGET = [
        ssTarget,
        foodTarget,
        beveragesTarget,
        retailTarget,
    ].reduce((sum, target) => sum + target);

    useEffect(() => {
        setSSTarget(SELECTED_TARGET.SOFTSERVE ?? 0);
        setFoodTarget(SELECTED_TARGET.SOFTSERVE ?? 0);
        setBeveragesTarget(SELECTED_TARGET.BEVERAGES ?? 0);
        setRetailTarget(SELECTED_TARGET.RETAIL ?? 0);
        setStoreTarget(SELECTED_TARGET.DAILY_TARGET ?? 0);
    }, [SELECTED_TARGET]);

    // Month to Dates
    const [ssMTD, setSSMTD] = useState(0);
    const [foodMTD, setFoodMTD] = useState(0);
    const [beveragesMTD, setBeveragesMTD] = useState(0);
    const [retailMTD, setRetailMTD] = useState(0);

    // Other stuff
    const [cc, setCC] = useState(0);
    const [total, setTotal] = useState(0);
    const [lytotal, setLYTotal] = useState(0);
    const [transactions, setTransactions] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [crm, setCRM] = useState(0);

    const totalDiscount = [ssd, fd, bd, rd].reduce((c, v) => c + v);

    const ss = SOFTSERVE.DARKCHOCO * ssdc + SOFTSERVE.CARAMELMIX * sscm;

    return (
        <div id="App">
            <div className="wrapper">
                <div className="header">Sales Report Generator</div>
                <Collapsible title="Generate">
                    <div className="group store-selector">
                        <Radio>
                            {STORE.map((val, index) => {
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="store-selector"
                                            defaultChecked={index === store}
                                            onInput={() => setStore(index)}
                                        ></input>
                                        <span>{val}</span>
                                    </label>
                                );
                            })}
                        </Radio>
                    </div>
                    <div className="group time-selector">
                        <Radio>
                            {['2 PM', '6 PM', '10 PM'].map((val, index) => {
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="time-selector"
                                            defaultChecked={index === time}
                                            onInput={() => setTime(index)}
                                        ></input>
                                        <span>{val}</span>
                                    </label>
                                );
                            })}
                        </Radio>
                    </div>
                    <Group title="Discounts">
                        <Input
                            type="number"
                            label="Soft Serve"
                            value={ssd}
                            onInput={setSoftServeDiscount}
                        />
                        {store > 0 && (
                            <>
                                <Input
                                    type="number"
                                    label="Food"
                                    value={fd}
                                    onInput={setFoodDiscount}
                                />
                                <Input
                                    type="number"
                                    label="Beverages"
                                    value={bd}
                                    onInput={setBeveragesDiscount}
                                />
                            </>
                        )}
                        <Input
                            type="number"
                            label="Retail"
                            value={rd}
                            onInput={setRetailDiscount}
                        />
                    </Group>
                    <Group title="Soft Serve">
                        <Input
                            type="number"
                            label="Dark Chocolate"
                            value={ssdc}
                            arrows={true}
                            onInput={setChocoSSAmount}
                        />
                        <Input
                            type="number"
                            label="Caramel / Mixed"
                            value={sscm}
                            arrows={true}
                            onInput={setCMSSAmount}
                        />
                    </Group>
                    <Group title="Targets">
                        <Input
                            type="number"
                            label="Soft Serve Target"
                            value={ssTarget}
                            onInput={setSSTarget}
                        />
                        {store > 0 && (
                            <>
                                <Input
                                    type="number"
                                    label="Food Target"
                                    value={foodTarget}
                                    onInput={setFoodTarget}
                                />
                                <Input
                                    type="number"
                                    label="Beverages Target"
                                    value={beveragesTarget}
                                    onInput={setBeveragesTarget}
                                />
                            </>
                        )}
                        <Input
                            type="number"
                            label="Retail Target"
                            value={retailTarget}
                            onInput={setRetailTarget}
                        />
                    </Group>
                    <Group title="Month To Dates">
                        <Input
                            type="number"
                            label="Soft Serve MTD"
                            value={ssMTD}
                            onInput={setSSMTD}
                        />
                        {store > 0 && (
                            <>
                                <Input
                                    type="number"
                                    label="Food MTD"
                                    value={foodMTD}
                                    onInput={setFoodMTD}
                                />
                                <Input
                                    type="number"
                                    label="Beverages MTD"
                                    value={beveragesMTD}
                                    onInput={setBeveragesMTD}
                                />
                            </>
                        )}
                        <Input
                            type="number"
                            label="Retail MTD"
                            value={retailMTD}
                            onInput={setRetailMTD}
                        />
                    </Group>
                    <Group title="Miscellaneous">
                        <Input
                            type="number"
                            label="Cracked Cones"
                            value={cc}
                            onInput={setCC}
                        />
                        <Input
                            type="number"
                            label="Total"
                            value={total}
                            onInput={setTotal}
                        />
                        {time < 2 && (
                            <Input
                                type="number"
                                label="Last Year Total"
                                value={lytotal}
                                onInput={setLYTotal}
                            />
                        )}
                        <Input
                            type="number"
                            label="Transactions"
                            value={transactions}
                            onInput={setTransactions}
                        />
                        <Input
                            type="number"
                            label="Quantity"
                            value={quantity}
                            onInput={setQuantity}
                        />
                        <Input
                            type="number"
                            label="CRM"
                            value={crm}
                            onInput={setCRM}
                        />
                    </Group>
                    <div className="generate">
                        <Button text="Generate" />
                    </div>
                </Collapsible>
            </div>
        </div>
    );
}
