import {statusMain, statusOpti, statusXeo} from "../modules/pcStatus.js";
import {statusRelay} from "../modules/powerStatus.js";

export async function ledController(req, res) {
    let led1 = await statusRelay(0);
    let led2 = true;
    let led3 = false;

    let led_s1 = await statusXeo();
    let led_s2 = await statusOpti();
    let led_s3 = await statusMain();

    return res.status(200).json({
        led1: led1,
        led2: led2,
        led3: led3,
        led_s1: led_s1,
        led_s2: led_s2,
        led_s3: led_s3
    });
}