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
    titleColumn.innerHTML = Obituary.Title;

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
