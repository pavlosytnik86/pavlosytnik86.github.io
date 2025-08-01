
let entries = JSON.parse(localStorage.getItem('budgetEntries') || '[]');
const list = document.getElementById('entries');
const totalEl = document.getElementById('total');

function addEntry() {
  const desc = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  if (!desc || isNaN(amount)) return;
  entries.push({ desc, amount });
  localStorage.setItem('budgetEntries', JSON.stringify(entries));
  render();
}

function render() {
  list.innerHTML = '';
  let total = 0;
  entries.forEach(e => {
    const li = document.createElement('li');
    li.textContent = `${e.desc}: ${e.amount} kr`;
    list.appendChild(li);
    total += e.amount;
  });
  totalEl.textContent = total;
}

render();
