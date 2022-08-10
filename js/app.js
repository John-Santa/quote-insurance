//CONSTRUCTORS
function Insurance(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type;
}

Insurance.prototype.calculateQuotation = ({ brand, year, type }) => {
    /**
     * 1 = americano 1.15
     * 2 = asiatico 1.05
     * 3 = europeo 1.35
     */
    let base = 2000;
    let price;
    switch (brand) {
        case '1':
            price = base * 1.15;
            break;
        case '2':
            price = base * 1.05;
            break;
        case '3':
            price = base * 1.35;
            break;
        default:
            break;
    }

    //Leer el año del auto y restar el porcentaje de descuento
    const yearDifference = new Date().getFullYear() - year;
    let difference = (yearDifference * 3) / 100;
    price = price - price * difference;

    /**
     * Si el seguro es básico se multiplica por 30% más
     * Si el seguro es completo se multiplica por 50% más
     */
    if (type === 'basico') {
        price = price * 1.30;
    } else {
        price = price * 1.50;
    }

    return price;
}

function UI() {}

//Fill options of the year
UI.prototype.addOptions = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.getElementById('year');
    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.showMessage = (message, className) => {
    const div = document.createElement('div');
    div.className = `mensaje mt-10 ${className}`;
    div.textContent = message;
    const result = document.querySelector('#resultado');
    const form = document.querySelector('#cotizar-seguro');
    form.insertBefore(div, result);
    setTimeout(() => {
        document.querySelector('.mensaje').remove();
    } , 3000);
}

UI.prototype.showResult = (price, { brand, year, type }) => {
    let brnadText;
    switch (brand) {
        case '1':
            brnadText = 'Americano';
            break;
        case '2':
            brnadText = 'Asiatico';
            break;
        case '3':
            brnadText = 'Europeo';
            break;
        default:
            break;
    }

    const result = document.querySelector('#resultado');
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu Resumen:</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${brnadText} </span></p>
        <p class="font-bold">Marca: <span class="font-normal"> ${year} </span></p>
        <p class="font-bold">Marca: <span class="font-normal capitalize"> ${type} </span></p>
        <p class="font-bold">Precio: <span class="font-normal"> $ ${price} </span></p>
    `;

    //Show spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        result.appendChild(div);
    }, 3000);

}

//Instances of the UI class
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.addOptions();
});

const eventListeners = () => {
    const form = document.getElementById('cotizar-seguro');
    form.addEventListener('submit', quoteInsurance);
}

const quoteInsurance = (e) => {
    e.preventDefault();

    //Get form values
    const brand = document.getElementById('marca').value;
    const year = document.getElementById('year').value;
    const type = document.querySelector('input[name="tipo"]:checked').value;

    //Validate form
    if (brand === '' || year === '' || type === '') {
        ui.showMessage('Todos los campos son obligatorios', 'error');
    } else {
        ui.showMessage('Cotizando...', 'correcto');
    }

    //ocultal cotizacoines previas
    const result = document.querySelector('#resultado div');
    if (result != null) {
        result.remove();
    }

    //Create new Insurance
    const insurance = new Insurance(brand, year, type);
    const price = insurance.calculateQuotation(insurance);

    ui.showResult(price, insurance);

}


//
eventListeners();