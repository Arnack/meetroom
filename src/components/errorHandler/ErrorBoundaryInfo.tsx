import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../helpers/i18n'

const ErrorBoundaryInfo = () => {
    const { t } = useTranslation('error_handler', { i18n, useSuspense: false });
    return (
        <>
            <h1>{t('error_boundary.title')}</h1>
            <p>{t('error_boundary.description')}</p>
        </>
    )
}

export default ErrorBoundaryInfo;

