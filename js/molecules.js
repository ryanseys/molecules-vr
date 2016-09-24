const scene = document.querySelector('a-scene');

/**
 * Loads a molecule CML file from a given filename.
 */
function loadMolecule(filename) {
  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType('text/xml');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parseResponse(this);
    }
  };
  xhttp.open('GET', filename, true);
  xhttp.send();
}

/**
 * Parses the XML response for a CML file.
 */
function parseResponse(xml) {
  let xmlDoc = xml.responseXML;
  if (!xmlDoc) {
    console.log('There was an error loading that file.');
    return;
  }

  let atoms = xmlDoc.getElementsByTagName('atom');
  for (atom of atoms) {
    drawAtom(atom);
  }
}

function drawAtom(atom) {
  let coords = getAtomCoordinates(atom);
  let color = getAtomColor(atom);

  var obj = document.createElement('a-entity');
  obj.setAttribute('geometry', {
    primitive: 'sphere',
    radius: 1
  });
  obj.setAttribute('material', {
    color: color
  });
  obj.setAttribute('position', coords);
  scene.appendChild(obj);
}

function getAtomColor(atom) {
  switch (atom.getAttribute('elementType')) {
    case 'C':
      return '#1e1e1e';
    default:
      return '#f00';
  }
}

/**
 * Returns the coords of an atom element in the form {x: 1.23, y: 4.56, z: 7.89}
 */
function getAtomCoordinates(atom) {
  return {
    x: parseFloat(atom.getAttribute('x3')) || 0,
    y: parseFloat(atom.getAttribute('y3')) || 0,
    z: parseFloat(atom.getAttribute('z3')) || 0
  }
}

loadMolecule('cmls/buckyball.cml');
