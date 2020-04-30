var main = document.getElementById('main');
document.getElementById('btn_ara').addEventListener('click',weather_current(document.getElementById('ara').value));

function weather_current(city="istanbul"){
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=<apikey>&q=${city}&days=3&lang=tr&hour=24`)
  .then(Response => {
    return Response.json();
  })
  .then(data => {
    console.log(data);
    main.innerHTML = `
    Şehir : ${data.location.region} <br>
    Ülke : ${data.location.country} <br>
    Yerel Saat : ${data.location.localtime} <hr>
    <img src=${data.current.condition.icon}><br>
    Şimdi : ${data.current.condition.text}<br>
    Derece : ${data.current.temp_c}°C<br>
    Hissedilen Sıcaklık : ${data.current.feelslike_c}°C<br>
    <br>
    Son Güncelleme : ${data.current.last_updated}<br>
    <hr>
    `
    data.forecast.forecastday.forEach(day => {
      main.innerHTML += `
      Tarih : ${day.date}<br>
      <img src=${day.day.condition.icon}><br>
      Hava Durumu : ${day.day.condition.text}<br>
      En Yüksek Derece : ${day.day.maxtemp_c}°C<br>
      En Düşük Derece : ${day.day.mintemp_c}°C<br>
      En Ortalama Derece : ${day.day.avgtemp_c}°C<br>
      Yağmur Yağma Olasılığı : ${day.day.daily_chance_of_rain}<br>
      UV : ${day.day.uv}<br>
      <br>
      Gün Doğumu : ${day.astro.sunrise}<br>
      Gün Batımı : ${day.astro.sunset}<br>
      Ay Doğumu: ${day.astro.moonrise}<br>
      Ay Batımı : ${day.astro.moonset}<br>
      <hr>
      `
    });
  })
}


weather_current("istanbul");
