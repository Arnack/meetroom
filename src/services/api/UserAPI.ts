import Axios from 'axios';
import { StorageService } from "../StorageService";
import { LOGIN_URL, USER_URL } from "../../constants/api/v1";

Axios.defaults.headers.common['Authorization'] = `Bearer ${StorageService.getAccessToken()}`;


export class UserAPI {
    static login = async (login: string, password: string) => {
        const result = await Axios({
            method: 'post',
            baseURL: process.env.REACT_APP_BASE_URL,
            url: LOGIN_URL,
            data: {
                login,
                password
            },
        });

        return result.data.data;
    }

    static getUsers = async () => {
        const result = await Axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BASE_URL,
            url: USER_URL
        })

        return result.data.data;
    }

    static createUser = async (login: string, email: string, password: string, confirm_password: string) => {
        const result = await Axios({
            method: 'put',
            baseURL: process.env.REACT_APP_BASE_URL,
            url: USER_URL,
            data: {
                login,
                email,
                password,
                confirm_password
            }
        })

        return result.data;
    }

    static updateUser = async (id: number | string, login: string, email: string) => {
        const result = await Axios({
            method: 'post',
            baseURL: process.env.REACT_APP_BASE_URL,
            url: USER_URL
        })

        return result.data;
    }

    static updatePassword = async (id: number | string, password: string, password_confirm: string) => {
        const result = await Axios({
            method: 'post',
            baseURL: process.env.REACT_APP_BASE_URL,
            url: USER_URL
        })

        return result.data;
    }

    static deleteUser = async (id: string | number) => {
        const result = await Axios({
            method: 'delete',
            baseURL: process.env.REACT_APP_BASE_URL,
            url: `${USER_URL}/${id}`
        })

        return result.data;
    }
}
