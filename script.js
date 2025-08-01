
function initApp() {
  updateBalanceDisplay();
}

function showMain() {
  document.getElementById("mainView").style.display = "block";
  document.getElementById("editBalanceForm").style.display = "none";
}

function showEditBalance() {
  document.getElementById("editBalanceForm").style.display = "block";
  document.getElementById("mainView").style.display = "none";
}

function saveEditedBalance() {
  const bank = parseFloat(document.getElementById("editBank").value) || 0;
  const cash = parseFloat(document.getElementById("editCash").value) || 0;
  const assets = parseFloat(document.getElementById("editAssets").value) || 0;
  const goldGrams = parseFloat(document.getElementById("editGoldGrams").value) || 0;

  localStorage.setItem("startBank", bank);
  localStorage.setItem("startCash", cash);
  localStorage.setItem("startAssets", assets);
  localStorage.setItem("startGoldGrams", goldGrams);

  alert("Баланс обновлён.");
  location.reload();
}

function updateBalanceDisplay() {
  const bank = parseFloat(localStorage.getItem("startBank") || 0);
  const cash = parseFloat(localStorage.getItem("startCash") || 0);
  const assets = parseFloat(localStorage.getItem("startAssets") || 0);
  const goldGrams = parseFloat(localStorage.getItem("startGoldGrams") || 0);
  const goldPrice = parseFloat(localStorage.getItem("goldPrice") || 730) || 0;

  const goldValue = goldGrams * goldPrice;
  const totalBalance = bank + cash + assets + goldValue;

  document.getElementById("balanceSummary").innerHTML =
    `Общий баланс: ${totalBalance.toFixed(2)} kr<br>
     💳 Безнал: ${bank.toFixed(2)} kr | 💵 Нал: ${cash.toFixed(2)} kr | 🏠 Активы: ${assets.toFixed(2)} kr | 🥇 Золото: ${goldGrams.toFixed(2)} г / ${(goldValue).toFixed(2)} kr`;
}
