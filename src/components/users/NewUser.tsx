import React, { FunctionComponent, useState } from "react";
import { ActionPanel } from "../shared/actionPanel/ActionPanel";
import { useTranslation } from "react-i18next";
import i18n from "../../helpers/i18n";
import { history } from "../../helpers/browserHistory";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react";
import { UserAPI } from "../../services/api/UserAPI";

interface IProps {

}

export const NewUser: FunctionComponent<IProps> = () => {
    const { t } = useTranslation(['admin', 'error_handler', 'messages'], { i18n, useSuspense: false });
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const saveUser = () => {
        UserAPI.createUser(login, email, password, confirmPass)
            .then((res) => {
                history.push('/users');
            })
            .catch(() => {})
    }

    return <>
        <h2>{t('admin:page.title')}</h2>
        <ActionPanel cancelCallBack={() => history.push('/users')}>

            <div className="form-wrapper">
                <form onSubmit={saveUser}>
                    <h3 className="form-title">{t("admin:page.new_title")}</h3>
                    <TextField placeholder={t("admin:entity.login")}
                               className="big-input"
                               onChange={(e, newVal) => setLogin(newVal as unknown as string)}/>

                    <TextField placeholder={t("admin:entity.email")}
                               type={'email'}
                               className="big-input"
                               onChange={(e, newVal) => setEmail(newVal as unknown as string)}/>

                    <TextField placeholder={t("admin:entity.password")}
                               type={'password'}
                               className="big-input"
                               onChange={(e, newVal) => setPass(newVal as unknown as string)}/>

                    <TextField placeholder={t("admin:entity.confirm_password")}
                               className="big-input"
                               type={'password'}
                               onChange={(e, newVal) => setConfirmPass(newVal as unknown as string)}/>



                    <div className="modal-button-group center">
                        <PrimaryButton text={t("admin:new_form.confirm")}
                                       className="big-button"
                                       onClick={saveUser}/>
                    </div>
                </form>

            </div>
        </ActionPanel>
        </>
}
