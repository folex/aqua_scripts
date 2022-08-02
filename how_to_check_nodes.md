
# What's inside
## Check node reachability
- `checkNodeIsUp(targetNode: PeerId, validatorNodes: []PeerId, timeout: u32) -> []string`

`checkNodeIsUp` is a function that returns reachability status of the `targetNode`. The idea is that you call this function to learn if one node is reachable by others.

For example, you have nodes: node-01, node-02, node-03, node-04. Then, imagine you want to check if `node-01` is reachable from 3 other nodes.

You would call `checkNodeIsUp(node-01, [node-02, node-03, node-04], 5000)` and would receive a list of statuses, like this
```
  target node-01 validator node-02 status TARGET REACHABLE
  target node-01 validator node-03 status TARGET NOT REACHABLE
  validator node-04 relay node-02 status VALIDATOR NOT REACHABLE
```

From that list, you could see that
- `node-02` can reach `node-01` just fine
- `node-03` cannot reach `node-01`
- `node-04` isn't reachable at all, maybe `node-04` is down

Also, note the `5000` passed as timeout. You might want to change that.

## Check all nodes reachability
```
data Setup:
    target: PeerId
    validators: []PeerId

func checkAllNodes(setups: []Setup, timeout: u32) -> []string
```

You can call `checkAllNodes` with all combinations of `target` and `validators`, and receive a list of statuses for all nodes. This functions performs badly on even modest network sizes like 5-10 nodes. We've indentified the issue, and will fix it, but for now I'd recommend to keep poor performance and possible false-negatives in mind.

## Check that node is removed from the network
Fluence uses Kademlia for peer discovery. It is important that once peer goes down, it really disappears from the Kademlia. Otherwise, it will have a negative effect on network performance cuz other peers will try to connect, time out, waste resources on it.

`func checkNodeLeftKademlia(targetNode: PeerId, validators: []PeerId) -> bool`

You would call this function same as `checkNodeIsUp`, except this time you don't pass `timeout`. Only `target` and `validators`.

Function will return `true` if node has disappeared from the Kademlia network, and `false` if it's still visible.

If you can measure how long it takes for a node to disappear, that would be great!

# How to run scripts

You would need `aqua` CLI to run the scripts. You can install it with npm: `npm install --global @fluencelabs/aqua`.

Once installed, you can use it like this:
```
aqua run -i antithesis.aqua -f 'function(args)' --data '{ JSON DATA }'
```

## PeerId
In my explanations, I've referred to nodes as `node-01`, `node-02`, etc. But in real usage, you would need to use a thing called `PeerId`. It's a unique identifier that's derived from peer's public key.

It looks like this: `12D3KooWJSFYRkY8j2dZqqh8nVCktnXzgeAbpjAE5pNKPTdeYCaM`.

You can find your peer's PeerId in `docker logs`:
```
[2022-05-03T14:41:26.737398Z INFO  particle_node] node server peer id = 12D3KooWJSFYRkY8j2dZqqh8nVCktnXzgeAbpjAE5pNKPTdeYCaM
```

## How to run `checkNodeLeftKademlia`
```
aqua run --timeout 20000 \
    -i antithesis.aqua \
    -f 'checkNodeLeftKademlia(target, validators)' \
    --addr testnet-01\
    --data '{
        "target": "12D3KooWJSFYRkY8j2dZqqh8nVCktnXzgeAbpjAE5pNKPTdeYCaM",
        "validators": ["12D3KooWHk9BjDQBUqnavciRPhAYFvqKBe4ZiPPvde7vDaqgn5er", "12D3KooWBUJifCTgaxAUrcM9JysqCcS4CS8tiYH5hExbdWCAoNwb"]
    }'
```

## How to run `checkNodeIsUp`
```
aqua run --timeout 20000 \
    -i antithesis.aqua \
    -f 'checkNodeIsUp(target, validators, timeout)' \
    --addr testnet-01\
    --data '{
        "target": "12D3KooWMhVpgfQxBLkQkJed8VFNvgN4iE6MD7xCybb1ZYWW2Gtz",
        "validators": ["12D3KooWHk9BjDQBUqnavciRPhAYFvqKBe4ZiPPvde7vDaqgn5er", "12D3KooWBUJifCTgaxAUrcM9JysqCcS4CS8tiYH5hExbdWCAoNwb"],
        "timeout":2000,
    }'
```