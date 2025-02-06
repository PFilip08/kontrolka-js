import {resetOpti, resetXeo, shutdownAll, shutdownMain, shutdownOpti, shutdownXeo, startAll, startMain, startOpti, startXeo} from "../modules/pcControl.js";
import {statusMain, statusOpti, statusXeo} from "../modules/pcStatus.js";
import {statusRelay} from "../modules/powerStatus.js";
import {powerOff, powerOn} from "../modules/powerControl.js";

export async function buttonController(req, res) {
    try {
        const button = req.body.button;
        /*
            button1 - powerOn all
            button2 - powerOff all
            button3 -
            sw1 - xeoniarnia
            sw2 - optiplex
            sw3 - main
         */
        console.log(button);
        if (button === 'button1') {
            await startAll();
        } else if (button === 'button2') {
            await shutdownAll();
        } else if (button === 'button3') {
            if (await statusRelay(0)) await powerOff(0);
            else await powerOn(0);
        } else if (button === 'sw1b') {
            if (await statusXeo()) await shutdownXeo();
            else await startXeo();
        } else if (button === 'sw1') {
            await resetXeo();
        } else if (button === 'sw2b') {
            if (await statusOpti()) await shutdownOpti()
            else await startOpti();
        } else if (button === 'sw2') {
            await resetOpti();
        } else if (button === 'sw3') {
            if (await statusMain()) await shutdownMain();
            else await startMain();
            if (await statusRelay(0)) await powerOff(0);
            else await powerOn(0);
        }
        return res.status(200).json(button);
    } catch (e) {
        console.log(e);
    }
}