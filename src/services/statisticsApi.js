import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getStatistics = async (month, year) => {
    console.log('Statistics request:', {
        url: `${API_BASE_URL}/api/transactions-summary`,
        month,
        year,
    });

    const { data } = await axios.get(
        `${API_BASE_URL}/api/transactions-summary`,
        {
            params: {
                month,
                year,
            },
        }
    );

    return data;
};