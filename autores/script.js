//autores/script.js

// Definición de autores 
const autoresTeoriaSistemas = [
    'Bonilla y Reyes 2021',
    'Córdova y Marín 2021',
    'Domínguez 2021',
    'Escudero 2024',
    'Gamarra 2024',
    'Gómez 2016',
    'Marín y Alfaro 2021',
    'Minedu 2023',
    'Parra 2021',
    'Pericón 2021',
    'Pino y Callco 2024',
    'Riascos-Hinestroza y Becerril-Arostegui 2021',
    'Segovia, Tamayo y Ramos 2024',
    'Serrano-Cadena 2025',
    'Surivikina 2015',
    'Tintoré, Camarero y Redondo 2024',
    'Tobar et al 2024',
    'Torres 2024',
    'Vargas, Arcos y Vargas 2020'
];

const autoresLiderazgoSustentable = [
    'Améstica-Abarca 2024',
    'Chávez e Ibarra 2016',
    'Córdova y Marín 2021',
    'Domínguez 2021',
    'Duarte 2020',
    'Escamilla-García y Galicia 2022',
    'Ferreira 2021',
    'Gamarra 2024',
    'Hasek y Ortiz 2021',
    'Medina 2020',
    'Moliner et al 2016',
    'Olmo y García 2016',
    'Parra 2021',
    'Pino y Callco 2024',
    'Poon y Ho 2025',
    'Priego 2024',
    'Riascos-Hinestroza y Becerril-Arostegui 2021',
    'Segovia, Tamayo y Ramos 2024',
    'Serrano-Cadena 2025',
    'Tintoré, Camarero y Redondo 2024',
    'Tobar et al 2024',
    'Torres 2024',
    'Valdés y Gutiérrez 2021',
    'Vega 2022'
];


const autoresTeoriaEcologica = [
    'Sylvester 2025',
    'Bridge et al 2024',
    'Costa et al 2024',
    'Stanley y Kuo 2022',
    'Fortune, Nicalacopoulos y Honey 2022',
    'Chapell y Craft 2011'
];

function crearDiagramaAutores() {
    const temas = ['Liderazgo Sustentable', 'Teoría de Sistemas', 'Modelo Ecológico de Bronfenbrenner'];

    const todoAutores = new Set([
        ...autoresTeoriaSistemas,
        ...autoresLiderazgoSustentable,
        ...autoresTeoriaEcologica
    ]);

    const nodes = temas.concat(Array.from(todoAutores).sort());
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
        'Liderazgo Sustentable': autoresLiderazgoSustentable,
        'Teoría de Sistemas': autoresTeoriaSistemas,
        'Modelo Ecológico de Bronfenbrenner': autoresTeoriaEcologica
    };

    // Enlaces desde cada dimensión a sus autores
    for (const [tema, autor] of Object.entries(datasets)) {
        autor.forEach(autor => {
            source.push(nodeDict[tema]);
            target.push(nodeDict[autor]);
            value.push(1);
            labels.push(`${tema} → ${autor}`);
            colors.push(coloresTema[tema]);
        });
    }

    // Identificar autores compartidos
    const autoresCompartidos = {};
    todoAutores.forEach(autor => {
        const temasWithautor = [];
        if (autoresLiderazgoSustentable.includes(autor)) {
            temasWithautor.push('Liderazgo Sustentable');
        }
        if (autoresTeoriaSistemas.includes(autor)) {
            temasWithautor.push('Teoría de Sistemas');
        }
        if (autoresTeoriaEcologica.includes(autor)) {
            temasWithautor.push('Modelo Ecológico de Bronfenbrenner');
        }

        if (temasWithautor.length > 1) {
            autoresCompartidos[autor] = temasWithautor;
        }
    });

    // Agregar conexiones cruzadas
    Object.entries(autoresCompartidos).forEach(([autor, dims]) => {
        if (dims.length >= 2) {
            for (let i = 0; i < dims.length; i++) {
                for (let j = i + 1; j < dims.length; j++) {
                    source.push(nodeDict[autor]);
                    target.push(nodeDict[dims[j]]);
                    value.push(0.5);
                    labels.push(`${autor} → ${dims[j]} (Conexión cruzada)`);
                    colors.push('rgba(158, 158, 158, 0.6)');
                }
            }
        }
    });

    // Preparar colores de nodos
    const nodeColors = nodes.map(node => {
        if (coloresTema[node]) {
            return coloresTema[node];
        } else if (autoresCompartidos[node]) {
            return 'rgba(158, 158, 158, 0.8)';
        } else if (autoresLiderazgoSustentable.includes(node)) {
            return 'rgba(76, 175, 80, 0.6)';
        } else if (autoresTeoriaSistemas.includes(node)) {
            return 'rgba(33, 150, 243, 0.6)';
        } else if (autoresTeoriaEcologica.includes(node)) {
            return 'rgba(255, 193, 7, 0.6)';
        } else {
            return 'rgba(200, 200, 200, 0.6)';
        }
    });

    const customData = nodes.map(node =>
        temas.includes(node) ? 'Tema' : 'Autor'
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

function rellenarListaAutores() {
    // Llenar listas de autores
    const lsList = document.getElementById('ls-authors');
    autoresLiderazgoSustentable.forEach((kw, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${kw}`;
        lsList.appendChild(li);
    });

    const tsList = document.getElementById('ts-authors');
    autoresTeoriaSistemas.forEach((kw, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${kw}`;
        tsList.appendChild(li);
    });

    const meList = document.getElementById('me-authors');
    autoresTeoriaEcologica.forEach((kw, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${kw}`;
        meList.appendChild(li);
    });
}

function analizarAutoresCompartidos() {
    const setLS = new Set(autoresLiderazgoSustentable);
    const setTS = new Set(autoresTeoriaSistemas);
    const setME = new Set(autoresTeoriaEcologica);

    const todosCompartidos = new Set([...setLS].filter(x => setTS.has(x) && setME.has(x)));
    const compartidos_LS_TS = new Set([...setLS].filter(x => setTS.has(x) && !setME.has(x)));
    const compartidos_LS_ME = new Set([...setLS].filter(x => setME.has(x) && !setTS.has(x)));
    const compartidos_TS_ME = new Set([...setTS].filter(x => setME.has(x) && !setLS.has(x)));

    const analysisDiv = document.getElementById('shared-analysis');

    let html = `
      <h4>Autores entre los 3 temas (${todosCompartidos.size}):</h4>
      <ul>${Array.from(todosCompartidos).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
      
      <h4>Autores entre Liderazgo Sustentable y Teoría de Sistemas (${compartidos_LS_TS.size}):</h4>
      <ul>${Array.from(compartidos_LS_TS).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
      
      <h4>Autores entre Liderazgo Sustentable y Modelo Ecológico (${compartidos_LS_ME.size}):</h4>
      <ul>${Array.from(compartidos_LS_ME).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
      
      <h4>Autores entre Teoría de Sistemas y Modelo Ecológico (${compartidos_TS_ME.size}):</h4>
      <ul>${Array.from(compartidos_TS_ME).sort().map(kw => `<li>${kw}</li>`).join('')}</ul>
  `;

    analysisDiv.innerHTML = html;
}


function setupNavigation() {
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', function () {
        window.close();
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 100);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    crearDiagramaAutores();
    rellenarListaAutores();
    analizarAutoresCompartidos();
    setupNavigation();
});