import axios from "axios";

const urlRelays = process.env.RELAYS+'/relays/status';

const api = axios.create();

async function getStatuses() {
    try {
        const res = await api.get(urlRelays);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

async function statusRelay(id) {
    try {
        const data = await getStatuses();
        // { relay0: 1, relay1: 1, relay2: 0, relay3: 0 }
        const status = data['relay'+id];
        if (status===1) return true;
        else return false;
    } catch (error) {
        console.log(error);
    }
}

export { getStatuses, statusRelay }