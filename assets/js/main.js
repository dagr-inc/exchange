document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM
    const amountFrom = document.getElementById('amount-from');
    const amountTo = document.getElementById('amount-to');
    const currencyFrom = document.getElementById('currency-from');
    const currencyTo = document.getElementById('currency-to');
    const swapBtn = document.getElementById('swap-btn');
    const rateSummary = document.getElementById('rate-summary');
    const rateDetails = document.getElementById('rate-details');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorIndicator = document.getElementById('error-indicator');
    const historyToggle = document.getElementById('history-toggle');
    const historyContent = document.getElementById('history-content');
    const historyList = document.getElementById('history-list');

    // Estado local
    let rates = {};
    let isOffline = false;

    // Configuración
    const API_URL = 'https://cdn.moneyconvert.net/api/latest.json';
    const FALLBACK_URL = 'assets/js/api.json';
    const HISTORY_KEY = 'currency_history';

    // Inicialización
    init();

    async function init() {
        await fetchRates();
        updateConversion();
        loadHistory();
        setupEventListeners();
        
        // Actualizar tasas cada 60 segundos
        setInterval(fetchRates, 60000);
    }

    function setupEventListeners() {
        amountFrom.addEventListener('input', () => {
            updateConversion('from');
            saveToHistoryDebounced();
        });
        amountTo.addEventListener('input', () => {
            updateConversion('to');
            saveToHistoryDebounced();
        });
        currencyFrom.addEventListener('change', () => {
            updateConversion('from');
            saveToHistoryDebounced();
        });
        currencyTo.addEventListener('change', () => {
            updateConversion('from');
            saveToHistoryDebounced();
        });

        swapBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const temp = currencyFrom.value;
            currencyFrom.value = currencyTo.value;
            currencyTo.value = temp;
            updateConversion('from');
            saveToHistoryDebounced();
        });

        historyToggle.addEventListener('click', toggleHistory);
    }

    async function fetchRates() {
        showLoading(true);
        errorIndicator.classList.add('hidden');
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            rates = data.rates;
            
            // La API maneja USD como base por defecto, nos aseguramos que esté en rates si no lo devuelve
            if (!rates['USD']) rates['USD'] = 1;
            
            isOffline = false;
            errorIndicator.classList.add('hidden');
            
            // Refrescar cálculo con nuevas tasas
            updateConversion('from');
        } catch (error) {
            console.warn('Fallo al obtener tasas de la API remota, usando respaldo local:', error);
            try {
                const fallbackResponse = await fetch(FALLBACK_URL);
                if (!fallbackResponse.ok) throw new Error('Respaldo local no disponible');
                const fallbackData = await fallbackResponse.json();
                rates = fallbackData.rates;
                if (!rates['USD']) rates['USD'] = 1;
                
                isOffline = true;
                errorIndicator.textContent = 'Usando modo sin conexión (datos locales)';
                errorIndicator.classList.remove('hidden');
                
                updateConversion('from');
            } catch (fallbackError) {
                console.error('Error total, no hay datos de tasas.', fallbackError);
                // No usar alert(), mostrar en DOM
                errorIndicator.textContent = 'Error crítico: No se pudieron cargar los datos de divisas.';
                errorIndicator.classList.remove('hidden');
            }
        } finally {
            showLoading(false);
        }
    }

    function updateConversion(source = 'from') {
        if (Object.keys(rates).length === 0) return;

        const from = currencyFrom.value;
        const to = currencyTo.value;

        // USD base
        const rateFrom = rates[from];
        const rateTo = rates[to];

        if (!rateFrom || !rateTo) return;

        // Factor de conversión
        const exchangeRate = rateTo / rateFrom;

        if (source === 'from') {
            const amount = parseFloat(amountFrom.value);
            if (!isNaN(amount)) {
                amountTo.value = (amount * exchangeRate).toFixed(2);
            } else {
                amountTo.value = '';
            }
        } else {
            const amount = parseFloat(amountTo.value);
            if (!isNaN(amount)) {
                amountFrom.value = (amount / exchangeRate).toFixed(2);
            } else {
                amountFrom.value = '';
            }
        }

        updateRateInfo(from, to, exchangeRate);
    }

    function updateRateInfo(from, to, rate) {
        const valFrom = parseFloat(amountFrom.value) || 0;
        const valTo = parseFloat(amountTo.value) || 0;
        
        const formatter = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        rateSummary.textContent = `${formatter.format(valFrom)} ${from} = ${formatter.format(valTo)} ${to}`;
        
        const timeNow = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        rateDetails.textContent = `1 ${from} = ${rate.toFixed(5)} ${to} • Última actualización: ${timeNow}`;
    }

    function showLoading(show) {
        if (show) {
            loadingIndicator.classList.remove('hidden');
        } else {
            loadingIndicator.classList.add('hidden');
        }
    }

    // Debounce para evitar guardar cada tecla
    let historyTimeout;
    function saveToHistoryDebounced() {
        clearTimeout(historyTimeout);
        historyTimeout = setTimeout(() => {
            saveToHistory();
        }, 1500);
    }

    function saveToHistory() {
        const valFrom = parseFloat(amountFrom.value);
        if (isNaN(valFrom) || valFrom <= 0) return;

        const from = currencyFrom.value;
        const to = currencyTo.value;
        const valTo = parseFloat(amountTo.value);

        const record = {
            amountFrom: valFrom,
            currencyFrom: from,
            amountTo: valTo,
            currencyTo: to,
            date: new Date().toISOString()
        };

        let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        
        // Evitar guardar conversiones duplicadas consecutivas
        if (history.length > 0) {
            const last = history[0];
            if (last.amountFrom === record.amountFrom && last.currencyFrom === record.currencyFrom && last.currencyTo === record.currencyTo) {
                return;
            }
        }

        history.unshift(record);
        if (history.length > 10) {
            history = history.slice(0, 10);
        }
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        
        renderHistory();
    }

    function loadHistory() {
        renderHistory();
    }

    function renderHistory() {
        let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        
        // Limpiar lista de forma segura (sin innerHTML)
        while (historyList.firstChild) {
            historyList.removeChild(historyList.firstChild);
        }

        if (history.length === 0) {
            const li = document.createElement('li');
            li.classList.add('history-item');
            li.textContent = 'No hay conversiones recientes.';
            historyList.appendChild(li);
            return;
        }

        const formatter = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        history.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('history-item');
            
            const contentDiv = document.createElement('div');
            contentDiv.textContent = `${formatter.format(item.amountFrom)} ${item.currencyFrom} = ${formatter.format(item.amountTo)} ${item.currencyTo}`;
            
            const timeDiv = document.createElement('div');
            timeDiv.classList.add('history-time');
            const dateObj = new Date(item.date);
            timeDiv.textContent = `${dateObj.toLocaleDateString('es-ES')} ${dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
            
            li.appendChild(contentDiv);
            li.appendChild(timeDiv);
            historyList.appendChild(li);
        });
    }

    function toggleHistory(e) {
        e.preventDefault();
        historyToggle.classList.toggle('active');
        historyContent.classList.toggle('open');
    }
});
