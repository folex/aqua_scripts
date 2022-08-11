import { Fluence } from "@fluencelabs/fluence";
import { stage } from "@fluencelabs/fluence-network-environment";
import { get_info, gather_infos, gather_infos_par } from "./basic.js";


async function main() {
    await Fluence.start({ connectTo: stage[0] });
    let info = await get_info();
    console.dir(info);
}

main().then(_ => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
