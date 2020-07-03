import React, { ChangeEvent } from "react";
import i18n from '../../helpers/i18n'
import { useTranslation } from "react-i18next";

interface IProps {
    handleLoginChange: (e: ChangeEvent) => void;
    handlePasswordChange: (e: ChangeEvent) => void;
    submit: () => void;
    login: string;
    password: string;
}

const LoginForm = ({ login, password, handleLoginChange, handlePasswordChange, submit }: IProps) => {
    const { t } = useTranslation('user_handling', { i18n, useSuspense: false });

    return (

        <form className="login-form" onSubmit={submit}>
            <h2>COLUMNIST</h2>
            <input className="input-login" type="text" placeholder={t('login')} onChange={handleLoginChange} onSubmit={submit}/>
            <input className="input-login" type="password" placeholder={t('password')} onChange={handlePasswordChange} onSubmit={submit}/>
                           <input type="submit" value={t('submit').toString()}
                                  id="login-submit-btn"
                           onClick={submit}
                           disabled={login.length === 0 || password.length === 0}/>
            <div className="link-container">
                <a href="#">{t('forgot_pass_link')}</a>
            </div>

        </form>
    )
}

export default LoginForm;
