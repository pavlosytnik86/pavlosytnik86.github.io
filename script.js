
let currentLang = 'ru';
let goldPrice = 750;

const langStrings = {
    ru: {
        title: "Личный бюджет",
        income: "Доход",
        expense: "Расход",
        balance: "Баланс",
        updateGold: "Обновить цену золота",
        goldPrice: "Цена золота"
    },
    en: {
        title: "Personal Budget",
        income: "Income",
        expense: "Expense",
        balance: "Balance",
        updateGold: "Update Gold Price",
        goldPrice: "Gold Price"
    },
    no: {
        title: "Personlig budsjett",
        income: "Inntekt",
        expense: "Utgift",
        balance: "Balanse",
        updateGold: "Oppdater gullpris",
        goldPrice: "Gullpris"
    }
};

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById("title").innerText = langStrings[lang].title;
    document.getElementById("income-label").childNodes[0].nodeValue = langStrings[lang].income + ": ";
    document.getElementById("expense-label").childNodes[0].nodeValue = langStrings[lang].expense + ": ";
    document.getElementById("balance-label").childNodes[0].nodeValue = langStrings[lang].balance + ": ";
    document.querySelector("button").innerText = langStrings[lang].updateGold;
    document.querySelector("#gold-info").childNodes[0].nodeValue = langStrings[lang].goldPrice + ": ";
}

function updateGoldPrice() {
    // Эмуляция обновления курса золота
    goldPrice = Math.floor(700 + Math.random() * 100);
    document.getElementById("gold-price").innerText = goldPrice;
}
