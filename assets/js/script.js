//variables
const button = document.getElementById("button");
const inputClp = document.getElementById("clpValue");
const selectOutput = document.getElementById("selectOutput");
const converted = document.getElementById("converted");

const urlApi = "https://mindicador.cl/api/";

//obtener datos de la api, async await
const getExchangeRates = async () => {
  try {
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching exchange rates:", error);
    throw error;
  }
};

//llenar el select con las opciones de monedas con el nombre y valor
const populateCurrencyOptions = (data) => {
  Object.keys(data).forEach((key) => {
    const currency = data[key];
    const nameForCurrency = currency.nombre;
    if (currency.nombre && currency.valor) {
      //crear option
      const option = document.createElement("option");
      //agregar valor y texto al option
      option.value = currency.valor;
      //agregar texto al option
      option.textContent = `${nameForCurrency}`;
      selectOutput.appendChild(option);
    }
  });
};


const convertCurrency = () => {
    //obtener valor del input y del select y convertirlos a float
    const clpAmount = parseFloat(inputClp.value);
    const selectedCurrencyRate = parseFloat(selectOutput.value);
    
    // seleccionar el indice de la opcion seleccionada
    const selectedOptionIndex = selectOutput.selectedIndex;
  
    // obtener el contenido de la seleccion
    const selectedOptionText = selectOutput.options[selectedOptionIndex].textContent;
  
    //validar que el input no este vacio y que sea un numero
    if (!isNaN(clpAmount) && !isNaN(selectedCurrencyRate)) {
      const convertedAmount = clpAmount / selectedCurrencyRate;
      //redondear a 1 decimal y concatenar un texto amigable
      converted.textContent = `${clpAmount} pesos chilenos son ${convertedAmount.toFixed(2)} en ${selectedOptionText} `;
    } else {
      //alerta si el input esta vacio
      alert("Falta llenar datos");
    }
  };


//cadena de promesas
getExchangeRates().then((data) => populateCurrencyOptions(data));

//evento para el boton
button.addEventListener("click", convertCurrency);


// setup 
// const data = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [{
//     label: 'Weekly Sales',
//     data: [18, 12, 6, 9, 12, 3, 9],
//     backgroundColor: [
//       'rgba(255, 26, 104, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(255, 206, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(255, 159, 64, 0.2)',
//       'rgba(0, 0, 0, 0.2)'
//     ],
//     borderColor: [
//       'rgba(255, 26, 104, 1)',
//       'rgba(54, 162, 235, 1)',
//       'rgba(255, 206, 86, 1)',
//       'rgba(75, 192, 192, 1)',
//       'rgba(153, 102, 255, 1)',
//       'rgba(255, 159, 64, 1)',
//       'rgba(0, 0, 0, 1)'
//     ],
//     borderWidth: 1
//   }]
// };

// // config 
// const config = {
//   type: 'bar',
//   data,
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// };

// // render init block
// const myChart = new Chart(
//   document.getElementById('myChart'),
//   config
// );

// // Instantly assign Chart.js version
// const chartVersion = document.getElementById('chartVersion');
// chartVersion.innerText = Chart.version;