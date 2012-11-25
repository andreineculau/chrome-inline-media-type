var content_types = localStorage['content_types'];
if ('undefined' == typeof(content_types)) {
  localStorage['content_types'] = '[]';
  content_types = localStorage['content_types'];
}

content_types = JSON.parse(content_types)
content_types.save = function() {
  localStorage['content_types'] = JSON.stringify(this);
}

function make_table() {
  content_types.forEach(function(content_type) {
    append_table(content_type);
  });
}

function remove_option() {
  var row_idx = this.parentNode.parentNode.rowIndex;
  //removes from table
  document.getElementById('mytable').deleteRow(row_idx);
  //removes from localStorage
  content_types.pop(row_idx);
  content_types.save();
}

function append_table(content_type) {
  var tbo = document.getElementById('mytable').children[0];

  var row = document.createElement('tr');
  //columns
  content_type.forEach(function(text, idx) {
    var col = document.createElement('td');
    var cont = document.createTextNode(text);
    col.appendChild(cont);
    row.appendChild(col);
  });
  var col = document.createElement('td');
  var but = document.createElement('button');
  var cont = document.createTextNode('Remove');

  row.setAttribute('id', tbo.children.length);

  but.addEventListener('click', remove_option);
  but.appendChild(cont);
  col.appendChild(but);
  row.appendChild(col);

  tbo.appendChild(row);
}

// Saves options to localStorage.
function save_options() {
  var form = document.forms[0];
  var content_type = new Array();

  content_type.push(form.children[0].value);
  content_type.push(form.children[1].value);
  content_type.push(form.children[2].value);

  append_table(content_type);
  content_types.push(content_type);
  content_types.save();
}

window.onload = function() {
  make_table();
  document.querySelector('#add').addEventListener('click', save_options);
}
