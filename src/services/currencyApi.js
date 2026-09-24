import axios from 'axios';

const MONOBANK_API = 'https://api.monobank.ua';
const CURRENCY_CACHE_KEY = 'moneyGuardCurrencyCache';
const CACHE_DURATION = 60 * 60 * 1000;

export const getCurrency = async () => {
    const cachedCurrency = localStorage.getItem(CURRENCY_CACHE_KEY);

    if (cachedCurrency) {
        try {
            const { data, timestamp } = JSON.parse(cachedCurrency);

            const isCacheValid =
                Date.now() - timestamp < CACHE_DURATION;

            if (isCacheValid) {
                return data;
            }
        } catch {
            localStorage.removeItem(CURRENCY_CACHE_KEY);
        }
    }

    const { data } = await axios.get(`${MONOBANK_API}/bank/currency`);

    localStorage.setItem(
        CURRENCY_CACHE_KEY,
        JSON.stringify({
            data,
            timestamp: Date.now(),
        })
    );

    return data;
};

export const getCurrencyLastUpdated = () => {
    const cachedCurrency = localStorage.getItem(CURRENCY_CACHE_KEY);

    if (!cachedCurrency) {
        return null;
    }

    try {
        const { timestamp } = JSON.parse(cachedCurrency);

        return timestamp;
    } catch {
        return null;
    }
};