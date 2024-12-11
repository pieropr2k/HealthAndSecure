import OpenAI from 'openai'; // Importa la librería de manera predeterminada

/*
// Configuración usando el API key de OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Asegúrate de tener configurada la variable de entorno correctamente
});
*/

export const handleChatRequest = async (req, res) => {
    const { prompt } = req.body;

    /*
    if (!prompt) {
        return res.status(400).json({ error: "El prompt es requerido" });
    }

    try {
        // Crear una respuesta de OpenAI usando el modelo
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",  // El modelo que desees usar
            messages: [{ role: "user", content: prompt }],
        });

        const responseText = completion.choices[0]?.message?.content.trim();
        if (!responseText) {
            return res.status(500).json({ error: "No se pudo generar una respuesta" });
        }

        res.status(200).json({ response: responseText });
    } catch (err) {
        console.error("Error procesando la solicitud:", err.message);
        res.status(500).json({ error: "Error procesando la solicitud de chat" });
    }
    */
    res.status(200).json({ response: "responseText" });
};
