# 🤖 Asistente Inteligente - Chatbot Web de Reserva de Turnos

Aplicación web en producción que permite a los usuarios interactuar con un chatbot inteligente para realizar consultas y agendar turnos en tiempo real. Integra una interfaz web moderna, automatización mediante Make, almacenamiento persistente en Supabase y sincronización directa con Google Calendar.

🌐 **Demo en vivo (Vercel):** [https://proyecto-3-dsi.vercel.app](https://proyecto-3-dsi.vercel.app) *(Reemplaza este enlace con tu URL final de Vercel)*  
📂 **Repositorio de GitHub:** [https://github.com/bau12345/proyecto-3-dsi](https://github.com/bau12345/proyecto-3-dsi)

---

## 📐 Arquitectura del Sistema y Flujo de Datos

El sistema funciona conectando el cliente frontend con servicios en la nube a través del orquestador Make:
1. **Frontend (Vercel):** Interfaz construida en HTML, CSS y JavaScript nativo. Captura la consulta del usuario y la envía al servidor mediante `fetch`.
2. **Orquestador (Make):** Recibe la petición en un Webhook, procesa el texto con la API de Google Gemini AI para interpretar la intención del usuario.
3. **Base de Datos (Supabase):** Almacena de forma persistente los registros de los clientes y sus turnos asociados.
4. **Google Calendar:** Agenda automáticamente la cita en el calendario del negocio cuando se confirma el turno.

---

## 🗄️ Diseño de la Base de Datos (Supabase)

La base de datos relacional consta de dos tablas principales vinculadas mediante clave foránea:

### Tabla `usuarios`
```sql
CREATE TABLE usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
SQL
CREATE TABLE turnos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_hora TIMESTAMP WITH TIME ZONE NOT NULL,
    servicio VARCHAR(100) NOT NULL,
    estado VARCHAR(20) DEFAULT 'confirmado',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
git clone [https://github.com/bau12345/proyecto-3-dsi.git](https://github.com/bau12345/proyecto-3-dsi.git)
---

### Instrucciones para guardar el README en GitHub:
1. En tu repositorio de GitHub, haz clic en el botón **Add a README** (o edítalo si ya existe).
2. Pega este contenido.
3. Recuerda actualizar los enlaces de la **Demo en Vercel** y subir las fotos de Supabase, Make y Calendar cuando las tengas listas.
4. Haz clic en el botón verde **Commit changes...**.
