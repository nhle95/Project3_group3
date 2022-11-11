// table and pie charts
url = "https://covid19.mathdro.id/api/confirmed"


// numberWithCommas = (x) => {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// }



// table
d3.json(url).then(function(data){

    let casesByCountries = data.sort((a, b) => b.confirmed - a.confirmed)
    // console.log(casesByCountries);
    let table_countries_body = document.querySelector('#table-countries tbody')
    table_countries_body.innerHTML = ''


    newObject = [{
    	"countryRegion": "None",
    	"deaths": -1,
    	"confirmed": -1
    }]; // should have countryRegion, confirmed, and deaths

    

    for (let i = 0; i < casesByCountries.length; i++){
    	country_region_list = (newObject.map((item) => (item["countryRegion"])))
    	next_province_country = casesByCountries[i].countryRegion
		if (country_region_list.indexOf(next_province_country) != -1){ 	
			for (let j = 0; j < newObject.length; j++){
				if (casesByCountries[i].countryRegion === newObject[j].countryRegion){ 
					newObject[j].deaths = newObject[j].deaths + casesByCountries[i].deaths;
					newObject[j].confirmed = newObject[j].confirmed + casesByCountries[i].confirmed;
				    break;
				}
			}
		}
		else{
			newObject.push({"countryRegion": casesByCountries[i].countryRegion,
							"deaths": casesByCountries[i].deaths,
							"confirmed": casesByCountries[i].confirmed});
    	}
	}
	

	
	let sorted_newObject = newObject.sort((a, b) => b.confirmed - a.confirmed)

    for (let i = 0; i < 10; i++) {
        let row = `
            <tr>
                <td>${sorted_newObject[i].countryRegion}</td>
                <td>${(sorted_newObject[i].confirmed)}</td>
                <td>${(null)}</td>
                <td>${(sorted_newObject[i].deaths)}</td>
            </tr>
        `
        // console.log(row);
        table_countries_body.innerHTML += row
    }

});






// bar charts
d3.json(url).then(function(data){
	let casesByCountries = data.sort((a, b) => b.confirmed - a.confirmed)
    // console.log(casesByCountries);
    // let table_countries_body = document.querySelector('#bar-chart')
    // table_countries_body.innerHTML = ''


    newObject = [{
    	"countryRegion": "None",
    	"deaths": -1,
    	"confirmed": -1
    }]; // should have countryRegion, confirmed, and deaths

    

    for (let i = 0; i < casesByCountries.length; i++){
    	country_region_list = (newObject.map((item) => (item["countryRegion"])))
    	next_province_country = casesByCountries[i].countryRegion
		if (country_region_list.indexOf(next_province_country) != -1){ 	
			for (let j = 0; j < newObject.length; j++){
				if (casesByCountries[i].countryRegion === newObject[j].countryRegion){ 
					newObject[j].deaths = newObject[j].deaths + casesByCountries[i].deaths;
					newObject[j].confirmed = newObject[j].confirmed + casesByCountries[i].confirmed;
				    break;
				}
			}
		}
		else{
			newObject.push({"countryRegion": casesByCountries[i].countryRegion,
							"deaths": casesByCountries[i].deaths,
							"confirmed": casesByCountries[i].confirmed});
    	}
	}
	// console.log("Hi")
	// console.log(newObject)
	// france 35861040
	let sorted_newObject = newObject.sort((a, b) => b.confirmed - a.confirmed)
	let bar_chart_data = sorted_newObject.slice(0,10)

	let trace1 = {
	  x: bar_chart_data.map((item)=>(item["countryRegion"])),
	  y: bar_chart_data.map((item)=>(item["confirmed"])),
	  text: bar_chart_data.map((item)=>(item["countryRegion"])),
	  name: "",
	  type: "bar",
	  marker:{
	  	color: "crimson"
	  }
	  
	};

	let bardata = [trace1];

	// Apply a title to the layout
	let layout = {
	  title: "",
	  barmode: "group",
	  // Include margins in the layout so the x-tick labels display correctly
	  margin: {
	    l: 50,
	    r: 50,
	    b: 50,
	    t: 50,
	    pad: 4
	  },
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
	};

	// Render the plot to the div tag with id "plot"
	Plotly.newPlot("bar-chart", bardata, layout);


});



