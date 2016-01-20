var fetch = window.fetch;

var addBtn = document.getElementById('add');

addBtn.onclick = function () {
  var newDiv = document.createElement('div');
  newDiv.classList.add('row');
  newDiv.innerHTML = '<hr><input class="urlinput" type="url" placeholder="URL to json" /> <button class="btn btn-default getfiles">Get JSON file </button';

  var container = document.querySelector('.container');
  container.appendChild(newDiv);
  var getFiles = newDiv.querySelector('.getfiles');
  var input = newDiv.querySelector('.urlinput');

  getFiles.onclick = function () {
    fetch(input.value).then(getJson).then(function (response) {
      writeToTable(response, newDiv);
    });
  };

};



function getJson (response) {
  return response.json();
}

function writeToTable(response, destination) {
  var table = document.createElement('table');
  destination.appendChild(table);
  table.classList.add('table');
  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  var trH = document.createElement('tr');
  thead.appendChild(trH);
  var tdDT = document.createElement('td');
  tdDT.innerHTML = 'Schade Type';
  trH.appendChild(tdDT);
  var tdD = document.createElement('td');
  tdD.innerHTML = 'Schade bedrag';
  trH.appendChild(tdD);

  Object.keys(response.damage).forEach(function (key) {
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    var td = document.createElement('td');
    td.innerHTML = response.damage_table[key];
    tr.appendChild(td);

    var td1 = document.createElement('td');
    td1.innerHTML = response.damage[key].toFixed(2);
    tr.appendChild(td1);


  });
}
