#!/usr/bin/env sh

set -o pipefail -o nounset -o errexit

#010590720


TARGET=${1:-all}
ENVIRONMENT=${2:-krasnodar}
RELAY=$3

if [ "$TARGET" = "all" ]; then
    echo "Will check all nodes on $ENVIRONMENT via relay $RELAY"

    DATA=$(aqua config default_peers $ENVIRONMENT | jq -Rc '
        [ inputs / "p2p/" | .[1] ] as $ids |
        {
            setup: [range(0, $ids | length) | . as $n | {
                target: $ids[$n],
                validators: $ids | del(.[$n]),
                n: $n
            }],
            timeout: 25000,
        }')

    aqua run --verbose --timeout 2000000 \
                -i check.aqua \
                -f 'checkAllNodes(setup, timeout)' \
                --addr $RELAY\
                --data "$DATA"
elif [ "$TARGET" = "iter" ]; then
    echo "Will check all nodes on $ENVIRONMENT as separate 'aqua run' calls. Relay $RELAY"
    aqua config default_peers testnet | jq -Rc '
    [ inputs / "p2p/" | .[1] ] as $ids |
    range(0, $ids | length) | . as $n |
    {
        target: $ids[$n],
        validators: $ids | del(.[$n]),
        timeout: 5000,
        n: $n
    }' | sed 's/"/\\"/g' | xargs -L1 aqua run --verbose --timeout 20000 \
            -i check.aqua \
            -f 'checkNodeIsUp(target, validators, timeout)' \
            --addr $RELAY\
            --data
else
    echo "Will check node $TARGET on $ENVIRONMENT via $RELAY"

    DATA=$(aqua config default_peers $ENVIRONMENT | jq --argjson TARGET $TARGET -R '
        [ inputs / "p2p/" | .[1] ] as $ids |
        {
            target: $ids[$TARGET],
            validators: $ids | del(.[$TARGET]),
            timeout: 5000
        }')

    aqua run --verbose --timeout 20000 \
        -i check.aqua \
        -f 'checkNodeIsUp(target, validators, timeout)' \
        --data "$DATA" \
        --addr $RELAY
fi