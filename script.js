'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  //հաշիվ
  owner: 'Ando Aleksanyan', //սեփականատեր
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300], //շարժումներ
  interestRate: 1.2, //տոկոսադրույք
  pin: 1111, //քորոց
};

const account2 = {
  //հաշիվ
  owner: 'Babken Hakobyan', //սեփականատեր
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30], //շարժումներ
  interestRate: 1.5, //տոկոսադրույք
  pin: 2222, //քորոց
};

const account3 = {
  //հաշիվ
  owner: 'Armen Aleksanyan', //սեփականատեր
  movements: [200, -200, 340, -300, -20, 50, 400, -460], //շարժումներ
  interestRate: 0.7, //տոկոսադրույք
  pin: 3333, //քորոց
};

const account4 = {
  //հաշիվ
  owner: 'Suren Hakobyan', //սեփականատեր
  movements: [430, 1000, 700, 50, 90], //շարժումներ
  interestRate: 1, //տոկոսադրույք
  pin: 4444, //քորոց
};

const accounts = [account1, account2, account3, account4]; //հաշիվներ

// Elements
const labelWelcome = document.querySelector('.welcome'); //բարի գալուստ
const labelDate = document.querySelector('.date'); //ամսաթիվը
const labelBalance = document.querySelector('.balance__value'); //պիտակ Մնացորդ
const labelSumIn = document.querySelector('.summary__value--in'); //պիտակ մեջ
const labelSumOut = document.querySelector('.summary__value--out'); // պիտակ Գումար Դուրս
const labelSumInterest = document.querySelector('.summary__value--interest'); //պիտակ Գումարի տոկոսադրույք
const labelTimer = document.querySelector('.timer'); //պիտակի Ժամաչափ

const containerApp = document.querySelector('.app'); //կոնտեյների հավելված
const containerMovements = document.querySelector('.movements'); //կոնտեյների շարժումներ

const btnLogin = document.querySelector('.login__btn'); //btn Մուտք
const btnTransfer = document.querySelector('.form__btn--transfer'); //btn Փոխանցում
const btnLoan = document.querySelector('.form__btn--loan'); //btn վարկ
const btnClose = document.querySelector('.form__btn--close'); //btn Փակել
const btnSort = document.querySelector('.btn--sort'); //btn Տեսակավորել

const inputLoginUsername = document.querySelector('.login__input--user'); //մուտքագրել Մուտք օգտանուն
const inputLoginPin = document.querySelector('.login__input--pin'); //մուտքագրում Մուտքի փին
const inputTransferTo = document.querySelector('.form__input--to'); //մուտքագրում Փոխանցում դեպի
const inputTransferAmount = document.querySelector('.form__input--amount'); //մուտքագրված փոխանցման գումարը
const inputLoanAmount = document.querySelector('.form__input--loan-amount'); //մուտքագրված վարկի գումարը
const inputCloseUsername = document.querySelector('.form__input--user'); //մուտքագրել Փակել օգտվողի անունը
const inputClosePin = document.querySelector('.form__input--pin'); //մուտքագրել Փակել փին

const displayMovements = function (movements) {
  containerMovements.innerHTML =  '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
     <div class="movements__row">
       <div class="movements__type movements__type--${type}">${i + 1} ${type} </div>
       <div class="movements__value">${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html)
  });
};
displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  // արժույթներ
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; // շարժումներ
