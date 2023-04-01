import { useState } from 'react';
import { SOFTSERVE, STORE } from '../data.json';
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

function Group({ title, children }) {
    return (
        <div className="group">
            <div className="title">{title}</div>
            <div className="inputs">
                {children}
            </div>
        </div>
    )
}

function Radio({ children }) {
    return (
        <div className="radio">
            {children}
        </div>
    )
}

function Input({ type, label, value, arrows, onInput }) {
    return (
        <div className="input">
            <div class="wrapper">
                <div className="label">{label}</div>
                <input
                    type={type}
                    value={value}
                    onInput={e => onInput(e.target.value)}
                />
            </div>
            {
                arrows &&
                <div className="arrows">
                    <div className="up" onClick={() => onInput(val => val + 1)}></div>
                    <div className="down" onClick={() => onInput(val => val - 1)}></div>
                </div>
            }
        </div>
    )
}

export default function App() {
    // Discounts
    const [ store, setStore ] = useState(0);
    const [ ssd, setSoftServeDiscount ] = useState(0);
    const [ fd, setFoodDiscount ] = useState(0);
    const [ bd, setBeveragesDiscount ] = useState(0);

    // DC = Dark chocolate // CM = Caramel/Mixed
    const [ ssdc, setChocoSSAmount ] = useState(0);
    const [ sscm, setCMSSAmount ] = useState(0);

    const [ ssMTD, setSSMTD ] = useState(0);
    const [ foodMTD, setFoodMTD ] = useState(0);
    const [ beveragesMTD, setBeveragesMTD ] = useState(0);
    const [ retailMTD, setRetailMTD ] = useState(0);
    
    const [ cc, setCC ] = useState(0);
    const [ total, setTotal ] = useState(0);
    const [ transactions, setTransactions ] = useState(0);
    const [ quantity, setQuantity ] = useState(0);
    const [ crm, setCRM ] = useState(0);

    const totalDiscount = [ ssd, fd, bd ].reduce((c, v) => c + v);

    const ss = (SOFTSERVE.DARKCHOCO * ssdc) + (SOFTSERVE.CARAMELMIX * sscm);

    return (
        <div id="App">
            <div className="wrapper">
                <div className="header">Sales Report Generator</div>
                <div className="body">
                    <Group>                                      
                        <Radio>
                            {
                                STORE.map((val, index) => {
                                    return (
                                        <label>
                                            <input
                                                type="radio"
                                                name="store-selector"
                                                onInput={() => setStore(index)}
                                            >
                                            </input>
                                            <span>{val}</span>
                                        </label>
                                    );
                                })
                            }
                        </Radio>
                    </Group>
                    <Group title="Discounts">
                        <Input
                            type="number"
                            label="Soft Serve"
                            value={ssd}
                            onInput={setSoftServeDiscount}
                        />
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
                    <Group title="Month To Dates">
                        <Input
                            type="number"
                            label="Soft Serve MTD"
                            value={ssMTD}
                            onInput={setSSMTD}
                        />
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
                </div>
            </div>
        </div>
    );
}