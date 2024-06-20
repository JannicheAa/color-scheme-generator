const formEl = document.getElementById("form");
const selectorEl = document.getElementById("selector");
const colorPickerEl = document.getElementById("color-picker");
const colorContainer = document.getElementById("color-container");
const color1El = document.getElementById("color1");
const color2El = document.getElementById("color2");
const color3El = document.getElementById("color3");
const color4El = document.getElementById("color4");
const color5El = document.getElementById("color5");
const hexCodesEl = document.getElementById("hex-codes");
const colors = [color1El, color2El, color3El, color4El, color5El];

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  let cleanHexCode = colorPickerEl.value.substring(1);
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${cleanHexCode}&mode=${selectorEl.value}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      hexCodesEl.innerHTML = "";
      let newHexCodes = "";
      colors.forEach(function (color, index) {
        let newColor = (color.style.backgroundColor =
          data.colors[index].hex.value);
        color.setAttribute("data-farge", `${newColor}`);
        newHexCodes += `
        <li data-farge="${newColor}">${newColor}</li>
        `;
      });
      hexCodesEl.innerHTML = newHexCodes;
    });
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.farge) {
    console.log(e.target);
    console.log(e.target.dataset.farge);
    handleClick(e.target.dataset.farge);
  }
});

function handleClick(fargekode) {
  const valueToCopy = fargekode; // Kopier verdien til utklippstavlen
  navigator.clipboard.writeText(valueToCopy).then(function () {
    // Vis en melding for å bekrefte at kopieringen var vellykket
    var melding = document.createElement("div");
    melding.textContent = "Fargekode kopiert";
    melding.style.backgroundColor = "#4CAF50"; // Grønn farge
    melding.style.color = "white";
    melding.style.padding = "10px";
    melding.style.position = "fixed";
    melding.style.top = "10px";
    melding.style.left = "50%";
    melding.style.transform = "translateX(-50%)";
    melding.style.borderRadius = "5px";
    melding.style.zIndex = "1000";
    melding.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";

    document.body.appendChild(melding);

    // Fjern meldingen etter noen få sekunder
    setTimeout(function () {
      document.body.removeChild(melding);
    }, 2000); // Meldingen vises i 2 sekunder
  });
}
