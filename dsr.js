const STORE = ['Sky Avenue Kiosk', 'Sky Avenue Store', 'Genting Premium Outlets'];
const TARGET = {
    STORE: {
        SOFTSERVE: 4000,
        FOOD: 416.67,
        BEVERAGES: 1000,
        RETAIL: 2916.67,
        MONTHLY: 250000
    },
    KIOSK: {
        SOFTSERVE: 2709.67,
        RETAIL: 1161.29,
        MONTHLY: 120000
    }
}

const SOFTSERVE = {
    DARKCHOCO: 28.3,
    VANILLA: 28.3,
    CHOCOTWIST: 28.3,
    CARAMEL: 30.19,
    CARAMELMIX: 30.19
}

const FOOD = {
    MACARON: 18.85,
    CAKES: 21.7,
    PRALINE: 26.4,
}

const BEVERAGES = {
    SINGLE_EXPRESSO: 7.55,
    AFFOGATO: 28.3,
    // Americano, Double Expresso
    HOT_BLACK: 11.32,
    // Latte, Cappucino, Mocha
    HOT_DRINK: 13.21,
    // Caramel latte, vanilla latte
    HOT_LATTE: 13.67,
    HOT_CHOCOLATE: 25.47,
    // Americano
    COLD_BLACK: 13.21,
    // Latte, Cappucino, Mocha
    COLD_BASIC: 15.09,
    // Caramel latte, Vanilla latte
    COLD_LATTE: 15.56,
    COLD_CHOCOLATE: 27.36,
    SHAKE: 30.19,
    TEA: 15.09,
    WATER: 11.32
}

const DailySalesReport = ({
    store = 0,
    softserve,
    food,
    beverages,
    discount = {},
    crackedCones,
    total,
    quantity,
    softserveMTD = 0,
    foodMTD = 0,
    beveragesMTD = 0,
    retailMTD = 0,
    transaction,
    crm
} = {}) => {
    const d = new Date();
    const dd = d.getDate();
    const mm = d.getMonth() + 1;
    const yyyy = d.getFullYear();
    const p = n => `${n}`.padStart(2, 0);
    const date = `${p(dd)}/${p(mm)}/${p(yyyy)}`;
    
    // Discount
    const {
        softserve: ssd = 0,
        food: fd = 0,
        beverages: bd = 0,
        retail: rd = 0
    } = discount;
    const totalDiscount = [ ssd, fd, bd, rd ].reduce((c, v) => c + v);
    
    // Soft serve
    const ss = softserve ? Object
        .entries(softserve)
        .map(([ flavor, amount ]) => SOFTSERVE[flavor] * amount)
        .reduce((c, v) => c + v) - ssd : 0;
    // Food
    const cakes = food ? Object
        .entries(food)
        .map(([ type, amount ]) => FOOD[type] * amount)
        .reduce((c, v) => c + v) - fd : 0;
    // Beverages
    const drinks = beverages ? Object
        .entries(beverages)
        .map(([ type, amount ]) => BEVERAGES[type] * amount)
        .reduce((c, v) => c + v) - bd : 0;
    // Retail
    const retail = total - ss - cakes - drinks - rd;

    // Month to dates
    const ssMTD = softserveMTD + ss;
    const fMTD = foodMTD + cakes;
    const bMTD = beveragesMTD + drinks;
    const rMTD = retailMTD + retail;
    const mtd = ssMTD + + fMTD + bMTD + rMTD;

    // CRM percentage
    const crmP = Math.floor(crm / transaction * 100);

    // Randomizer for walk in, it needs to be 80% and above transaction
    const [ min, max ] = [1.15, 1.25]
    const ratio = Math.random() * (max - min) + min;
    const walkIn = Math.floor(transaction * ratio);
    const conversion = Math.floor(transaction / walkIn * 100);

    // Util, helps clean up the numbers
    const rm = number => `RM ${number.toLocaleString()}`;
    // const rm = value => `RM ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const cleanup = str => str.trim().replace(/^ +/gm, '');

    // More decimals = Multiply by moar zeroes
    // const decitwo = n => Math.round(56567.31  / 120000 * 10000) / 100;

    const { 
        SOFTSERVE: SOFTSERVE_TARGET = 0,
        FOOD: FOOD_TARGET = 0, 
        BEVERAGES: BEVERAGES_TARGET = 0,
        RETAIL: RETAIL_TARGET = 0,
        MONTHLY: MONTHLY_TARGET = 0
    } = TARGET[store ? 'STORE' : 'KIOSK'];
    const DAILY_TARGET = [ SOFTSERVE_TARGET, FOOD_TARGET, BEVERAGES_TARGET, RETAIL_TARGET ].reduce((c, v) => c + v);

    let GODIVA_MALAYSIA = `*${STORE[store]} Sales Report*` + '\n';

    GODIVA_MALAYSIA += `Date: ${date} 10:00 PM` + '\n';
    GODIVA_MALAYSIA += '\n';
    GODIVA_MALAYSIA += `Retail: *${rm(retail)} _(${rm(RETAIL_TARGET)})_*` + '\n';
    GODIVA_MALAYSIA += `Soft serve: *${rm(ss)} _(${rm(SOFTSERVE_TARGET)})_*` + '\n';

    if (store) {
        GODIVA_MALAYSIA += `Food: *${rm(cakes)} _(${rm(FOOD_TARGET)})_*` + '\n';
        GODIVA_MALAYSIA += `Beverages: *${rm(drinks)} _(${rm(BEVERAGES_TARGET)})_*` + '\n';
    }

    GODIVA_MALAYSIA += 'Gift Card: *NIL*' + '\n';
    GODIVA_MALAYSIA += `Total: *${rm(total)} _(${rm(DAILY_TARGET)})_*` + '\n';
    GODIVA_MALAYSIA += `Discount: *${rm(totalDiscount)}*` + '\n';
    GODIVA_MALAYSIA += '\n';
    GODIVA_MALAYSIA += `Store target: *${rm(MONTHLY_TARGET)}*` + '\n';
    GODIVA_MALAYSIA += `Retail MTD: *${rm(rMTD)}*` + '\n';
    GODIVA_MALAYSIA += `Softserve MTD: *${rm(ssMTD)}*` + '\n';

    if (store) {
        GODIVA_MALAYSIA += `Food MTD: *${rm(foodMTD)}*` + '\n';
        GODIVA_MALAYSIA += `Beverages MTD: *${rm(beveragesMTD)}*` + '\n';
    }

    GODIVA_MALAYSIA += `Total MTD: *${rm(mtd)}*` + '\n';
    GODIVA_MALAYSIA += '\n';
    GODIVA_MALAYSIA += `Actual vs Target: *${Math.round(mtd / MONTHLY_TARGET * 10000) / 100}%*`
    GODIVA_MALAYSIA += '\n';
    GODIVA_MALAYSIA += `Void: *0*` + '\n';
    GODIVA_MALAYSIA += `Reprint receipt: *-*` + '\n';
    GODIVA_MALAYSIA += `Crack cones: *${crackedCones}*` + '\n';
    GODIVA_MALAYSIA += `Manual Receipts: *-*` + '\n';
    GODIVA_MALAYSIA += `Walk in: *${walkIn}*` + '\n';
    GODIVA_MALAYSIA += `Transaction: *${transaction}*` + '\n';
    GODIVA_MALAYSIA += `CRM: *${crm} _(${crmP}%)_*` + '\n';
    GODIVA_MALAYSIA += '\n';

    if (store) {
        GODIVA_MALAYSIA += `Raya Hamper` + '\n';
        GODIVA_MALAYSIA += `Daily Target:` + '\n';
        GODIVA_MALAYSIA += `Quantity Sold:` + '\n';
        GODIVA_MALAYSIA += '\n';
        GODIVA_MALAYSIA += `RM 178:` + '\n';
        GODIVA_MALAYSIA += `RM 238:` + '\n';
        GODIVA_MALAYSIA += `RM 298:` + '\n';
        GODIVA_MALAYSIA += `RM 398:` + '\n';
        GODIVA_MALAYSIA += `RM 498:` + '\n';
        GODIVA_MALAYSIA += `RM 598:` + '\n';
        GODIVA_MALAYSIA += `RM 698:` + '\n';
        GODIVA_MALAYSIA += `RM 798:` + '\n';
        GODIVA_MALAYSIA += `RM 968:` + '\n';
        GODIVA_MALAYSIA += `RM 1088:` + '\n';
        GODIVA_MALAYSIA += `KUPAT BOX:` + '\n';
        GODIVA_MALAYSIA += `PRALINE 8PC BOX:` + '\n';
        GODIVA_MALAYSIA += `PRALINE 16PC BOX:` + '\n';
        GODIVA_MALAYSIA += `RAYA CUBE 6PCS BOX:` + '\n';
        GODIVA_MALAYSIA += `RAYA GOLD CHOC 6PC BOX:` + '\n';
        GODIVA_MALAYSIA += '\n';
    }
    
    GODIVA_MALAYSIA += `White Chocolixir Promo: *-*` + '\n';
    GODIVA_MALAYSIA += `Huawei Redemption: *-*` + '\n';
    GODIVA_MALAYSIA += `Godiva Gift Card: *-*` + '\n';
    GODIVA_MALAYSIA += `Gift Card MTD : *-*` + '\n';
    GODIVA_MALAYSIA += `Gift Card Conversion : *-*` + '\n';

    let GODIVA_GENTING = 'Godiva Sales Report' + '\n';

    GODIVA_GENTING += `${STORE[store]}` + '\n';
    GODIVA_GENTING += `Date: ${date} 10:00 PM` + '\n';
    GODIVA_GENTING += '\n';
    GODIVA_GENTING += `Month Target: *${rm(MONTHLY_TARGET)}*` + '\n';
    GODIVA_GENTING += `Day Target: *${rm(DAILY_TARGET)}*` + '\n';
    GODIVA_GENTING += `Day Sales: *${rm(total)}*` + '\n';
    GODIVA_GENTING += `MTD Sales: *${rm(mtd)}*` + '\n';
    GODIVA_GENTING += `Achievement: *${Math.floor(total / (DAILY_TARGET) * 100)}%*` + '\n';
    GODIVA_GENTING += '\n';
    GODIVA_GENTING += `Traffic: *${walkIn}*` + '\n';
    GODIVA_GENTING += `Transaction: *${transaction}*` + '\n';
    GODIVA_GENTING += `W/in Trans: *${transaction}*` + '\n';
    GODIVA_GENTING += `Conversion: *${conversion}*` + '\n';
    GODIVA_GENTING += `ATV: *${Math.round(total / transaction * 100) / 100}*` + '\n';
    GODIVA_GENTING += `QTY: *${quantity}*` + '\n';
    GODIVA_GENTING += '\n';
    GODIVA_GENTING += 'Cust Demo:' + '\n';
    GODIVA_GENTING += '- Local Chinese, Malay, India' + '\n';
    GODIVA_GENTING += '- Tourist Indonesian, Singaporean, Arabia' + '\n';

    console.log(`Godiva - Malaysia\n`);
    console.log(cleanup(GODIVA_MALAYSIA));
    console.log(`Godiva - Genting Team\n`);
    console.log(cleanup(GODIVA_GENTING));
}

DailySalesReport({
    store: 1,
    softserve: {
        DARKCHOCO: 0,
        CARAMELMIX: 0,
    },
    food: {
        MACARON: 0,
        CAKES: 0,
        PRALINE: 0
    },
    beverages: {
        SINGLE_EXPRESSO: 0,
        AFFOGATO: 0,
        // Americano, Double Expresso
        HOT_BLACK: 0,
        // Latte, Cappucino, Mocha
        HOT_DRINK: 0,
        // Caramel latte, vanilla latte
        HOT_LATTE: 0,
        HOT_CHOCOLATE: 0,
        // Americano
        COLD_BLACK: 0,
        // Latte, Cappucino, Mocha
        COLD_BASIC: 0,
        // Caramel latte, Vanilla latte
        COLD_LATTE: 0,
        COLD_CHOCOLATE: 0,
        SHAKE: 0,
        TEA: 0,
        WATER: 0
    },
    discount: {
        softserve: 0,
        food: 0,
        beverages: 0,
        retail: 0
    },
    crackedCones: 0,
    total: 0,
    quantity: 0,
    retailMTD: 0,
    softserveMTD: 0,
    transaction: 0,
    crm: 0
});