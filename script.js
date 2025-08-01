
document.addEventListener("DOMContentLoaded", function () {
  const balancePage = document.querySelector("#balancePage");
  if (balancePage) {
    balancePage.innerHTML = `
      <h2>Редактировать баланс</h2>
      <form id="balanceForm">
        <label>Безналичный счёт (NOK): <input type="number" step="0.01" id="bankInput" /></label><br/>
        <label>Наличные (NOK): <input type="number" step="0.01" id="cashInput" /></label><br/>
        <label>Активы (NOK): <input type="number" step="0.01" id="assetsInput" /></label><br/>
        <label>Золото (в граммах): <input type="number" step="0.01" id="goldInput" /></label><br/>
        <button type="submit">Сохранить</button>
      </form>
    `;

    const form = document.querySelector("#balanceForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const bank = parseFloat(document.getElementById("bankInput").value) || 0;
      const cash = parseFloat(document.getElementById("cashInput").value) || 0;
      const assets = parseFloat(document.getElementById("assetsInput").value) || 0;
      const gold = parseFloat(document.getElementById("goldInput").value) || 0;
      const balance = { bank, cash, assets, gold };
      localStorage.setItem("balance", JSON.stringify(balance));
      alert("Баланс сохранён");
    });

    const saved = JSON.parse(localStorage.getItem("balance"));
    if (saved) {
      document.getElementById("bankInput").value = saved.bank;
      document.getElementById("cashInput").value = saved.cash;
      document.getElementById("assetsInput").value = saved.assets;
      document.getElementById("goldInput").value = saved.gold;
    }
  }
});

  // Доход/расход страницы
  const incomePage = document.querySelector("#incomePage");
  if (incomePage) {
    incomePage.innerHTML = `
      <h2>Добавить доход</h2>
      <form id="incomeForm">
        <label>Сумма (NOK): <input type="number" step="0.01" id="incomeAmount" /></label><br/>
        <label>Источник:
          <select id="incomeSource">
            <option value="salary">Зарплата</option>
            <option value="sale">Продажа</option>
            <option value="other">Другое</option>
          </select>
        </label><br/>
        <label>Куда:
          <select id="incomeTarget">
            <option value="bank">Безнал</option>
            <option value="cash">Наличные</option>
            <option value="assets">Активы</option>
            <option value="gold">Золото</option>
          </select>
        </label><br/>
        <button type="submit">Добавить доход</button>
      </form>
    `;

    const form = document.querySelector("#incomeForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const amount = parseFloat(document.getElementById("incomeAmount").value);
      const source = document.getElementById("incomeSource").value;
      const target = document.getElementById("incomeTarget").value;
      const incomeEntry = { amount, source, target, date: new Date().toISOString() };
      const incomes = JSON.parse(localStorage.getItem("incomes") || "[]");
      incomes.push(incomeEntry);
      localStorage.setItem("incomes", JSON.stringify(incomes));
      alert("Доход добавлен");
    });
  }

  const expensePage = document.querySelector("#expensePage");
  if (expensePage) {
    expensePage.innerHTML = `
      <h2>Добавить расход</h2>
      <form id="expenseForm">
        <label>Сумма (NOK): <input type="number" step="0.01" id="expenseAmount" /></label><br/>
        <label>Категория:
          <select id="expenseCategory">
            <option value="food">Продукты</option>
            <option value="utilities_power">Коммуналка: свет</option>
            <option value="utilities_net">Коммуналка: интернет и связь</option>
            <option value="fuel">Топливо</option>
            <option value="insurance">Страховки</option>
            <option value="rent">Аренда</option>
            <option value="unplanned">Непредвиденное</option>
            <option value="planned">Предвиденные покупки</option>
            <option value="useless">Ненужное</option>
          </select>
        </label><br/>
        <button type="submit">Добавить расход</button>
      </form>
    `;

    const form = document.querySelector("#expenseForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const amount = parseFloat(document.getElementById("expenseAmount").value);
      const category = document.getElementById("expenseCategory").value;
      const expenseEntry = { amount, category, date: new Date().toISOString() };
      const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
      expenses.push(expenseEntry);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      alert("Расход добавлен");
    });
  }

const reportsPage = document.querySelector("#reportsPage");
if (reportsPage) {
  reportsPage.innerHTML = `
    <h2>Отчёты и диаграммы</h2>
    <label>Выберите категорию:
      <select id="reportCategory">
        <option value="all">Все</option>
        <option value="food">Продукты</option>
        <option value="utilities_power">Свет</option>
        <option value="utilities_net">Интернет и связь</option>
        <option value="fuel">Топливо</option>
        <option value="insurance">Страховки</option>
        <option value="rent">Аренда</option>
        <option value="unplanned">Непредвиденное</option>
        <option value="planned">Предвиденные покупки</option>
        <option value="useless">Ненужное</option>
      </select>
    </label>
    <label>Месяц: <input type="month" id="reportMonth"></label>
    <button id="generateReport">Сформировать</button>
    <div id="reportOutput"></div>
  `;

  document.getElementById("generateReport").addEventListener("click", () => {
    const cat = document.getElementById("reportCategory").value;
    const month = document.getElementById("reportMonth").value;
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

    const filtered = expenses.filter(e => {
      const d = new Date(e.date);
      const monthString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      return (cat === "all" || e.category === cat) && (!month || monthString === month);
    });

    const total = filtered.reduce((sum, e) => sum + e.amount, 0);
    const output = document.getElementById("reportOutput");
    output.innerHTML = `<p>Всего расходов: ${total.toFixed(2)} NOK</p>`;

    const perCat = {};
    filtered.forEach(e => {
      perCat[e.category] = (perCat[e.category] || 0) + e.amount;
    });

    const labels = Object.keys(perCat);
    const data = Object.values(perCat);

    if (labels.length > 0) {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 300;
      output.appendChild(canvas);

      new Chart(canvas.getContext("2d"), {
        type: "bar",
        data: {
          labels,
          datasets: [{ label: "Расходы", data }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  });
}
