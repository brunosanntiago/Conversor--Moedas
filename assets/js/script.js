const button = document.querySelector('button')
const select = document.querySelector('.switch--currency')

const switchCurrency = () => {
    const imgCurrency = document.querySelector('.img-exchange')
    const currencyType = document.querySelector('.euro-dolar')
    const currencyValueType = document.querySelector('.currency-value--type')

    if(select[0].selected == true) {
        imgCurrency.setAttribute('src', './assets/images/eua.png')
        currencyType.innerHTML = 'Dólar Americano'
    } else if (select[1].selected == true) {
        imgCurrency.setAttribute('src', './assets/images/euro.png')
        currencyType.innerHTML = 'Euro'
    } else {
        imgCurrency.setAttribute('src', './assets/images/bitcoin.png')
        currencyType.innerHTML = 'Bitcoin'
    }

    convertReal()
}

const convertReal = async () => {
    const valueReal = document.querySelector('input').value
    const currencyReal = document.querySelector('.currency-value--real')
    const currencyValueType = document.querySelector('.currency-value--type')

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(resp => resp.json())
    
    const dolar = data.USDBRL.high
    const euro = data.EURBRL.high
    const bitcoin = data.BTCBRL.high * 1000

    currencyReal.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valueReal);

    if(select[0].selected == true) {
        currencyValueType.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(valueReal / dolar);
    } else if (select[1].selected == true) { 
        currencyValueType.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(valueReal / euro);
    } else {
        currencyValueType.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'BTC'
        }).format(valueReal / bitcoin);
    }
}

select.addEventListener('change', switchCurrency)
button.addEventListener('click', convertReal)