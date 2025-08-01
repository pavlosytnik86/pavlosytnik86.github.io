
const goldRate = 750; // kr per gram

let state = {
  bank: 0,
  cash: 0,
  assets: 0,
  gold: 0
};

function updateDisplay() {
  document.getElementById("bank").textContent = `${state.bank} kr`;
  document.getElementById("cash").textContent = `${state.cash} kr`;
  document.getElementById("assets").textContent = `${state.assets} kr`;
  document.getElementById("gold").textContent = `${state.gold} g`;
  document.getElementById("gold_value").textContent = `${state.gold * goldRate} kr`;

  const total = state.bank + state.cash + state.assets + (state.gold * goldRate);
  document.getElementById("total").textContent = `${total} kr`;
}

document.getElementById("start-form").addEventListener("submit", (e) => {
  e.preventDefault();
  state.bank = Number(document.getElementById("start-bank").value);
  state.cash = Number(document.getElementById("start-cash").value);
  state.assets = Number(document.getElementById("start-assets").value);
  state.gold = Number(document.getElementById("start-gold").value);
  updateDisplay();
});

document.getElementById("income-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.getElementById("income-type").value;
  const amount = Number(document.getElementById("income-amount").value);
  if (type === "gold") {
    state.gold += amount;
  } else {
    state[type] += amount;
  }
  updateDisplay();
});

document.getElementById("expense-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = Number(document.getElementById("expense-amount").value);
  state.cash -= amount;
  updateDisplay();
});

updateDisplay();
