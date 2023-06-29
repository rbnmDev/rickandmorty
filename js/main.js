// ********************************* Obtener - Datos - API
async function fetchApi() {
    try {
        let quoteApiFetch = await fetch("https://the-one-api.dev/v2/quote", {
            headers: {
                Authorization: apiKey,
            },
        });
        let quoteData = await quoteApiFetch.json();
        return quoteData.docs;

        console.log()

    } catch (error) {
        console.error("Error obteniendo datos API Quote");
        throw error;
    }
}