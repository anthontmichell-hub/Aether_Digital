from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime # Para saber a qué hora escribieron

app = Flask(__name__)
CORS(app)

@app.route('/enlace', methods=['POST'])
def procesar_enlace():
    data = request.json
    nombre = data.get('nombre')
    servicio = data.get('servicio')
    mensaje = data.get('mensaje')
    fecha = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # --- GUARDAR EN ARCHIVO DE TEXTO ---
    try:
        with open("consultas.txt", "a", encoding="utf-8") as f:
            f.write(f"--- NUEVA CONSULTA [{fecha}] ---\n")
            f.write(f"CLIENTE: {nombre}\n")
            f.write(f"SERVICIO: {servicio}\n")
            f.write(f"MENSAJE: {mensaje}\n")
            f.write("-" * 30 + "\n\n")
        print(f"✅ Datos de {nombre} guardados en consultas.txt")
    except Exception as e:
        print(f"❌ Error al guardar: {e}")

    # Respuesta para la terminal de la web
    return jsonify({
        "status": "success",
        "mensaje_servidor": f"Protocolo {nombre} archivado.",
        "prioridad": "ALTA"
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)