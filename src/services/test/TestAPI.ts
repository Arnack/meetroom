import Axios from 'axios';
import { StorageService } from "../StorageService";
import { TEST_SEARCH_URL } from "../../constants/api/v1";

Axios.defaults.headers.common['Authorization'] = `Bearer ${StorageService.getAccessToken()}`;

export class TestAPI {
    static getSearchResult = async (text = 'Вася') => {
        const result = await Axios({
            method: 'get',
            url: 'http://10.13.9.12:3100/api/v1/search',
        });

        return result.data;
    }
    static postSearchResult = async (text = 'Вася', sources = [1]) => {
        const result = await Axios({
            method: 'post',
            url: 'http://10.13.9.15:3200/api/v1/search',
            data: {
                query: text,
                sources
            }
        });

        return result.data;
    }

}
