import axios from "axios";

const urlRelays = process.env.RELAYS+'/relay';

const api = axios.create();

async function powerOn(id) {
    try {
        await api.post(urlRelays+'?relay='+id+'&state=1');
    } catch (error) {
        console.log(error);
    }
}

async function powerOff(id) {
    try {
        await api.post(urlRelays+'?relay='+id+'&state=0');
    } catch (error) {
        console.log(error);
    }
}

export { powerOn, powerOff }