export async function plugins() {
    return {
        ipfs: {
            log: async () => {
                const ipfs = await import("ipfs-http-client");
                console.log("I'm ipfs plugin. Let's start.");
                console.dir(ipfs);
                return ipfs
            }
        }
    }
}
