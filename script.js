const form = document.getElementById("form");
const resultado = document.querySelector("#resultado span");
const informacaoDiv = document.querySelector(".informacao");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
  const formControls = form.querySelectorAll(".form-control");

  formControls.forEach((formControl) => {
    const input = formControl.querySelector("input");
    const inputValue = input.value.trim();

    if (inputValue.includes(",")) {
      setErrorFor(input, "Por favor, substitua a vírgula por ponto.");
    } else if (inputValue === "") {
      setErrorFor(input, "Este campo é obrigatório.");
    } else {
      setSuccessFor(input);
    }
  });

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.classList.contains("success");
  });

  if (formIsValid) {
    const anoValue = parseFloat(ano.value);
    const ano2Value = parseFloat(ano2.value);
    const fipValue = parseFloat(fip.value);
    const fip2Value = parseFloat(fip2.value);
    const oleoValue = parseFloat(oleo.value);
    const freiosValue = parseFloat(freios.value);
    const alinhamentoValue = parseFloat(alinhamento.value);
    const suspencaoValue = parseFloat(suspencao.value);
    const pneuValue = parseFloat(pneu.value);
    const impostoValue = parseFloat(imposto.value);
    const combustivelValue = parseFloat(combustivel.value);
    const kmlValue = parseFloat(kml.value);
    const ganhosValue = parseFloat(ganhos.value);
    const salarioValue = parseFloat(salario.value);
    const km = calculaKm(fipValue, anoValue, fip2Value, ano2Value, oleoValue, freiosValue, alinhamentoValue, suspencaoValue, pneuValue, impostoValue, ganhosValue, salarioValue, combustivelValue, kmlValue);
    resultado.innerText = km.toFixed(2);
    informacaoDiv.style.display = "block";
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.classList.remove("success");
  formControl.classList.add("error");
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
  formControl.classList.add("success");
}
function calculaKm(fip, ano, fip2, ano2, oleo, freios, alinhamento, suspencao, pneu, imposto, ganhos, salario, combustivel, kml) {
  if (ano === ano2) {
    ano = 0;
    ano2 = 1;
  }
  const pf = (pneu + freios) / 40000;
  const ao = (alinhamento + oleo) / 10000;
  const susp = suspencao / 80000;
  const rkml = combustivel / kml;
  const depkm = ((((100 - ((fip * 100) / fip2)) / (ano2 - ano)) / 100) * fip2) / 20000;
  const kmg1 = pf + ao + susp + rkml;
  const km1 = (salario / (ganhos - kmg1)) * 12;
  const gastoReal = (imposto / km1) + depkm + kmg1;
  const km = salario / (ganhos - gastoReal);
  return km;
}
