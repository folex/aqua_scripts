(async () => {
    let plugin = await import("./plugin.mjs");
    console.dir(plugin);
    console.dir(plugin.plugins());
    console.dir(plugin.plugins().test_service.alive());

    let ipfs_plugin = await import("/tmp/ipfs_plugin/ipfs_plugin.mjs");
    console.dir(ipfs_plugin);
    console.dir(await ipfs_plugin.plugins());
    console.dir(await (await ipfs_plugin.plugins()).ipfs.log());
})()