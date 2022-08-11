import { Fluence } from "@fluencelabs/fluence";
import { krasnodar } from "@fluencelabs/fluence-network-environment"; // (1)
import { get_contact } from "./get_contact.js";


async function main() {
    await Fluence.start({ connectTo: krasnodar[0] });
    let contact = await get_contact("12D3KooWD7CvsYcpF9HE9CCV9aY3SJ317tkXVykjtZnht2EazDPm");
    console.dir(contact);
}

main().then(_ => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
