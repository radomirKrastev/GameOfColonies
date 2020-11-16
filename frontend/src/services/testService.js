import api from './api';
import requester from './requester';

const testService = {
    basictest: async () => await requester(api.testEndpoint).getOne(),
};

export default testService;
