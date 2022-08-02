export function plugins() {
    return {
        test_service: {
            alive: () => { console.log("i'm alive"); return 7 }
        }
    }
}