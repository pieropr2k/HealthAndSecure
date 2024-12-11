export const parseEscapedJSON = (rawData) => {
    try {
        // Des-escapar una vez
        let firstPass = JSON.parse(rawData); 
        // Des-escapar iterativamente hasta obtener JSON válido
        while (typeof firstPass === 'string') {
            firstPass = JSON.parse(firstPass);
        }
        return firstPass;
    } catch (error) {
        console.error('Error procesando el JSON:', error.message);
    }
};
  