document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("click", function () {
    if (this.dataset.wasChecked === "true") {
      this.checked = false;
      this.dataset.wasChecked = "false";
    } else {
      // Unmark all others in the same group
      document.querySelectorAll(`input[name="${this.name}"]`).forEach((r) => {
        r.dataset.wasChecked = "false";
      });
      this.dataset.wasChecked = "true";
    }
  });
});

const repaymentChoice = document.querySelector(".repayment-choice");
const interestOnly = document.querySelector(".interest-only");
let isType = false;

repaymentChoice.addEventListener("click", () => {
  if (!repaymentChoice.classList.contains("repayment-choice-selected")) {
    repaymentChoice.classList.add("repayment-choice-selected");
    interestOnly.classList.remove("interest-only-selected");
    isType = true;
  }
});

// console.log(isType);

interestOnly.addEventListener("click", () => {
  if (!interestOnly.classList.contains("interest-only-selected")) {
    interestOnly.classList.add("interest-only-selected");
    repaymentChoice.classList.remove("repayment-choice-selected");
  }
  isType = true;
});

const amountInput = document.querySelector(".js-amount-input");

amountInput.addEventListener("input", function () {
  let raw = this.value.replace(/[^0-9.]/g, "");

  const parts = raw.split(".");
  if (parts.length > 2) raw = parts[0] + "." + parts.slice(1).join("");

  const [intPart, decPart] = raw.split(".");

  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  this.value = decPart !== undefined ? `${formatted}.${decPart}` : formatted;
});

const calBtn = document.querySelector(".cal-repayment");
const termInput = document.querySelector(".js-term-input");
const rateInput = document.querySelector(".js-rate-input");
const completedResult = document.querySelector(".completed-results");
const emptyResult = document.querySelector(".empty-results");

// for error state
const amountContainer = document.querySelector(".amount-input-container");
const currency = document.querySelector(".currency");
const amountErrorMessage = document.querySelector(".amount-error-message");
const termContainer = document.querySelector(".term-input-container");
const term = document.querySelector(".term");
const termErrorMessage = document.querySelector(".term-error-message");
const rateContainer = document.querySelector(".rate-input-container");
const rate = document.querySelector(".rate");
const rateErrorMessage = document.querySelector(".rate-error-message");
const typeErrorMessage = document.querySelector(".type-error-message");

calBtn.addEventListener("click", () => {
  let principal = Number(amountInput.value.replace(/[^0-9.]/g, ""));
  let n = termInput.value;
  let r = rateInput.value;

  n = n * 12;
  r = r / 12 / 100;

  let monthlyPayment = (principal * (r * (1 + r) ** n)) / ((1 + r) ** n - 1);

  let totalRepayment = monthlyPayment * n;

  console.log(principal);
  console.log(n);
  console.log(r);
  console.log(monthlyPayment);
  console.log(totalRepayment);

  document.querySelector(".monthly-data").innerHTML =
    `&pound;${formatCurrency(monthlyPayment)}`;

  document.querySelector(".total-data").innerHTML =
    `&pound;${formatCurrency(totalRepayment)}`;

  if (monthlyPayment && isType === true) {
    completedResult.classList.add("completed-results-display");
    emptyResult.classList.add("empty-results-no-display");
  } else {
    completedResult.classList.remove("completed-results-display");
    emptyResult.classList.remove("empty-results-no-display");
  }

  // error states
  // this is for amount
  if (principal === 0) {
    amountContainer.classList.add("amount-input-error");
    currency.classList.add("currency-error");
    amountErrorMessage.classList.add("amount-error-message-display");
  } else {
    amountContainer.classList.remove("amount-input-error");
    currency.classList.remove("currency-error");
    amountErrorMessage.classList.remove("amount-error-message-display");
  }

  //this is for term
  if (n === 0) {
    termContainer.classList.add("term-input-error");
    term.classList.add("term-error");
    termErrorMessage.classList.add("term-error-message-display");
  } else {
    termContainer.classList.remove("term-input-error");
    term.classList.remove("term-error");
    termErrorMessage.classList.remove("term-error-message-display");
  }

  //this is for rate
  if (r === 0) {
    rateContainer.classList.add("rate-input-error");
    rate.classList.add("rate-error");
    rateErrorMessage.classList.add("rate-error-message-display");
  } else {
    rateContainer.classList.remove("rate-input-error");
    rate.classList.remove("rate-error");
    rateErrorMessage.classList.remove("rate-error-message-display");
  }

  if (isType === false) {
    typeErrorMessage.classList.add("type-error-message-display");
  } else {
    typeErrorMessage.classList.remove("type-error-message-display");
  }
});

function formatCurrency(num) {
  const fixed = Number(num).toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${formatted}.${decPart}`;
}

const clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
  console.log("clear");
  document.querySelector(".js-amount-input").value = "";
  document.querySelector(".js-term-input").value = "";
  document.querySelector(".js-rate-input").value = "";
});

// this is for active state

// amountContainer.addEventListener("click", () => {
//   if (!amountContainer.classList.contains("amount-input-active")) {
//     amountContainer.classList.add("amount-input-active");
//   }
// });
