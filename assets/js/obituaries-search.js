var search, results, allObituaries = [];

var filterSearchTypeSelect = document.getElementById('searchType');

var rebuildAndRerunSearch = function() {
  rebuildSearchIndex();
  searchObituaries();
};

filterSearchTypeSelect.onchange = rebuildAndRerunSearch;

var rebuildSearchIndex = function() {
  search = new JsSearch.Search('id');
  search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
  search.sanitizer = new JsSearch.LowerCaseSanitizer();
  search.searchIndex = new JsSearch.UnorderedSearchIndex();
  search.addDocuments(allObituaries);

  switch (filterSearchTypeSelect.value) {
    case 'keyword':
      search.addIndex('First_Name');
      search.addIndex('Last_Name');
      search.addIndex('Birth');
      search.addIndex('Death');
      search.addIndex('Title');
      search.addIndex('Volume');
      search.addIndex('Page');
      search.addIndex('Date_of_Publication');
      break;
    case 'firstName':
      search.addIndex('First_Name');
      break;
    case 'lastName':
      search.addIndex('Last_Name');
      break;
    case 'yearOfPublication':
      search.addIndex('Date_of_Publication');
      break;
  }
};

var indexedObituariesTable = document.getElementById('indexedObituariesTable');
var indexedObituariesTBody = indexedObituariesTable.tBodies[0];
var searchInput = document.getElementById('searchInput');
var searchValidator = document.getElementById('searchValidator');

var addTitleURL = function(title) {
  var url;
  switch (title) {
    case 'BAJ':
      url = 'https://www.canadiana.ca/view/oocihm.8_05183';
      break;
    case 'BAJM':
      url = 'https://www.canadiana.ca/view/oocihm.8_05180';
      break;
    case 'BAMP':
      url = 'https://www.canadiana.ca/view/oocihm.8_05181';
      break;
    case 'CJMS':
      url = 'https://www.canadiana.ca/view/oocihm.8_05186';
      break;
    case 'CL':
      url = 'https://www.canadiana.ca/view/oocihm.8_05197';
      break;
    case 'CMAJ':
      url = 'https://www.ncbi.nlm.nih.gov/pmc/journals/77/';
      break;
    case 'CMJM':
      url = 'https://www.canadiana.ca/view/oocihm.8_05176';
      break;
    case 'CMR':
      url = 'https://www.canadiana.ca/view/oocihm.8_05185';
      break;
    case 'CMSJ':
      url = 'https://www.canadiana.ca/view/oocihm.8_05177';
      break;
    case 'CP':
      url = 'https://www.canadiana.ca/view/oocihm.8_05187';
      break;
    case 'CPR':
      url = 'https://www.canadiana.ca/view/oocihm.8_05189';
      break;
    case 'DMJ':
      url = 'https://www.canadiana.ca/view/oocihm.8_05198';
      break;
    case 'DC':
      url = 'https://www.canadiana.ca/view/oocihm.8_05190';
      break;
    case 'KMQ':
      url = 'https://www.canadiana.ca/view/oocihm.8_05203';
      break;
    case 'MC':
      url = 'https://www.canadiana.ca/view/oocihm.8_05182';
      break;
    case 'MMN':
      url = 'https://www.canadiana.ca/view/oocihm.8_05184';
      break;
    case 'MMG':
      url = 'https://www.canadiana.ca/view/oocihm.8_05179';
      break;
    case 'MMJ':
      url = 'https://www.canadiana.ca/view/oocihm.8_05178';
      break;
    case 'OMJ':
      url = 'https://www.canadiana.ca/view/oocihm.8_05169';
      break;
    case 'PHM':
      url = 'https://www.canadiana.ca/view/oocihm.8_05170';
      break;
    case 'QMQ':
      url = 'https://www.canadiana.ca/view/oocihm.8_06553';
      break;
    case 'SMJ':
      url = 'https://www.canadiana.ca/view/oocihm.8_05218';
      break;
    case 'UCJM':
      url = 'https://www.canadiana.ca/view/oocihm.8_05166';
      break;
    case 'UMC':
      url = 'https://www.canadiana.ca/view/oocihm.8_05175';
  }
  return `<a href="${url}">${title}</a>`;
}

var updateObituariesTable = function(Obituaries) {
  indexedObituariesTBody.innerHTML = '';

  var tokens = search.tokenizer.tokenize(searchInput.value);

  for (var i = 0; i < Obituaries.length; i++) {
    var Obituary = Obituaries[i];

    var firstNameColumn = document.createElement('td');
    firstNameColumn.innerHTML = Obituary.First_Name;

    var lastNameColumn = document.createElement('td');
    lastNameColumn.innerHTML = Obituary.Last_Name;

    var birthColumn = document.createElement('td');
    birthColumn.innerHTML = Obituary.Birth;

    var deathColumn = document.createElement('td');
    deathColumn.innerHTML = Obituary.Death;

    var titleColumn = document.createElement('td');
    titleColumn.innerHTML = addTitleURL(Obituary.Title);

    var volumeColumn = document.createElement('td');
    volumeColumn.innerHTML = Obituary.Volume;

    var pageColumn = document.createElement('td');
    pageColumn.innerHTML = Obituary.Page;

    var dateOfPublicationColumn = document.createElement('td');
    dateOfPublicationColumn.innerHTML = Obituary.Date_of_Publication;

    var tableRow = document.createElement('tr');
    tableRow.appendChild(firstNameColumn);
    tableRow.appendChild(lastNameColumn);
    tableRow.appendChild(birthColumn);
    tableRow.appendChild(deathColumn);
    tableRow.appendChild(titleColumn);
    tableRow.appendChild(volumeColumn);
    tableRow.appendChild(pageColumn);
    tableRow.appendChild(dateOfPublicationColumn);

    indexedObituariesTBody.appendChild(tableRow);
  }

  indexedObituariesTable.classList.toggle('hidden', Obituaries.length == 0);
};

var update = function() {
  updateObituariesTable(results);
};

var searchObituaries = function() {
  searchInput.classList.toggle('is-invalid', searchInput.value.length == 1 || searchInput.value.length == 2);
  searchInput.classList.contains('is-invalid') ? searchValidator.textContent = `Type ≥3 characters` : searchValidator.textContent = ``;
  if (searchInput.value.length > 2) {
    results = search.search(searchInput.value);
    update();
  }
  else {
    results = [];
    update();
  }
};

searchInput.oninput = searchObituaries;

var hideElement  = function(element) {
  element.className += ' hidden';
};

var showElement = function(element) {
  element.className = element.className.replace(/\s*hidden/, '');
};

// init
fetch('obituaries.json')
  .then(response => response.json())
  .then(json => {
    allObituaries = json;

    var loadingProgressBar = document.getElementById('loadingProgressBar');
    hideElement(loadingProgressBar);
    //showElement(indexedObituariesTable);

    rebuildSearchIndex();
    //updateObituariesTable(allObituaries);    
    updateObituariesTable([]);    
  });
