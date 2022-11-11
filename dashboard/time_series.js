// Use the D3 library to read in samples.json from the URL
const url = "https://api.covid19api.com/summary";


const countrysSelectELement = document.querySelector(".country_options");
let currentCountry; 
const chartDiv = document.querySelector(".chart_div");

function displayChart(data) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute("id", "myChart");
  chartDiv.appendChild(canvas);
  const dailyCases = data.map((day, index) => {
      if (index) return Math.abs(day.Confirmed - data[index - 1].Confirmed); 
      else day.Confirmed; 
  });
  
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: data.map(day => day.Date),
          datasets: [{
              label: 'Daily Cases',
              backgroundColor: '#C70039',
              borderColor: '#C70039',
              data: dailyCases,
              borderWidth: 1,
          }]
      },

      // Configuration options go here
      options: {}
  });

}





function getCovidData(country) {
  const endpoint = `https://api.covid19api.com/total/dayone/country/${country}`;
  fetch(endpoint).then(response => response.json())
    .then(data => {
		chartDiv.innerHTML = "";
		displayChart(data);
		// Use D3 to select the table
		// console.log(data);
		d3.select("#death-total").text(data[data.length-1]["Deaths"]);
		d3.select("#recovered-total").text(data[data.length-1]["Recovered"]);
		d3.select("#confirmed-total").text(data[data.length-1]["Confirmed"]);




		var pie_data = [{
		  values: [data[data.length-1]["Deaths"], data[data.length-1]["Confirmed"]],
		  labels: ['Deaths', 'Confirmed'],
		  domain: {column: 0},
		  name: "",
		  hoverinfo: 'label+percent',
		  hole: .4,
		  type: 'pie',
      marker:{
        colors: ["grey", "crimson"]
      }
		}];

		var pie_layout = {
		  title: "",
		  annotations: [
		    {
		      font: {
		        size: 20
		      },
		      showarrow: false,
		      text: '',
		      x: 0.17,
		      y: 0.5
		    }],
		  height: 350,
		  width: 450,
		  showlegend: true,
		  grid: {rows: 1, columns: 2},
      paper_bgcolor:'rgba(0,0,0,0)'

		};

		Plotly.newPlot('pie-chart', pie_data, pie_layout);

    })
    .catch(err => console.warn(err));
  
	

}

function getCountries() {
  const endpoint = "https://api.covid19api.com/countries";
  fetch(endpoint).then(response => response.json())
    .then(countries => {
      countries.forEach(country => {
         const countryName = country.Country; 
         const option = document.createElement("option");
         option.setAttribute("value", countryName);
         option.innerHTML = countryName; 
         countrysSelectELement.appendChild(option);
      });
      currentCountry = countrysSelectELement.children[0].value; 
      getCovidData(currentCountry);
    })
    .catch(err => console.warn(err));
}

getCountries();

countrysSelectELement.addEventListener("click", () => {
   const currentIndex = countrysSelectELement.selectedIndex; 
   const countrySelected = countrysSelectELement.children[currentIndex].value; 
    currentCountry = countrySelected; 
   getCovidData(countrySelected);
});