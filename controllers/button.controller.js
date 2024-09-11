import {shutdownAll, shutdownOpti, shutdownXeo, startAll, startOpti, startXeo} from "../modules/pcControl.js";
import {statusOpti, statusXeo} from "../modules/pcStatus.js";

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
            return res.status(500).send('not implemented');
        } else if (button === 'sw1') {
            if (await statusXeo()) await shutdownXeo();
            else await startXeo();
        } else if (button === 'sw1b') {
            await resetXeo();
        } else if (button === 'sw2') {
            if (await statusOpti()) await shutdownOpti()
            else await startOpti();
        } else if (button === 'sw2b') {
            await resetOpti();
        } else if (button === 'sw3') {
            return res.status(500).send('not implemented');
        }
        return res.status(200).json(button);
    } catch (e) {
        console.log(e);
    }
}