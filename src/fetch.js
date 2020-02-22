import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
});

export default async (url, payload) => {
    try {
        const result = await instance.post.call(null, url, qs.stringify(payload));
        let { data: response } = result;
        return response;
    } catch (e) {
        throw e;
    }
}
