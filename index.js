var fetch = window.fetch;

var addBtn = document.getElementById('add');

addBtn.onclick = function () {
  window.newDiv = document.createElement('div');
  newDiv.classList.add('row');
  newDiv.innerHTML = '<hr><input class="urlinput" type="file" placeholder="URL to json" />'; //'<button class="btn btn-default getfiles">Get JSON file </button'

  var container = document.querySelector('.container');
  container.appendChild(newDiv);
  // var getFiles = newDiv.querySelector('.getfiles');
  var input = newDiv.querySelector('.urlinput');
  input.addEventListener("change", handleFiles, false);
  // getFiles.onclick = function () {
  //
  //
  //   // fetch(input.value).then(getJson).then(function (response) {
  //   //   writeToTable(response, newDiv);
  //   // });
  // };

};

function handleFiles() {
  var fileList = this.files; /* now you can work with the file list */
  var reader = new FileReader();
  reader.onloadend = function (progress, buff) {

    writeToTable(JSON.parse(this.result), window.newDiv);
  };
  reader.readAsText(this.files[0]);
}

function getJson (response) {
  return response.json();
}

function writeToTable(response, destination) {
  var h3 = document.createElement('h3');
  h3.innerHTML = 'Totale schade: ' + response.total_damage.toFixed(2);
  destination.appendChild(h3);
  var table = document.createElement('table');
  destination.appendChild(table);
  table.classList.add('table');
  table.classList.add('table-striped');
  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  var trH = document.createElement('tr');
  trH.innerHTML = '<th>#</th><th>Schade Type</th><th>Schade Bedrag</th>'

  thead.appendChild(trH);

  Object.keys(response.damage).forEach(function (key) {
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    var tdN = document.createElement('td');
    tdN.innerHTML = key;
    tr.appendChild(tdN);

    var td = document.createElement('td');
    td.innerHTML = response.damage_table[key];
    tr.appendChild(td);

    var td1 = document.createElement('td');
    td1.innerHTML = response.damage[key].toFixed(2);
    tr.appendChild(td1);


  });
}
