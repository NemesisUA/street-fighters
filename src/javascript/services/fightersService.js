import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    #fighterEndpoint = '/';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        try {
            const fighterResult = await callApi(`${this.#fighterEndpoint}${id}.json`);
            return fighterResult;
        } catch (error) {
            throw error;
        }
    }
}

const fighterService = new FighterService();

export default fighterService;
