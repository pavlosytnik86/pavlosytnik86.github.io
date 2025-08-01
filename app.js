
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('expense-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Продукты', 'Аренда', 'Свет', 'Интернет'],
            datasets: [{
                label: 'Расходы',
                data: [1000, 5000, 700, 300],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        }
    });

    const income = 8000;
    const expense = 7000;
    document.getElementById('total-income').textContent = income;
    document.getElementById('total-expense').textContent = expense;
    document.getElementById('balance').textContent = income - expense;
});
