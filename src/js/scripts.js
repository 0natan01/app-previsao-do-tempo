const apiKey = 'c1f79abd8a66f33bac62d89091825bfb'

const btn = document.querySelector(".btn-search")
const cityElement = document.querySelector(".cidade")
const tempElement = document.querySelector(".temp")
const descElement = document.querySelector(".description")
const wheatherIcon = document.querySelector(".wheather-icon")
const windElement = document.querySelector(".vento")
const umidadeElemnet = document.querySelector(".umidade")


async function getDados(cidade){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`)

    return await response.json()   

}


async function putDadosNaTela(cidade) {
    const dados = await getDados(cidade)

    cityElement.innerText = dados.name
    tempElement.innerText = Math.floor(dados.main.temp) + 'ºC'
    windElement.innerText =   Math.floor(dados.wind.speed * 3.6 )+ ' km/h'
    umidadeElemnet.innerText =   dados.main.humidity + '%'
    
    descElement.innerText = dados.weather[0].description
    
    wheatherIcon.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
}

  
btn.addEventListener("click" , async () => {
    const cidade = document.querySelector(".input-search").value

    await getDados(cidade)
    
    putDadosNaTela(cidade)

    

    if(cidade) return
})

document.querySelector(".input-search").addEventListener("keyup" , (e) => {
    const cidade = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        putDadosNaTela(cidade)
    }
})



