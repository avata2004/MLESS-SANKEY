// Definición de palabras clave
const liderazgoSustentableKeywords = [
  'Liderazgo', 'Educación', 'Investigación', 'Docente', 'Gestión',
  'Cambio', 'Transformación', 'Mejora', 'Innovación', 'Calidad',
  'Inclusión', 'Autonomía', 'Desarrollo profesional', 'Comunidad educativa',
  'Instituciones educativas'
];

const teoriaSistemasKeywords = [
  'Liderazgo', 'Educación', 'Gestión', 'Instituciones educativas',
  'Docentes', 'Calidad educativa', 'Transformación', 'Autonomía',
  'Metacomplejidad', 'Innovación', 'Sistema educativo', 'Administración',
  'Directivo'
];

const modeloEcologicoKeywords = [
  'Microsistema', 'Mesosistema', 'Exosistema', 'Macrosistema',
  'Cronosistema', 'Liderazgo', 'Educación', 'Colaboración',
  'Desarrollo profesional', 'Contexto', 'Interacciones',
  'Comunidad de práctica', 'Facilitadores de aprendizaje profesional',
  'STEM', 'Asociaciones escuela-familia-comunidad'
];

function createSankeyDiagram() {
  const dimensions = ['Liderazgo Sustentable', 'Teoría de Sistemas', 'Modelo Ecológico de Bronfenbrenner'];
  
  // Obtener todas las palabras clave únicas
  const allKeywords = new Set([
      ...liderazgoSustentableKeywords,
      ...teoriaSistemasKeywords,
      ...modeloEcologicoKeywords
  ]);
  
  const nodes = dimensions.concat(Array.from(allKeywords).sort());
  const nodeDict = {};
  nodes.forEach((node, i) => nodeDict[node] = i);
  
  const source = [];
  const target = [];
  const value = [];
  const labels = [];
  const colors = [];
  
  const dimensionColors = {
      'Liderazgo Sustentable': 'rgba(76, 175, 80, 0.8)',
      'Teoría de Sistemas': 'rgba(33, 150, 243, 0.8)',
      'Modelo Ecológico de Bronfenbrenner': 'rgba(255, 193, 7, 0.8)'
  };
  
  const datasets = {
      'Liderazgo Sustentable': liderazgoSustentableKeywords,
      'Teoría de Sistemas': teoriaSistemasKeywords,
      'Modelo Ecológico de Bronfenbrenner': modeloEcologicoKeywords
  };
  
  // Enlaces desde cada dimensión a sus palabras clave
  for (const [dimension, keywords] of Object.entries(datasets)) {
      keywords.forEach(keyword => {
          source.push(nodeDict[dimension]);
          target.push(nodeDict[keyword]);
          value.push(1);
          labels.push(`${dimension} → ${keyword}`);
          colors.push(dimensionColors[dimension]);
      });
  }
  
  // Identificar palabras clave compartidas
  const sharedKeywords = {};
  allKeywords.forEach(keyword => {
      const dimensionsWithKeyword = [];
      if (liderazgoSustentableKeywords.includes(keyword)) {
          dimensionsWithKeyword.push('Liderazgo Sustentable');
      }
      if (teoriaSistemasKeywords.includes(keyword)) {
          dimensionsWithKeyword.push('Teoría de Sistemas');
      }
      if (modeloEcologicoKeywords.includes(keyword)) {
          dimensionsWithKeyword.push('Modelo Ecológico de Bronfenbrenner');
      }
      
      if (dimensionsWithKeyword.length > 1) {
          sharedKeywords[keyword] = dimensionsWithKeyword;
      }
  });
  
  // Agregar conexiones cruzadas
  Object.entries(sharedKeywords).forEach(([keyword, dims]) => {
      if (dims.length >= 2) {
          for (let i = 0; i < dims.length; i++) {
              for (let j = i + 1; j < dims.length; j++) {
                  source.push(nodeDict[keyword]);
                  target.push(nodeDict[dims[j]]);
                  value.push(0.5);
                  labels.push(`${keyword} → ${dims[j]} (Conexión cruzada)`);
                  colors.push('rgba(158, 158, 158, 0.6)');
              }
          }
      }
  });
  
  // Preparar colores de nodos
  const nodeColors = nodes.map(node => {
      if (dimensionColors[node]) {
          return dimensionColors[node];
      } else if (sharedKeywords[node]) {
          return 'rgba(158, 158, 158, 0.8)';
      } else if (liderazgoSustentableKeywords.includes(node)) {
          return 'rgba(76, 175, 80, 0.6)';
      } else if (teoriaSistemasKeywords.includes(node)) {
          return 'rgba(33, 150, 243, 0.6)';
      } else if (modeloEcologicoKeywords.includes(node)) {
          return 'rgba(255, 193, 7, 0.6)';
      } else {
          return 'rgba(200, 200, 200, 0.6)';
      }
  });
  
  const customData = nodes.map(node => 
      dimensions.includes(node) ? 'Tema' : 'Palabra Clave'
  );
  
  const data = [{
      type: "sankey",
      node: {
          pad: 15,
          thickness: 20,
          line: { color: "black", width: 0.5 },
          label: nodes,
          color: nodeColors,
          hovertemplate: '<b>%{label}</b><br>Tipo: %{customdata}<extra></extra>',
          customdata: customData
      },
      link: {
          source: source,
          target: target,
          value: value,
          color: colors,
          hovertemplate: '%{customdata}<extra></extra>',
          customdata: labels
      }
  }];
  
  const layout = {
      font: { size: 11, family: "Arial" },
      margin: { l: 50, r: 50, t: 100, b: 50 },
      paper_bgcolor: 'white',
      plot_bgcolor: 'white'
  };
  
  Plotly.newPlot('sankeyPlot', data, layout, {responsive: true});
}

function populateKeywordLists() {
  // Llenar listas de palabras clave
  const lsList = document.getElementById('ls-keywords');
  liderazgoSustentableKeywords.forEach((kw, i) => {
      const li = document.createElement('li');
      li.textContent = `${i + 1}. ${kw}`;
      lsList.appendChild(li);
  });
  
  const tsList = document.getElementById('ts-keywords');
  teoriaSistemasKeywords.forEach((kw, i) => {
      const li = document.createElement('li');
      li.textContent = `${i + 1}. ${kw}`;
      tsList.appendChild(li);
  });
  
  const meList = document.getElementById('me-keywords');
  modeloEcologicoKeywords.forEach((kw, i) => {
      const li = document.createElement('li');
      li.textContent = `${i + 1}. ${kw}`;
      meList.appendChild(li);
  });
}

function analyzeSharedKeywords() {
  const setLS = new Set(liderazgoSustentableKeywords);
  const setTS = new Set(teoriaSistemasKeywords);
  const setME = new Set(modeloEcologicoKeywords);
  
  const sharedAll = new Set([...setLS].filter(x => setTS.has(x) && setME.has(x)));
  const sharedLSTS = new Set([...setLS].filter(x => setTS.has(x) && !setME.has(x)));
  const sharedLSME = new Set([...setLS].filter(x => setME.has(x) && !setTS.has(x)));
  const sharedTSME = new Set([...setTS].filter(x => setME.has(x) && !setLS.has(x)));
  
  const analysisDiv = document.getElementById('shared-analysis');
  
  let html = `
      <h4>Palabras clave compartidas entre los 3 temas (${sharedAll.size}):</h4>
      <ul>${Array.from(sharedAll).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
      
      <h4>Palabras clave compartidas entre Liderazgo Sustentable y Teoría de Sistemas (${sharedLSTS.size}):</h4>
      <ul>${Array.from(sharedLSTS).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
      
      <h4>Palabras clave compartidas entre Liderazgo Sustentable y Modelo Ecológico (${sharedLSME.size}):</h4>
      <ul>${Array.from(sharedLSME).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
      
      <h4>Palabras clave compartidas entre Teoría de Sistemas y Modelo Ecológico (${sharedTSME.size}):</h4>
      <ul>${Array.from(sharedTSME).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
  `;
  
  analysisDiv.innerHTML = html;
}

function setupNavigation() {
  const authorsBtn = document.getElementById('authorsBtn');
  authorsBtn.addEventListener('click', function() {
      window.open('autores/index.html', '_blank');
  });
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  createSankeyDiagram();
  populateKeywordLists();
  analyzeSharedKeywords();
  setupNavigation();
});