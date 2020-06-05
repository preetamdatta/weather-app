const weatherForm = document.querySelector('form')
const search = document.getElementsByName('search')[0]

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    document.getElementById('weatherInfo').innerText = 'Loading...'

    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(search.value) 

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error)
                return document.getElementById('weatherInfo').innerText = data.error
            document.getElementById('location').innerText = data.location
            document.getElementById('weatherInfo').innerText = data.forecast
        })
    })
})