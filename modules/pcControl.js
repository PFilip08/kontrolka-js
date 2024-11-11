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

const urlKVM = process.env.KVM;
const urlMain = process.env.MAIN;

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
    try {
        api.get(urlKVM).then(() => {
            api.post(urlKVM+'/power?action=off');
        });
    } catch (error) {
        console.log(error);
    }
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

async function shutdownMain() {
    try {
        api.post(urlMain+'/button1');
    } catch (error) {
        console.log(error);
    }
}

async function startAll() {
    await startXeo();
    await startOpti();
}

async function startXeo() {
    try {
        api.get(urlKVM).then(() => {
            api.post(urlKVM+'/power?action=on');
        });
    } catch (error) {
        console.log(error);
    }
}

async function startOpti() {
    try {
        const session = await Session.create(mcUri, options);
        return await await session.wake_devices(node, [5]);
    } catch (error) {
        console.log(error);
    }
}

async function startMain() {
    try {
        await shutdownMain();
    } catch (error) {
        console.log(error);
    }
}

async function resetXeo() {
    try {
        api.get(urlKVM).then(() => {
            api.post(urlKVM+'/power?action=reset_hard');
        });
    } catch (error) {
        console.log(error);
    }
}

async function resetOpti() {
    try {
        const session = await Session.create(mcUri, options);
        return await await session.resetAMT(node, [5]);
    } catch (error) {
        console.log(error);
    }
}

async function resetMain() {
    try {
        api.post(urlMain+'/button2');
    } catch (error) {
        console.log(error);
    }
}

export { shutdownOpti, shutdownXeo, shutdownMain, shutdownAll, startOpti, startXeo, startMain, startAll, resetOpti, resetXeo, resetMain };