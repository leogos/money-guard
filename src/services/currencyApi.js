import axios from 'axios';

const MONOBANK_API = 'https://api.monobank.ua';

export const getCurrency = async () => {
    const { data } = await axios.get(`${MONOBANK_API}/bank/currency`);

    return data;
};