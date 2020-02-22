import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
const DEFAULT_ERROR_MESSAGE = '系统异常';

const instance = axios.create({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
});

export default async (url, payload) => {
    try {
        const result = await instance.post.call(null, url, qs.stringify(payload));
        let { data: response } = result;
        const { status, msg, data } = response;
        if (!status) {
            Message.error(msg || DEFAULT_ERROR_MESSAGE);
        }
        return { status, msg, data: data || [] };
    } catch (e) {
        Message.error(e.message || DEFAULT_ERROR_MESSAGE);
        throw e;
    }
}
