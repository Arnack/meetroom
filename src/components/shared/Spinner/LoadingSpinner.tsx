import React from "react";
import i18n from '../../../helpers/i18n'
import { useTranslation } from "react-i18next";
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import './LoadingSpinner.scss';

const LoadingSpinner = () => {
    const { t } = useTranslation('misc', { i18n, useSuspense: false });
    return (
        <>
            <Spinner className="loading-spinner" label={t('loading')} ariaLive="assertive" labelPosition="right" />
        </>
    )
}

export default LoadingSpinner;
