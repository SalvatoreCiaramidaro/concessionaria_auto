from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/filtra_auto', methods=['GET'])
def filtra_auto():
    marca = request.args.get('marca', '').lower()
    modello = request.args.get('modello', '').lower()
    alimentazione = request.args.get('alimentazione', '').lower()
    motore = request.args.get('motore', '').lower()
    colore = request.args.get('colore', '').lower()

    with open('static/json/auto.json', encoding='utf-8') as f:
        auto = json.load(f)

    filtrate = []
    for a in auto:
        if (not marca or a['marca'].lower() == marca) and \
           (not modello or modello in a['modello'].lower()) and \
           (not alimentazione or a['alimentazione'].lower() == alimentazione) and \
           (not motore or a['motore'].lower() == motore) and \
           (not colore or colore in a['colore'].lower()):
            filtrate.append(a)

    return jsonify(filtrate)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
