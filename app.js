// ⚠️ Reemplaza esta URL con el Webhook de producción de tu escenario en Make
const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/hlmi8tppcar3x9el8q20qwyycbxm1lgh";

const chat = document.getElementById("chat");
const formulario = document.getElementById("chatForm");
const input = document.getElementById("pregunta");
const botonEnviar = formulario.querySelector("button");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pregunta = input.value.trim();
    if (pregunta === "") return;

    // Deshabilitar controles mientras procesa
    input.value = "";
    input.disabled = true;
    botonEnviar.disabled = true;

    agregarMensaje("usuario", pregunta);
    agregarMensaje("bot", "⏳ Pensando...", "cargando");

    try {
        const respuesta = await obtenerRespuesta(pregunta);
        removerMensajeCargando();
        agregarMensaje("bot", respuesta);
    } catch (error) {
        console.error("Error al obtener respuesta:", error);
        removerMensajeCargando();
        agregarMensaje("bot", "⚠️ Lo siento, ocurrió un error al conectar con el servidor. Por favor, intentalo de nuevo.");
    } finally {
        // Habilitar controles nuevamente
        input.disabled = false;
        botonEnviar.disabled = false;
        input.focus();
    }
});

function removerMensajeCargando() {
    const elementoCargando = document.querySelector(".cargando");
    if (elementoCargando) {
        elementoCargando.remove();
    }
}

function agregarMensaje(tipo, texto, claseExtra = "") {
    const div = document.createElement("div");
    div.className = `mensaje ${tipo} ${claseExtra}`.trim();
    div.innerHTML = texto;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

async function obtenerRespuesta(pregunta) {
    const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pregunta: pregunta
        })
    });

    if (!response.ok) {
        throw new Error(`Error en la solicitud HTTP: ${response.status}`);
    }

    const datos = await response.json();
    return datos.respuesta || "No se recibió una respuesta del asistente.";
}
