let downPayment = document.getElementById("down-payment");
let downPaymentPercent = document.getElementById("down-payment-percent");
let amount = document.getElementById('loanAmount');
let termInYears = document.getElementById('termInYears');
let interest = document.getElementById('interestRate');

amount.value = formatNumberWithCommas(450000);
downPayment.value = formatNumberWithCommas(90000);
downPaymentPercent.value = 20;
termInYears.value = 30;
interest.value = 7;
//chart(42, 58);

function Calculartor() {
    let interest = document.getElementById('interestRate').value;
    let termInYears = document.getElementById('termInYears').value;
    let amount = removeCommasAndGetNumber(document.getElementById('loanAmount').value);
    let downPayment = removeCommasAndGetNumber(document.getElementById('down-payment').value);
    let realAmount = amount - downPayment;
    let months = termInYears * 12;

    // Convertir la tasa de interés a términos decimales
    interest = interest / 100 / 12;

    // Calcular el numerador
    const numerador = realAmount * interest * Math.pow(1 + interest, months);

    // Calcular el denominador
    const denominador = Math.pow(1 + interest, months) - 1;

    // Calcular la cuota mensual
    const cuota = numerador / denominador;

    const totalInterest = cuota * months - realAmount;

    let monthlyPayment = document.getElementById('monthlyPayment');
    monthlyPayment.textContent = formatNumberWithCommas(cuota.toFixed(2));

    let principalPaid = document.getElementById('principalPaid');
    principalPaid.textContent = formatNumberWithCommas(realAmount);

    let interestPaid = document.getElementById('interestPaid');
    interestPaid.textContent = formatNumberWithCommas(totalInterest.toFixed(2));


    //Pasar el porcentage en la grafica, no los numeros enteros
    //chart(realAmount, totalInterest.toFixed(2));
    const totalToPay = realAmount + totalInterest;
    chart(calcularPorcentaje(realAmount, totalToPay), calcularPorcentaje(totalInterest, totalToPay));

}

function amountListener(input) {
    let valor = removeCommasAndGetNumber(input.value);
    input.value = formatNumberWithCommas(valor);
    let percent = document.getElementById('down-payment-percent');
    let percetValue = removeCommasAndGetNumber(percent.value);
    percent.value = 20;
    let downPayment = document.getElementById('down-payment');
    let amount = removeCommasAndGetNumber(document.getElementById('loanAmount').value);
    if (!isNaN(percetValue) && !isNaN(amount) && amount !== 0) {
        const down = (percetValue / 100) * amount;
        downPayment.value = formatNumberWithCommas(down);
    } else {
        downPayment.value = 0;
    }
}

function percentListener(input) {
    const valor = removeCommasAndGetNumber(input.value);
    input.value = formatNumberWithCommas(valor);
    let amount = removeCommasAndGetNumber(document.getElementById('loanAmount').value);
    const percent = parseFloat(valor);
    if (!isNaN(percent) && !isNaN(amount) && amount !== 0) {
        const down = (percent / 100) * amount;
        downPayment.value = formatNumberWithCommas(down);
    } else {
        downPayment.value = 0;
    }

}

function downListener(input) {

    const valor = removeCommasAndGetNumber(input.value);
    input.value = formatNumberWithCommas(valor);
    let amount = removeCommasAndGetNumber(document.getElementById('loanAmount').value);
    const down = parseFloat(valor);
    if (!isNaN(down) && !isNaN(amount) && amount !== 0) {
        const percent = (down / amount) * 100;
        if (percent > 0.01)
            downPaymentPercent.value = formatNumberWithCommas(percent.toFixed(2));
        else
            downPaymentPercent.value = 0;
    } else {
        downPaymentPercent.value = 0;
    }
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeCommasAndGetNumber(formattedNumber) {
    return formattedNumber.replace(/,/g, '');
}

function chart(principal, interest) {
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    // Pie Chart Example
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Principal", "Interest"],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#007bff', '#28a745'],
            }],
        }, options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var value = dataset.data[tooltipItem.index];
                        var label = data.labels[tooltipItem.index];
                        return label + ': ' + value + '%'; // Puedes personalizar el formato
                    }
                }
            }
        }
    });
}

function calcularPorcentaje(parte, total) {
    return Math.round((parte / total) * 100);
}