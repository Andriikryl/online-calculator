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

    // let cost = +cleaveCost.getRawValue()
    // if(cost > 100000) {
    //     cost = 100000
    // }

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

sliderCost.noUiSlider.on('slide', function () {
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true))
    cleaveCost.setRawValue(sliderValue)
    calkMortgage()
})




const sliderDownPayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownPayment, {
    start: 6000000,
    connect: 'lower',
    // tooltips: true,
    step: 100000,
    range: {
        'min': 0,
        'max': 10000000
    }
});

sliderDownPayment.noUiSlider.on('slide', function () {
    const sliderValue = parseInt(sliderDownPayment.noUiSlider.get(true))
    cleaveDownPaymaent.setRawValue(sliderValue)
    calkMortgage()
})


const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    // tooltips: true,
    step: 1,
    range: {
        'min': 1,
        'max': 30,
    }
});

sliderTerm.noUiSlider.on('slide', function () {
    const sliderValue = parseInt(sliderTerm.noUiSlider.get(true))
    cleaveTerm.setRawValue(sliderValue)
    calkMortgage()
})


inputCost.addEventListener('input', function () {

    const value = +cleaveCost.getRawValue()

    sliderCost.noUiSlider.set(value)

    if(value > 10000000){
        inputCost.closest('.param__details').classList.add('param__details--error')
    }

    if(value <= 10000000){
        inputCost.closest('.param__details').classList.remove('param__details--error')
    }

    const percentMin = value * 0.15;
    const percentMax = value * 0.90;

    sliderDownPayment.noUiSlider.updateOptions({
        range: {
            min: percentMin,
            max: percentMax,
        }
    })

})



inputCost.addEventListener('change', function () {

    const value = +cleaveCost.getRawValue()



    if(value <= 10000000){
        inputCost.closest('.param__details').classList.remove('param__details--error');
        cleaveCost.setRawValue(10000000)
    }

})









