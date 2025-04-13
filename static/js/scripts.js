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

// Inizializza i modelli al caricamento della pagina
window.onload = aggiornaModelli;

document.getElementById('autoForm').addEventListener('submit', function(e) {
e.preventDefault();
const params = new URLSearchParams(new FormData(this)).toString();
fetch(`/filtra_auto?${params}`)
    .then(res => res.json())
    .then(data => {
        const div = document.getElementById('risultati');
        if (data.length === 0) {
            div.innerHTML = '<p>Nessuna auto trovata.</p>';
            return;
        }
        let html = '<table><tr><th>Marca</th><th>Modello</th><th>Alimentazione</th><th>Motore</th><th>Colore</th><th>Immagine</th></tr>';
        data.forEach(auto => {
            html += `<tr>
                <td>${auto.marca}</td>
                <td>${auto.modello}</td>
                <td>${auto.alimentazione}</td>
                <td>${auto.motore}</td>
                <td>${auto.colore}</td>
                <td><img src="${auto.immagine}" width="100"></td>
            </tr>`;
        });
        html += '</table>';
        div.innerHTML = html;
    });
});
