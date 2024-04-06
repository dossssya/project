// PHONE CHACKER

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

const validatePhone = () => {
    const phoneNumber = phoneInput.value.trim();
    if (regExp.test(phoneNumber)) {
        phoneSpan.innerHTML = 'OK';
        phoneSpan.style.color = 'green';
    } else {
        phoneSpan.innerHTML = 'NOT OK';
        phoneSpan.style.color = 'red';
    }
};

phoneButton.addEventListener('click', () => {
    try {
        validatePhone();
    } catch (error) {
        console.error('Error validating phone number:', error);
    }
});


// TAB SLIDER
const tabContent = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');
let currentIndex = 0;
let intervalId;

const hideTabContent = () => {
    tabContent.forEach((content) => {
        content.style.display = 'none';
    });
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    tabContent[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
};

const nextTab = () => {
    hideTabContent();
    currentIndex = (currentIndex + 1) % tabContent.length;
    showTabContent(currentIndex);
};

hideTabContent();
showTabContent();

const startAutoSlide = () => {
    intervalId = setInterval(nextTab, 3000);
};

const stopAutoSlide = () => {
    clearInterval(intervalId);
};

const fetchDataTab = async () => {
    try {
        startAutoSlide();
    } catch (error) {
        console.error('Error starting auto slide:', error);
    }
};

fetchDataTab();

tabsParent.addEventListener('click', (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                hideTabContent();
                currentIndex = tabIndex;
                showTabContent(tabIndex);
            }
        });
        stopAutoSlide(); // Остановить автоматическое переключение при клике на вкладку
    }
});

tabs.forEach((tab) => {
    tab.addEventListener('click', startAutoSlide);
});



// converter
const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement1, targetElement2, current, data) => {
    element.oninput = () => {
        switch (current) {
            case 'som':
                targetElement1.value = (element.value * data.som_to_usd).toFixed(2);
                targetElement2.value = (element.value * data.som_to_eur).toFixed(2);
                break;
            case 'usd':
                targetElement1.value = (element.value * data.usd_to_eur).toFixed(2);
                targetElement2.value = (element.value * data.usd_to_som).toFixed(2);
                break;
            case 'eur':
                targetElement1.value = (element.value * data.eur_to_usd).toFixed(2);
                targetElement2.value = (element.value * data.eur_to_som).toFixed(2);
                break;
            default:
                break;
        }
        element.value === '' && (targetElement1.value = targetElement2.value = '');
    };
};

async function fetchDataConverter() {
    try {
        const response = await fetch('../data/converter.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        converter(somInput, usdInput, eurInput, 'som', data);
        converter(usdInput, eurInput, somInput, 'usd', data);
        converter(eurInput, usdInput, somInput, 'eur', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchDataConverter();



// Card Switcher

const cardBlock = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let count = 1;
const totalCards = 200;

async function fetchCard(cardNumber) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`);
        const data = await response.json();
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.error('Error fetching card data:', error);
    }
}

function updateCard(direction) {
    if (direction === 'prev') {
        count = (count === 1) ? totalCards : count - 1;
    } else if (direction === 'next') {
        count = (count === totalCards) ? 1 : count + 1;
    }

    fetchCard(count);
}

btnPrev.onclick = () => updateCard('prev');
btnNext.onclick = () => updateCard('next');

fetchCard(count);

// fetch запрос
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log("Data from 'https://jsonplaceholder.typicode.com/posts':", data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


//weather



const searchInput = document.querySelector('.cityName');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

const API_KEY = 'e417df62e04d3b1b111abeab19cea714';
const URL = 'https://api.openweathermap.org/data/2.5/weather';

const citySearch = () => {
    searchInput.oninput = async (event) => {
        try {
            const response = await fetch(`${URL}?q=${event.target.value}&appid=${API_KEY}`);
            const data = await response.json();
            console.log('Response data:', data);
            city.innerHTML = data.name ? data.name : 'Город не найден...';
            temp.innerHTML = data.main && data.main.temp ? Math.round(data.main.temp - 273) + '&deg;C' : "...";
        } catch (error) {
            console.log('Error:', error);
        }
    }
}

citySearch();
