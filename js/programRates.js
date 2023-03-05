const percentFormaters = new Intl.NumberFormat('ru-RU', {style: 'percent', maximumFractionDigits: 3});

const programBase = 0.12;
const programIt = 0.047;
const programGov = 0.067;
const programZero = 0.108;

const programInputs = document.querySelectorAll('input[name="program"]')
const totalPersent = document.querySelector("#total-percent")
const inputCost = document.querySelector('#input-cost')
const inputDownPaymant = document.querySelector('#input-downpayment')
const inputTerm = document.querySelector('#input-term')



document.querySelector('#base-value').value = programBase
document.querySelector('#it-value').value = programIt
document.querySelector('#gov-value').value = programGov
document.querySelector('#zero-value').value = programZero


document.querySelector('#base-text').innerText = percentFormaters.format(programBase)
document.querySelector('#it-text').innerText = percentFormaters.format(programIt)
document.querySelector('#gov-text').innerText = percentFormaters.format(programGov)
document.querySelector('#zero-text').innerText = percentFormaters.format(programZero)


programInputs.forEach((input) => {
    if(input.checked){
        // totalPersent.innerText = percentFormaters.format(this.value)
    }
    input.addEventListener('click', function() {
        totalPersent.innerText = percentFormaters.format(this.value)
    })
})

const cleavePriceSettings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' '
}


const cleaveCost = new Cleave(inputCost, cleavePriceSettings);

const cleaveDownPaymaent = new Cleave(inputDownPaymant, cleavePriceSettings);

























