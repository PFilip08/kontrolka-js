import { Session } from "libmeshctrl";
import axios from "axios";
import {Agent} from "node:https";
const mcUri = process.env.MC;
const options = {
    user: process.env.MC_USER,
    password: process.env.MC_PASSWORD
};
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const urlKVM = process.env.KVM;
const urlMain = process.env.MAIN;

const api = axios.create({
    httpsAgent: new Agent(),
    headers: {
        'X-KVMD-User': process.env.KVM_USER,
        'X-KVMD-Passwd': process.env.KVM_PASSWORD,
    }
});

async function statusOpti() {
    try {
        const session = await Session.create(mcUri, options);
        const data = await session.list_devices();
        let state = false

        if(data[0].pwr) state = true;
        await session.close();
        return state;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function statusXeo() {
    try {
        const res = await api.get(urlKVM);
        return res.data.result.leds.power;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function statusMain() {
    try {
        const res = await api.get(urlMain+'/leds');
        if (res.data.led1 === 'ON') return true;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export { statusOpti, statusXeo, statusMain }