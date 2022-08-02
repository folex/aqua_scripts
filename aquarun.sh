aqua run --timeout 20000 \
    -i antithesis.aqua \
    -f 'checkNodeIsUp(target, validators, timeout)' \
    --data "$(aqua config default_peers testnet | jq -R '[ inputs / "p2p/" | .[1] ] as $ids | { target: $ids[0], validators: $ids | del(.[0]), timeout: 5000 }')" \
    --addr testnet-01


aqua config default_peers | jq -R '
    [ inputs / "p2p/" | .[1] ] as $ids |
    range(0, $ids | length) | . as $n |
    {
        target: $ids[$n],
        validators: $ids | del(.[$n]),
        timeout: 5000,
        n: $n
    }'

aqua config default_peers | jq -R '
    [ inputs / "p2p/" | .[1] ] as $ids |
    range(0, $ids | length) | . as $n |
    {
        target: $ids[$n],
        validators: $ids | del(.[$n]),
        timeout: 5000,
        n: $n
    }' | xargs -I{} echo '{}'

aqua config default_peers | jq -R '
    [ inputs / "p2p/" | .[1] ] as $ids |
    range(0, $ids | length) | . as $n |
    {
        target: $ids[$n],
        validators: $ids | del(.[$n]),
        timeout: 5000,
        n: $n
    }' | xargs -I{} aqua run --timeout 20000 \
            -i antithesis.aqua \
            -f 'checkNodeIsUp(target, validators, timeout)' \
            --addr testnet-01\
            --data "{}"


aqua config default_peers testnet | jq -Rc '
    [ inputs / "p2p/" | .[1] ] as $ids |
    range(0, $ids | length) | . as $n |
    {
        target: $ids[$n],
        validators: $ids | del(.[$n]),
        timeout: 2000,
        n: $n
    }' | sed 's/"/\\"/g' | xargs -L1 aqua run --timeout 20000 \
            -i antithesis.aqua \
            -f 'checkNodeIsUp(target, validators, timeout)' \
            --addr testnet-01\
            --data | grep -v waiting

DATA=$(aqua config default_peers testnet | jq -Rc '
    [ inputs / "p2p/" | .[1] ] as $ids |
    {
        setup: [range(0, $ids | length) | . as $n | {
            target: $ids[$n],
            validators: $ids | del(.[$n]),
            n: $n
        }],
        timeout: 5000,
    }')

aqua run --timeout 200000 \
            -i antithesis.aqua \
            -f 'checkAllNodes(setup, timeout)' \
            --addr testnet-01\
            --data "$DATA"

aqua run --timeout 20000 \
            -i antithesis.aqua \
            -f 'checkNodeIsUp(target, validators, timeout)' \
            --addr testnet-01\
            --data '{"target":"12D3KooWMhVpgfQxBLkQkJed8VFNvgN4iE6MD7xCybb1ZYWW2Gtz","validators":["12D3KooWHk9BjDQBUqnavciRPhAYFvqKBe4ZiPPvde7vDaqgn5er","12D3KooWBUJifCTgaxAUrcM9JysqCcS4CS8tiYH5hExbdWCAoNwb","12D3KooWJbJFaZ3k5sNd8DjQgg3aERoKtBAnirEvPV8yp76kEXHB","12D3KooWCKCeqLPSgMnDjyFsJuWqREDtKNHx1JEBiwaMXhCLNTRb","12D3KooWKnRcsTpYx9axkJ6d69LPfpPXrkVLe96skuPTAo76LLVH","12D3KooWBSdm6TkqnEFrgBuSkpVE3dR1kr6952DsWQRNwJZjFZBv","12D3KooWGzNvhSDsgFoHwpWHAyPf1kcTYCGeRBPfznL8J6qdyu2H","12D3KooWF7gjXhQ4LaKj6j7ntxsPpGk34psdQicN2KNfBi9bFKXg","12D3KooWB9P1xmV3c7ZPpBemovbwCiRRTKd3Kq2jsVPQN4ZukDfy"],"timeout":2000,"n":0}'