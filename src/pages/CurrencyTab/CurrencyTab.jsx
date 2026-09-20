import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../../redux/currency/currencyOperations';
import {
    selectCurrency,
    selectCurrencyLoading,
    selectCurrencyError,
} from '../../redux/currency/currencySelectors';

const CurrencyTab = () => {
    const dispatch = useDispatch();

    const currency = useSelector(selectCurrency);
    const isLoading = useSelector(selectCurrencyLoading);
    const error = useSelector(selectCurrencyError);

    useEffect(() => {
        dispatch(fetchCurrency());
    }, [dispatch]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {currency.map(item => (
                <div key={`${item.currencyCodeA}-${item.currencyCodeB}`}>
                    <p>Currency: {item.currencyCodeA}</p>
                    <p>Purchase: {item.rateBuy}</p>
                    <p>Sale: {item.rateSell}</p>
                </div>
            ))}
        </div>
    );
};

export default CurrencyTab;