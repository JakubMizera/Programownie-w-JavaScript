const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');
const num3 = document.querySelector('#num3');
const num4 = document.querySelector('#num4');

const sum = document.querySelector('#sum');
const avg = document.querySelector('#avg');
const min = document.querySelector('#min');
const max = document.querySelector('#max');
console.log(sum);

const btn = document.querySelector('#przelicz');

btn.addEventListener('click', () => {
    const num1V = parseInt(num1.value);
    const num2V = parseInt(num2.value);
    const num3V = parseInt(num3.value);
    const num4V = parseInt(num4.value);

    resultSum = num1V + num2V + num3V + num4V;
    resultAvg = resultSum / 4;
    resultMin = Math.min(num1V, num2V, num3V, num4V);
    resultMax = Math.max(num1V, num2V, num3V, num4V);

    sum.innerHTML = `Suma wynosi ${resultSum}`;
    avg.innerHTML = `Średnia wartość to ${resultAvg}`;
    min.innerHTML = `Wartość minimalna to ${resultMin}`;
    max.innerHTML = `Wartość maksymalna to ${resultMax}`;
});
