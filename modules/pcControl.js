import { Session } from "libmeshctrl";
import axios from "axios";
import {Agent} from "node:https";
const mcUri = process.env.MC;
const node = process.env.MC_NODE;
const options = {
    user: process.env.MC_USER,
    password: process.env.MC_PASSWORD
};
// a to dlatego, bo MeshCommander ma untrusted certa :p
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let url = process.env.KVM;

const api = axios.create({
    httpsAgent: new Agent(),
    headers: {
        'X-KVMD-User': process.env.KVM_USER,
        'X-KVMD-Passwd': process.env.KVM_PASSWORD,
    }
});

async function shutdownAll() {
    await shutdownOpti();
    await shutdownXeo();
}

async function shutdownXeo() {
    api.get(url).then(res => {
        api.post(url+'/power?action=off');
    }).catch(err=>console.log(err));
}

async function shutdownOpti() {
    try {
        const session = await Session.create(mcUri, options);

        // console.log(await session.list_devices());
        return await session.powerOffAMT(node, [5]);
    } catch (error) {
        console.log(error);
    }
}

async function startAll() {
    await startXeo();
    await startOpti();
}

async function startXeo() {
    api.get(url).then(res => {
        api.post(url+'/power?action=on');
    }).catch(err=>console.log(err));
}

async function startOpti() {
    try {
        const session = await Session.create(mcUri, options);
        return await session.powerOffAMT(node, [5]);
    } catch (error) {
        console.log(error);
    }
}

export { shutdownOpti, shutdownXeo, shutdownAll, startOpti, startXeo, startAll };