'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ando Aleksanyan', //սեփականատեր
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300], //շարժումներ
  interestRate: 1.2, //տոկոսադրույք
  pin: 1111, //քորոց
};

const account2 = {
  owner: 'Babken Hakobyan', //սեփականատեր
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30], //շարժումներ
  interestRate: 1.5, //տոկոսադրույք
  pin: 2222, //քորոց
};

const account3 = {
  owner: 'Exo Paruryan', //սեփականատեր
  movements: [200, -200, 340, -300, -20, 50, 400, -460], //շարժումներ
  interestRate: 0.7, //տոկոսադրույք
  pin: 3333, //քորոց
};

const account4 = {
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
     <div class="movements__row">
       <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
       <div class="movements__value">${mov}💶</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}💶`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}💶`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}💶`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}💶`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = '';
  }
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted)

  sorted = !sorted;
})

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
