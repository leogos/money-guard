import axiosInstance from './axiosInstance';

export const getStatistics = async (month, year) => {
    const { data } = await axiosInstance.get('/transactions-summary', {
        params: {
            month,
            year,
        },
    });

    return data;
};