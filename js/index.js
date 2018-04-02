let innerUsd = document.getElementById('rate-usd');
let lastRate = 0;

update();

setInterval(update, 100000);

function update() {
  let xhr = new XMLHttpRequest();
  write(xhr.readyState);

  xhr.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json', true);
  write(xhr.readyState);
  
  xhr.onreadystatechange = function() {
      write('state ' + xhr.readyState)
  };
  
  xhr.onload = function () {
    let apiPath = JSON.parse(xhr.responseText);
    let delta = apiPath.bpi.USD.rate_float - lastRate;

    innerUsd.textContent = apiPath.bpi.USD.rate + ' - ' + apiPath.bpi.USD.code;

    if (lastRate && delta > 0) {
      innerUsd.classList.add('up');
      innerUsd.classList.remove('down');
    }
    if (lastRate && delta < 0) {
      innerUsd.classList.add('down');
      innerUsd.classList.remove('up');
    }

    lastRate = apiPath.bpi.USD.rate_float;
  };
  
  xhr.send();
}

function write(text) {
  let li = log.appendChild(document.createElement('li'));
  li.innerHTML = text;
}