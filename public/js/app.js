console.log('🚀 SPEAKSOFT Frontend Loaded');

document.addEventListener('DOMContentLoaded', async () => {
    const dbStatusElement = document.getElementById('db-status');

    try {
        const response = await fetch('/api/db-status');
        const data = await response.json();

        if (data.status === 'connected') {
            dbStatusElement.textContent = '✅ Base de datos conectada: ' + data.status;
            dbStatusElement.classList.add('connected');
        } else {
            dbStatusElement.textContent = '❌ Error de conexión: ' + (data.message || 'Error desconocido');
            dbStatusElement.classList.add('error');
        }
    } catch (error) {
        console.error('Error fetching DB status:', error);
        dbStatusElement.textContent = '❌ Error al conectar con el servidor';
        dbStatusElement.classList.add('error');
    }
});
