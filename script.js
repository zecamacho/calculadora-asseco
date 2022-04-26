const visor = document.querySelector(".visor");
const initialState = "0";
//clearflag é usado para verificar se deve limpar o ecrã caso
// após uma conta o valor de entrada é um número
let clearFlag = true;
let result = [];

const operatorsFunctions = {
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "-": (a, b) => a - b,
  "+": (a, b) => a + b,
};

//          ['+','-', '*', '/']
const operators = Object.keys(operatorsFunctions);

const isValueValid = (value) => {
  //valor de entrada é uma operação?
  const valueIsOperator = operators.includes(value);

  //Se o valor de entrada é um número e é após uma conta -> limpa o ecrâ
  if (!valueIsOperator && clearFlag) clear();

  //valor de entrada é 0 e no visor está um 0
  if (result.length === +initialState && value === initialState) return false;

  //valor de entrada é uma operação (+ - / *) e no visor está um 0
  if (result.length === +initialState && valueIsOperator) return false;

  //valor de entrada é uma operação e já existe uma operação no visor
  if (valueIsOperator && operators.some((o) => result.includes(o)))
    return false;

  clearFlag = false;

  return true;
};

const calc = () => {
  //Qual é a operação a fazer?
  let operator = result.find((c) => operators.includes(c));

  //join do array e split do array pelo operador. Ex: ['9', '+', '9']
  //join ->  '9+9'
  //split -> firstnumber = 9, secondNumber = 9
  let [firstNumber, secondNumber] = result.join("").split(operator);

  if (!firstNumber || !secondNumber) return;

  let fn = operatorsFunctions[operator];

  let resultCalc = fn(firstNumber, secondNumber);

  if (resultCalc === Infinity || isNaN(resultCalc)) {
    clear();
    visor.textContent = "Not a number";
    return;
  }

  //Cálculo é válido -> atualiza as variavéis e visor
  visor.textContent = resultCalc;
  result = [resultCalc];
  clearFlag = true;
};

/* -------------------------------------------------------------------------- */
/*                                   Events                                   */
/* -------------------------------------------------------------------------- */

const handleButtonClick = (event) => {
  let value = event.target.dataset.value;

  if (value === "=") {
    //não esquecer que este return, embora dentro das chavetas do if,
    // sai fora da função handleButtonClick, que é o pretendido
    return calc();
  }

  if (!isValueValid(value)) return;

  //valor é válido, adiciona ao array result
  result = [...result, value];

  //concatena o array result numa string e mete no visor
  visor.textContent = result.join("");
};

const clear = () => {
  visor.textContent = initialState;
  result = [];
};

/* ------------------------------------ - ----------------------------------- */

// querySelectorAll retorna um array de elementos que fazem match
// com o seletor introduzido e mapeados esse array com um .forEach
// para adicionar o eventlistener a cada um deles
document
  .querySelectorAll(".number, .operation")
  .forEach((element) => element.addEventListener("click", handleButtonClick));

// Clear
document.querySelector(".clear").addEventListener("click", clear);
