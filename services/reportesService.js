export const getTotalesTablas = async() => {
    try {
        const res = await fetch(
            "http://localhost:8080/api/reportes/totalesTablas",
        );

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};