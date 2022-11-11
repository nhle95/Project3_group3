const COLORS = {
    confirmed: '#ff0000',
    recovered: '#008000',
    deaths: '#373c43',
}

const CASE_STATUS = {
    confirmed: 'confirmed',
    recovered: 'recovered',
    deaths: 'deaths',
}

let body = document.querySelector('body')

let countries_list

let all_time_chart, days_chart, recover_rate_chart

window.onload = async () => {
    // console.log('ready...')
    // console.log(await covidApi.getSummary())
    // only init chart on page loaded first time

    initTheme()

    
}


// dark mode switch

initTheme = () => {
    let dark_mode_switch = document.querySelector('#darkmode-switch')

    dark_mode_switch.onclick = () => {
        dark_mode_switch.classList.toggle('dark')
        body.classList.toggle('dark')

        setDarkChart(body.classList.contains('dark'))
    }
}

// set dark mode for charts
setDarkChart = (dark) => {
    let theme = {
        theme: {
            mode: dark ? 'dark' : 'light'
        }
    }
}

