import styles from './CurrencyTab.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrency } from '../../redux/currency/currencyOperations';

import {
    selectCurrency,
    selectCurrencyLoading,
    selectCurrencyError,
} from '../../redux/currency/currencySelectors';

import { getCurrencyLastUpdated } from '../../services/currencyApi';

const formatRate = rate => {
    const value = Number(rate);

    return Number.isFinite(value) ? value.toFixed(2) : '—';
};

const CurrencyTab = () => {
    const dispatch = useDispatch();

    const currency = useSelector(selectCurrency);
    const isLoading = useSelector(selectCurrencyLoading);
    const error = useSelector(selectCurrencyError);

    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        dispatch(fetchCurrency());
    }, [dispatch]);

    useEffect(() => {
        setLastUpdated(getCurrencyLastUpdated());
    }, [currency]);

    const displayedCurrencies = currency.filter(
        item =>
            (item.currencyCodeA === 840 ||
                item.currencyCodeA === 978) &&
            item.currencyCodeB === 980
    );

    const usd = displayedCurrencies.find(
        item => item.currencyCodeA === 840
    );

    const eur = displayedCurrencies.find(
        item => item.currencyCodeA === 978
    );

    const usdRate = Number(usd?.rateBuy) || 0;
    const eurRate = Number(eur?.rateBuy) || 0;

 
    const getY = rate => {
        if (!rate) {
            return 125;
        }

        const minReference = 30;
        const maxReference = 60;

        const normalized =
            (rate - minReference) /
            (maxReference - minReference);

        const clamped = Math.max(
            0,
            Math.min(1, normalized)
        );

        return 125 - clamped * 85;
    };

    const usdY = getY(usdRate);
    const eurY = getY(eurRate);

    const difference = eurRate - usdRate;
    const amplitude = Math.min(
        18,
        Math.max(6, Math.abs(difference) * 1.5)
    );

    const middleRate1 =
        usdRate + difference * 0.22;

    const middleRate2 =
        usdRate + difference * 0.48;

    const middleRate3 =
        usdRate + difference * 0.75;

    const y1 = getY(usdRate);

    const y2 =
        getY(middleRate1) +
        (difference >= 0 ? amplitude : -amplitude);

    const y3 =
        getY(middleRate2) -
        (difference >= 0 ? amplitude : -amplitude);

    const y4 =
        getY(middleRate3) +
        (difference >= 0 ? amplitude * 0.55 : -amplitude * 0.55);

    const y5 =
        eurY -
        (difference >= 0 ? amplitude * 0.35 : -amplitude * 0.35);

    const chartPath = `
        M 0 ${y1}

        C 35 ${y1},
          55 ${y2},
          80 ${y2}

        C 110 ${y2},
          130 ${y3},
          160 ${y3}

        C 200 ${y3},
          220 ${y4},
          245 ${y4}

        C 285 ${y4},
          310 ${y5},
          340 ${y5}

        C 380 ${y5},
          405 ${eurY},
          440 ${eurY}

        C 455 ${eurY},
          470 ${eurY},
          480 ${eurY}
    `;

    const fillPath = `
        ${chartPath}
        L 480 167
        L 0 167
        Z
    `;

    return (
        <div className={styles.wrapper}>
            <div className={styles.currencyTable}>
                <div className={styles.currencyHeader}>
                    <div>Currency</div>
                    <div>Purchase</div>
                    <div>Sale</div>
                </div>

                {isLoading ? (
                    <div className={styles.currencyMessage}>
                        Loading...
                    </div>
                ) : error ? (
                    <div className={styles.currencyMessage}>
                        Unable to load currency.
                    </div>
                ) : displayedCurrencies.length === 0 ? (
                    <div className={styles.currencyMessage}>
                        No currency data.
                    </div>
                ) : (
                    displayedCurrencies.map(item => (
                        <div
                            className={styles.currencyRow}
                            key={`${item.currencyCodeA}-${item.currencyCodeB}`}
                        >
                            <div>
                                {item.currencyCodeA === 840
                                    ? 'USD'
                                    : 'EUR'}
                            </div>

                            <div>
                                {formatRate(item.rateBuy)}
                            </div>

                            <div>
                                {formatRate(item.rateSell)}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {!isLoading &&
                !error &&
                displayedCurrencies.length > 0 && (
                    <div className={styles.chart}>
                        <svg
                            viewBox="0 0 480 167"
                            preserveAspectRatio="none"
                            className={styles.chartSvg}
                        >
                            <defs>
                                <linearGradient
                                    id="currencyGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#ffffff"
                                        stopOpacity="0.55"
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#390096"
                                        stopOpacity="0.2"
                                    />
                                </linearGradient>
                            </defs>

                            {/* Grafik dolgusu */}
                            <path
                                d={fillPath}
                                fill="url(#currencyGradient)"
                            />

                            {/* Grafik çizgisi */}
                            <path
                                d={chartPath}
                                fill="none"
                                stroke="#FF868D"
                                strokeWidth="1"
                            />

                            {/* USD değeri */}
                            {usdRate > 0 && (
                                <>
                                    <circle
                                        cx="0"
                                        cy={y1}
                                        r="2.5"
                                        fill="#FF868D"
                                    />

                                    <text
                                        x="8"
                                        y={y1 - 8}
                                        className={styles.chartLabel}
                                    >
                                        {formatRate(usdRate)}
                                    </text>
                                </>
                            )}

                            {/* EUR değeri */}
                            {eurRate > 0 && (
                                <>
                                    <circle
                                        cx="440"
                                        cy={eurY}
                                        r="2.5"
                                        fill="#FF868D"
                                    />

                                    <text
                                        x="402"
                                        y={eurY - 8}
                                        className={styles.chartLabel}
                                    >
                                        {formatRate(eurRate)}
                                    </text>
                                </>
                            )}
                        </svg>
                    </div>
                )}

            {lastUpdated && (
                <div className={styles.updated}>
                    Last updated:{' '}
                    {new Date(lastUpdated).toLocaleString('tr-TR')}
                </div>
            )}
        </div>
    );
};

export default CurrencyTab;