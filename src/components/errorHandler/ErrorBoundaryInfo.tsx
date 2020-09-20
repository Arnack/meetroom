import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../helpers/i18n'

interface IProps {
    error?: any;
    errInfo?: any;
}

const ErrorBoundaryInfo:FC<IProps> = ({error, errInfo}) => {
    const { t } = useTranslation('error_handler', { i18n, useSuspense: false });
    return (
        <>
            <h1>{t('error_boundary.title')}</h1>
            <p>{t('error_boundary.description')}</p>
            {error && <div>{error.toString()}</div>}
            {errInfo && <div>{errInfo.toString()}</div>}
        </>
    )
}

export default ErrorBoundaryInfo;

