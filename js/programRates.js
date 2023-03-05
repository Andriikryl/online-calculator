// const Cleave = require("cleave.js");

const percentFormaters = new Intl.NumberFormat('uk-UA', {style: 'percent', maximumFractionDigits: 3});
const priceFormater = new Intl.NumberFormat('uk-UA', {style:'currency', currency: 'UAH', maximumFractionDigits: 0})
const priceFormaterDecimals = new Intl.NumberFormat('uk-UA', {style:'currency', currency: 'UAH', maximumFractionDigits: 2})


const programBase = 0.12;
const programIt = 0.047;
const programGov = 0.067;
const programZero = 0.108;

const programInputs = document.querySelectorAll('input[name="program"]')
const totalPersent = document.querySelector("#total-percent")
const inputCost = document.querySelector('#input-cost')
const inputDownPaymant = document.querySelector('#input-downpayment')
const inputTerm = document.querySelector('#input-term')

const form = document.querySelector('#form')
const totalCost = document.querySelector('#total-cost')
const totalMonthPayment = document.querySelector('#total-month-payment')


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

const cleavePriceSettingsDol = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
    prefix: '$'
}


const cleaveCost = new Cleave(inputCost, cleavePriceSettings);

const cleaveDownPaymaent = new Cleave(inputDownPaymant, cleavePriceSettings);

const cleaveTerm = new Cleave(inputTerm, cleavePriceSettings)

calkMortgage()

form.addEventListener('input', function () {
    calkMortgage()
})

function calkMortgage () {
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownPaymaent.getRawValue()
    totalCost.innerText = priceFormater.format( totalAmount);
    
    const creditRate = +document.querySelector('input[name="program"]:checked').value;

    const monthRate = creditRate / 12

    const years = +cleaveTerm.getRawValue()
    
    const month = years * 12;

    const monthPayment = (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - month))

    totalMonthPayment.innerText = priceFormaterDecimals.format( monthPayment)
    // const morgegeTermYears = document.querySelector('#input-term').value;
}


const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 10000000,
    connect: 'lower',
    // tooltips: true,
    step: 100000,
    range: {
        'min': 0,
        '50%': [10000000, 1000000],
        'max': 1000000000
    }
});

sliderCost.noUiSlider.on('update', function () {

    const sliderValue = parseInt(sliderCost.noUiSlider.get(true))
    cleaveCost.setRawValue(sliderValue)
    calkMortgage()
})



















