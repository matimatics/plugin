async function fetchAFKData() {
    try {
        const storeResponse = await fetch('./data/store.json')

        if (!storeResponse.ok) {
            throw new Error('No fetch on Store')
        }

        const storeData = await storeResponse.json()
        //console.log('Stored Data: ', storeData)

        const priceResponse = await fetch('./data/price.json')

        if (!priceResponse.ok) {
            throw new Error('No fetch on Price')
        }

        const priceData = await priceResponse.json()
        //console.log('price Data: ', priceData)
        return { storeData, priceData }

    } catch (error) {
        console.error('Error on fetchAFKData(): ', error)
        throw error
    }
}

function inputError() {
    const codeInput = document.getElementById('userInput')
    const originalClass = codeInput.className
    codeInput.classList = 'input-error'

    setTimeout(() => {
        codeInput.classList.remove('input-error');
        codeInput.className = originalClass
    }, 1000);
    console.log('no matches')
}

function renderAFK(fuelType) {
    event.preventDefault()
    const userInputValue = document.getElementById('userInput').value.trim()

    if (!userInputValue) {
        alert('No user input on render')
        inputError()
        throw new Error('not user input')
    }

    fetchAFKData().then(data => {
        try {
            const storeData = data.storeData
            const priceData = data.priceData

            filterAFK(storeData, priceData, fuelType, userInputValue)

        } catch (error) {
            console.error('Error on renderAFK(): ', error)
            throw error
        }
    })
}

function filterAFK(postalCodes, prices, fuelType, userInputValue) {

    try {

        let matchFound = false

        const filteredCity = postalCodes.filter(company => {
            const companyValues = Object.values(company)[0]
            const singleValue = Object.values(companyValues).toString()
            const inputMatch = singleValue.includes(userInputValue)
            if (inputMatch) {
                matchFound = true
                return company
            }
        })

        if (matchFound) {
            prices.filter(company => {
                const pricesKey = Object.keys(company)[0]
                const pricesValues = Object.values(company)[0]
                const searchedCity = Object.values(filteredCity)[0]
                const searchedCityKey = Object.keys(searchedCity).toString()
                const locationMatch = pricesKey === searchedCityKey
                const fuelIndex = Object.keys(pricesValues).includes(fuelType)

                if (locationMatch && fuelIndex) {
                    const singleFuelPrice = pricesValues[fuelType]
                    fuelComponent(fuelType, singleFuelPrice)
                }
            })
        } else {
            inputError()
        }

    } catch (error) {
        console.error('Error on filter()', error)
        throw error
    }
}

function priceAdjustmentAFK(quantity, start, min, max) {
    const lowAdjustment = 0.05
    const midAdjustment = 0.03
    const highAdjustment = -0.01
    //const supplement = Math.abs(Math.floor((quantity - start) / 50))
    const midValue = 700
    const HighValue = 2000
    const normalRange = quantity >= start && quantity <= HighValue
    const midRange = quantity < start && quantity >= midValue
    const lowRange = quantity < midValue && quantity >= min
    const highRange = quantity > HighValue
    let calculeAdjustment


    if (normalRange) {
        return 0
    } else if (midRange) {
        return midAdjustment
    } else if (lowRange) {
        return lowAdjustment
    } else if (highRange){
        return highAdjustment
    } else {
        console.log(0)
    }
}

function updatedFuelQuantityAFK(quantity, quantityUpdated, price, startValue, minQuantity, maxQuantity, priceUpdated, totalPriceUpdated) {
    const newQuantity = quantity.value;
    const quantityInner = `<h4>Quantité: ${newQuantity}L</h4>`;
    quantityUpdated.innerHTML = quantityInner;

    const newPriceAdjustment = priceAdjustmentAFK(newQuantity, startValue, minQuantity, maxQuantity);
    console.log('new price adjustment: ', newPriceAdjustment)
    const dynamicPrice = (price + newPriceAdjustment).toFixed(2)
    console.log('dynamicPrice: ', dynamicPrice)
    const priceStatus = dynamicPrice
    const priceInner = `<h3 id="dynamic-liter-price">Prix par litre: ${priceStatus}€</h3>`;
    priceUpdated.innerHTML = priceInner;

    const totalPrice = (priceStatus * newQuantity).toFixed(2)
    const totalInner = `<h3 class="dynamic-total-price">Prix total : ${totalPrice}€</h3>`;
    totalPriceUpdated.innerHTML = totalInner;
}

function fuelComponent(type, price) {
    const startValue = 1000;
    const minQuantity = 500;
    const maxQuantity = 2500;
    const startPrice = startValue * price
    const module = document.querySelector('.plugin-modules');

    const component =
        `
    <div class="fuel-component-wrapper">
        <div class="fuel-title-wrapper">
            <h2>Type: ${type}</h2>
            <h3 id="dynamic-liter-price">Prix par litre: ${price}</h3>
        </div>
        <div class="fuel-quantity-wrapper">
            <h4 id="dynamic-quantity">Quantité: ${startValue}</h4>
            <p>blah blah blah</p>
            <input type="range" id="fuelQuantity" class="fuel-range-input" min="${minQuantity}" max="${maxQuantity}" value="${startValue}">
            <h3 id="dynamic-total-price">Prix total : ${startPrice}</h3>
        </div>
        <button type="submit" class="fuel-cart-button">Ajouter au panier</button>
    </div>
        `;
    module.innerHTML = component;

    const quantity = document.getElementById('fuelQuantity');
    const quantityUpdated = document.getElementById('dynamic-quantity');
    const priceUpdated = document.getElementById('dynamic-liter-price');
    const totalPriceUpdated = document.getElementById('dynamic-total-price');

    function handleInput() {
        updatedFuelQuantityAFK(quantity, quantityUpdated, price, startValue, minQuantity, maxQuantity, priceUpdated, totalPriceUpdated);
    }

    quantity.addEventListener('input', handleInput);
}

function updatedPelletPrice(count, pelletPrice) {
    const pelletDynamic = document.getElementById('pelletTotalPrice')
    const pelletTotal = count * pelletPrice
    console.log('pelletTotal: ', pelletTotal)
    const pelletInner = `<label id='card-prix'><span class='pellet-prix-span' id='pelletTotalPrice'>${pelletTotal} €</span></label> `
    pelletDynamic.innerHTML = pelletInner
}

function pelletComponent() {
    event.preventDefault()
    const module = document.querySelector('.plugin-modules')
    const pelletPrice = 400
    const component = `
    <div class="pellet-prix-title">
        <label>Prix par palette : <span class="pellet-prix-span">${pelletPrice} €</span></label>
        <label id='card-prix'>Total : <span class='pellet-prix-span' id='pelletTotalPrice'>${pelletPrice} €</span></label>
    </div>
    <form method='post' action='' class="pellet-form">
        <p>Palette(s) de Granulés SYLVA de 72 sacs de 15 Kgs <br> (soit 1080kg la palette)</p>
        <label for='pellets-quantity'>Quantité de palettes :</label>
        <div class="pellet-quantity-value">
        <button type='button' class='quantity-modifier-button' id="decrement">-</button>
        <input type='number' name='quantity' class="pellet-bag-quantity" id='count' min='1' max='5' value='1' required>
        <button type='button' class='quantity-modifier-button' id="increment">+</button><br>
        </div>
        <input type='hidden' id='pelletQuantityDisplay'><br>
        <input type='hidden' name='add-to-cart' value='5781'>
        <button type='submit' class='bouton plugin-bouton-final'>Ajouter au panier</button>
    </form>
    `
    module.innerHTML = component

    const incrementValue = document.getElementById('increment')
    console.log('increment', incrementValue)
    const decrementValue = document.getElementById('decrement')
    console.log('decrement', decrementValue)
    let count = document.getElementById('count')


    function setCount() {
        incrementValue.addEventListener('click', () => {
            if (count.value < 5) {
                count.value++
            }
            console.log('count.value: ', count.value)
            updatedPelletPrice(count.value, pelletPrice)
        })
        decrementValue.addEventListener('click', () => {
            if (count.value > 1) {
                count.value--
            }
            console.log('count.value: ', count.value)
            updatedPelletPrice(count.value, pelletPrice)
        })
    }

    setCount()
}

