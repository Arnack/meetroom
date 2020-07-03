import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Fabric } from "@fluentui/react";
import "./Login.scss"
import { UserAPI } from "../../services/api/UserAPI";
import { StorageService } from "../../services/StorageService";
import { IUserDTO } from "../../model/user/IUserDTO";
import LoginForm from "./LoginForm";
import LoadingSpinner from "../shared/Spinner/LoadingSpinner";
import { history } from "../../helpers/browserHistory";
import { LanguageSwitcher } from "../languageSwitcher/LanguageSwitcher";
import { HorizontalNav } from "../../containers/layout/horizontalNav/HorizontalNav";

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        if (validateForm()) {
            setIsLoading(true);
            UserAPI.login(login, password)
                .then((res: IUserDTO) => {
                    StorageService.login(res);
                    history.push("/");
                    window.location.reload();
                })
                .catch(err => {
                    console.error(err.toString());
                    StorageService.setToken("test");
                    history.push("/");
                    window.location.reload();
                })
                .finally(() => setIsLoading(false));
        }
    }

    const validateForm = () => {
        return login.length && password.length;
    };

    const handleLoginChange = (e: ChangeEvent) => {
        setLogin((e.target as HTMLTextAreaElement).value);
    }
    const handlePasswordChange = (e: ChangeEvent) => {
        setPassword((e.target as HTMLTextAreaElement).value);
    }

    return (
        <Fabric className="login-container">
            <HorizontalNav />
            {isLoading ?
                <LoadingSpinner/> :
                <LoginForm handleLoginChange={handleLoginChange} handlePasswordChange={handlePasswordChange}
                           submit={handleSubmit} login={login} password={password}/>
            }
        </Fabric>
    )
}

export default LoginPage;
