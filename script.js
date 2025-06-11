//script.js

// Definición de palabras clave
const palabrasLiderazgoSustentable = [
    'Liderazgo',
    'Educación', 'Escolar',
    'Investigación', 'Estudio', 'Revisión',
    'Docentes', 'Profesorado', 'Estudiantes', 'Comunidad educativa',
    'Gestión',
    'Cambio', 'Transformación', 'Mejora', 'Innovación',
    'Teoría', 'Tipos', 'Modelos',
    'Calidad',
    'PPC',
    'IA'
];

const palabrasTeoriaSistemas = [
    'Liderazgo',
    'Educación',
    'Gestión',
    'Instituciones educativas', 'Escolar', 'Centro escolar',
    'Docentes', 'Profesorado',
    'Calidad educativa',
    'Transformación',
    'Autonomía',
    'Metacomplejidad',
    'Innovación', 'Sistema educativo'
];

const palabrasModeloEcologico = [
    'Microsistema', 'Mesosistema', 'Exosistema', 'Macrosistema', 'Cronosistema',
    'Liderazgo',
    'Educación',
    'Colaboración',
    'Desarrollo profesional',
    'Contexto',
    'Interacciones',
    'Comunidad de práctica',
    'Facilitadores de aprendizaje profesional',
    'STEM',
    'Asociaciones escuela-familia-comunidad'
];

function crearDiagramaPalabras() {
    const temas = ['Liderazgo Sustentable', 'Teoría de Sistemas', 'Modelo Ecológico de Bronfenbrenner'];

    // Obtener todas las palabras clave únicas
    const todoPalabras = new Set([
        ...palabrasLiderazgoSustentable,
        ...palabrasTeoriaSistemas,
        ...palabrasModeloEcologico
    ]);

    const nodes = temas.concat(Array.from(todoPalabras).sort());
    const nodeDict = {};
    nodes.forEach((node, i) => nodeDict[node] = i);

    const source = [];
    const target = [];
    const value = [];
    const labels = [];
    const colors = [];

    const coloresTema = {
        'Liderazgo Sustentable': 'rgba(76, 175, 80, 0.8)',
        'Teoría de Sistemas': 'rgba(33, 150, 243, 0.8)',
        'Modelo Ecológico de Bronfenbrenner': 'rgba(255, 193, 7, 0.8)'
    };

    const datasets = {
        'Liderazgo Sustentable': palabrasLiderazgoSustentable,
        'Teoría de Sistemas': palabrasTeoriaSistemas,
        'Modelo Ecológico de Bronfenbrenner': palabrasModeloEcologico
    };

    // Enlaces desde cada dimensión a sus palabras clave
    for (const [tema, keywords] of Object.entries(datasets)) {
        keywords.forEach(keyword => {
            source.push(nodeDict[tema]);
            target.push(nodeDict[keyword]);
            value.push(1);
            labels.push(`${tema} → ${keyword}`);
            colors.push(coloresTema[tema]);
        });
    }

    // Identificar palabras clave compartidas
    const palabrasCompartidas = {};
    todoPalabras.forEach(keyword => {
        const temasWithKeyword = [];
        if (palabrasLiderazgoSustentable.includes(keyword)) {
            temasWithKeyword.push('Liderazgo Sustentable');
        }
        if (palabrasTeoriaSistemas.includes(keyword)) {
            temasWithKeyword.push('Teoría de Sistemas');
        }
        if (palabrasModeloEcologico.includes(keyword)) {
            temasWithKeyword.push('Modelo Ecológico de Bronfenbrenner');
        }

        if (temasWithKeyword.length > 1) {
            palabrasCompartidas[keyword] = temasWithKeyword;
        }
    });

    // Agregar conexiones cruzadas
    Object.entries(palabrasCompartidas).forEach(([keyword, dims]) => {
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
        if (coloresTema[node]) {
            return coloresTema[node];
        } else if (palabrasCompartidas[node]) {
            return 'rgba(158, 158, 158, 0.8)';
        } else if (palabrasLiderazgoSustentable.includes(node)) {
            return 'rgba(76, 175, 80, 0.6)';
        } else if (palabrasTeoriaSistemas.includes(node)) {
            return 'rgba(33, 150, 243, 0.6)';
        } else if (palabrasModeloEcologico.includes(node)) {
            return 'rgba(255, 193, 7, 0.6)';
        } else {
            return 'rgba(200, 200, 200, 0.6)';
        }
    });

    const customData = nodes.map(node =>
        temas.includes(node) ? 'Tema' : 'Palabra Clave'
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

    Plotly.newPlot('sankeyPlot', data, layout, { responsive: true });
}

function rellenarListaPalabras() {
    // Llenar listas de palabras clave
    const lsList = document.getElementById('ls-keywords');
    palabrasLiderazgoSustentable.forEach((kw, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${kw}`;
        lsList.appendChild(li);
    });

    const tsList = document.getElementById('ts-keywords');
    palabrasTeoriaSistemas.forEach((kw, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${kw}`;
        tsList.appendChild(li);
    });

    const meList = document.getElementById('me-keywords');
    palabrasModeloEcologico.forEach((kw, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${kw}`;
        meList.appendChild(li);
    });
}

function analisisPalabrasCompartidas() {
    const setLS = new Set(palabrasLiderazgoSustentable);
    const setTS = new Set(palabrasTeoriaSistemas);
    const setME = new Set(palabrasModeloEcologico);

    const todasCompartidas = new Set([...setLS].filter(x => setTS.has(x) && setME.has(x)));
    const compartidas_LS_TS = new Set([...setLS].filter(x => setTS.has(x) && !setME.has(x)));
    const compartidas_LS_ME = new Set([...setLS].filter(x => setME.has(x) && !setTS.has(x)));
    const compartidas_TS_ME = new Set([...setTS].filter(x => setME.has(x) && !setLS.has(x)));

    const analysisDiv = document.getElementById('shared-analysis');

    let html = `
      <h4>Palabras clave compartidas entre los 3 temas (${todasCompartidas.size}):</h4>
      <ul>${Array.from(todasCompartidas).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
      
      <h4>Palabras clave compartidas entre Liderazgo Sustentable y Teoría de Sistemas (${compartidas_LS_TS.size}):</h4>
      <ul>${Array.from(compartidas_LS_TS).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
      
      <h4>Palabras clave compartidas entre Liderazgo Sustentable y Modelo Ecológico (${compartidas_LS_ME.size}):</h4>
      <ul>${Array.from(compartidas_LS_ME).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
      
      <h4>Palabras clave compartidas entre Teoría de Sistemas y Modelo Ecológico (${compartidas_TS_ME.size}):</h4>
      <ul>${Array.from(compartidas_TS_ME).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
  `;

    analysisDiv.innerHTML = html;
}

function setupNavigation() {
    const authorsBtn = document.getElementById('authorsBtn');
    authorsBtn.addEventListener('click', function () {
        window.open('autores/index.html', '_blank');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    crearDiagramaPalabras();
    rellenarListaPalabras();
    analisisPalabrasCompartidas();
    setupNavigation();
});