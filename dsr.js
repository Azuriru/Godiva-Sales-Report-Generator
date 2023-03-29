const STORE = ['Sky Avenue Kiosk', 'Sky Avenue Store', 'Genting Premium Outlets'];
const TARGET = {
    STORE: {
        SOFTSERVE: 2787.10,
        FOOD: 290.33,
        BEVERAGES: 696.77,
        RETAIL: 2032.26,
        MONTHLY: 180000
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
    CAKES: 21.7,
    PRALINE: 26.4,
}

const BEVERAGES = {
    HOT: {
        AMERICANO: 11.32,
        MOCHA: 13.21,
        LATTE: 13.21,
        CARAMEL_LATTE: 13.67,
        VANILLA_LATTE: 13.67,
        SINGLE_EXPRESSO: 7.55,
        DOUBLE_EXPRESSO: 11.32,
        CHOCOLATE: 25.47,
        CAPPUCINO: 0,
        AFFOGATO: 0,
    },
    COLD: {
        AMERICANO: 13.21,
        LATTE: 15.09,
        CARAMEL_LATTE: 15.56,
        CARAMEL_LATTE: 15.56,
        MOCHA: 15.09,
        CHOCOLATE: 27.36,
    },
    SHAKE: {
        DARK: 30.19,
        MILK: 30.19,
    },
    TEA: 15.09,
    WATER: 234345435
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
    softserveMTD,
    foodMTD,
    beveragesMTD,
    retailMTD,
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
    const fMTD = foodMTD + food;
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
    const n = number => number.toLocaleString();
    const rm = value => `RM ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
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

    const GDV_MALAYSIA = `
        *${store ? 'Sky Avenue Store' : 'Sky Avenue Kiosk'} Sales Report*
        Date: ${date} 10:00 PM
        \n\n
        Retail: *${rm(retail)} _(${rm(RETAIL_TARGET)})_*
        Soft serve: *${rm(ss)} _(${rm(SOFTSERVE_TARGET)})_*
        ${store ? '' : ''}
        Gift Card: *NIL*
        Total: *${rm(total)} _(${rm(DAILY_TARGET)})_*
        Discount: *${rm(totalDiscount)}*

        Store target: *${rm(MONTHLY_TARGET)}* 
        Retail MTD: *${rm(rMTD)}*
        Softserve MTD: *${rm(ssMTD)}*
        Total MTD: *${rm(mtd)}*

        Actual vs Target: *${Math.round(mtd / MONTHLY_TARGET * 10000) / 100}%*

        Void: *0*
        Reprint receipt: *-*
        Crack cones: *${crackedCones}*
        Manual Receipts: *-*
        Walk in: *${walkIn}*
        Transaction: *${transaction}*
        CRM: *${crm} _(${crmP}%)_*

        White Chocolixir Promo: *-*
        Huawei Redemption: *-*
        Godiva Gift Card: *-*
        Gift Card MTD : *-*
        Gift Card Conversion : *-*
    `;

    const GDV_GENTING = `
        Godiva Sales Report
        ${store ? 'Sky Avenue Store' : 'Sky Avenue Kiosk'}
        Date: ${date} 10:00 PM

        Month Target: *${rm(MONTHLY_TARGET)}*
        Day Target: *${rm(DAILY_TARGET)}*
        Day Sales: *${rm(total)}*
        MTD Sales: *${rm(mtd)}*
        Achievement: *${Math.floor(total / (DAILY_TARGET) * 100)}%*

        Traffic: *${walkIn}*
        Transaction: *${transaction}*
        W/in Trans: *${transaction}*
        Conversion: *${conversion}*
        ATV: *${Math.round(total / transaction * 100) / 100}*
        QTY: *${quantity}*

        Cust Demo: 
        - Local Chinese, Malay, Indian
        - Tourist Indonesian, Singaporean, Arabian
    `;

    console.log(`Godiva - Malaysia\n`);
    console.log(cleanup(GDV_MALAYSIA));
    console.log(`Godiva - Genting Team\n`);
    console.log(cleanup(GDV_GENTING));
}

DailySalesReport({
    softserve: {
        DARKCHOCO: 27,
        CARAMELMIX: 22,
    },
    discount: {
        softserve: 9.06
    },
    crackedCones: 0,
    total: 2003.79,
    quantity: 65,
    retailMTD: 21448.55,
    softserveMTD:  33114.97,
    transaction: 42,
    crm: 6
});

`GODIVA
Sales Report 
Date :  
STORE

Retail.       : RM ? / (DAILY TARGET) 
Softserve : RM ?  / (DAILY TARGET) 
Food : RM. ? / (DAILY TARGET) 
Beverages : RM?  / (DAILY TARGET) 
Total : RM?  / (DAILY TARGET) 
Discount : RM -


Store Target: RM
Retail MTD : RM ? / MONTHLY TARGET
SoftS MTD : RM?  / MONTHLY TARGET
Food MTD : RM?  / MONTHLY TARGET 
Beverages MTD : RM?  / MONTHLY TARGETS
Total MTD   : RM?  / MONTHLY TARGET
Actual vs Target :   %

Void : 
Reprint receipt : 
Crack cones : 
Manual Receipts :  
Walk in : 
Transaction : 
CRM :  

RAYA HAMPER 
Daily Target : 
Qty Sold : 

RM 178 :  
RM 238 : 
RM 298 : 
RM 398 : 
RM 498 : 
RM 598 :
RM 698 :
RM 798 :
RM 968 :
RM 1088 :
KUPAT BOX:
PRALINE 8PC BOX:
PRALINE 16PC BOX:
RAYA CUBE 6PCS BOX:
RAYA GOLD CHOC 6PC BOX:`