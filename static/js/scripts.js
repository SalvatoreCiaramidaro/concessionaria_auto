// Mappatura dei modelli per marca
const modelliPerMarca = {
    "": [""],
    "fiat": ["500", "Grande Punto", "Panda"],
    "ford": ["Fiesta", "Focus", "Kuga"],
    "audi": ["A1", "A3", "A4"],
    "volkswagen": ["Golf", "Polo", "Tiguan"],
    "toyota": ["Yaris", "Corolla", "RAV4"],
    "bmw": ["Serie 1", "Serie 3", "Serie 5"],
    "mercedes-benz": ["Classe A", "Classe C"],
    "peugeot": ["208", "308"],
    "renault": ["Clio", "Megane"],
    "nissan": ["Micra"],
    "kia": ["Rio"],
    "hyundai": ["i20"],
    "skoda": ["Fabia"],
    "opel": ["Corsa"],
    "mazda": ["2"],
    "subaru": ["Impreza"],
    "volvo": ["V40"]
};

// Funzione per aggiornare i modelli in base alla marca selezionata
function aggiornaModelli() {
    const marcaSelezionata = document.getElementById('selectMarca').value;
    const selectModello = document.getElementById('selectModello');

    // Rimuovi tutte le opzioni precedenti
    selectModello.innerHTML = '';

    // Aggiungi l'opzione "Tutti"
    const optionTutti = document.createElement('option');
    optionTutti.value = "";
    optionTutti.textContent = "Tutti";
    selectModello.appendChild(optionTutti);

    // Aggiungi i modelli specifici per la marca selezionata
    if (marcaSelezionata && modelliPerMarca[marcaSelezionata]) {
        modelliPerMarca[marcaSelezionata].forEach(modello => {
            const option = document.createElement('option');
            option.value = modello.toLowerCase();
            option.textContent = modello;
            selectModello.appendChild(option);
        });
    }
}

// Funzione per mostrare l'indicatore di caricamento
function mostraCaricamento() {
    const div = document.getElementById('risultati');
    div.innerHTML = '<div class="loading">Caricamento in corso...</div>';
}

// Funzione per creare la tabella delle auto
function visualizzaTabella(data) {
    const div = document.getElementById('risultati');
    
    if (data.length === 0) {
        div.innerHTML = '<p>Nessuna auto trovata.</p>';
        return;
    }
    
    let html = `
        <h2>Risultati: ${data.length} auto trovate</h2>
        <table>
            <thead>
                <tr>
                    <th>Marca</th>
                    <th>Modello</th>
                    <th>Alimentazione</th>
                    <th>Motore</th>
                    <th>Colore</th>
                    <th>Immagine</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.forEach(auto => {
        html += `
            <tr>
                <td>${auto.marca}</td>
                <td>${auto.modello}</td>
                <td>${auto.alimentazione || 'N/D'}</td>
                <td>${auto.motore || 'N/D'}</td>
                <td>${auto.colore || 'N/D'}</td>
                <td>${auto.immagine ? `<img src="${auto.immagine}" width="100" alt="${auto.marca} ${auto.modello}">` : 'Nessuna immagine'}</td>
            </tr>`;
    });
    
    html += '</tbody></table>';
    div.innerHTML = html;
}

// Funzione per caricare tutte le auto
function caricaTutteAuto() {
    mostraCaricamento();
    fetch('/filtra_auto')
        .then(res => res.json())
        .then(data => {
            visualizzaTabella(data);
        })
        .catch(error => {
            console.error('Errore durante il caricamento delle auto:', error);
            document.getElementById('risultati').innerHTML = '<p class="errore">Errore durante il caricamento delle auto.</p>';
        });
}

// Inizializza al caricamento della pagina
window.onload = function() {
    // Inizializza i modelli
    aggiornaModelli();
    
    // Carica tutte le auto
    caricaTutteAuto();
    
    // Gestisci l'evento di submit del form
    document.getElementById('autoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostra l'indicatore di caricamento
        mostraCaricamento();
        
        // Crea i parametri di query e invia la richiesta
        const params = new URLSearchParams(new FormData(this)).toString();
        fetch(`/filtra_auto?${params}`)
            .then(res => res.json())
            .then(data => {
                visualizzaTabella(data);
            })
            .catch(error => {
                console.error('Errore durante la ricerca:', error);
                document.getElementById('risultati').innerHTML = '<p class="errore">Errore durante la ricerca.</p>';
            });
    });
};
