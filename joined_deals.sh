#!/usr/bin/env sh

set -o pipefail -o nounset -o errexit

KRAS=$(fluence default peers kras | jq -Rcn '[ inputs / "p2p/" | .[1] ] as $ids | { ids: $ids }')
TESTNET=$(fluence default peers testnet | jq -Rcn '[ inputs / "p2p/" | .[1] ]')
STAGE=$(fluence default peers stage | jq -Rcn '[ inputs / "p2p/" | .[1] ]')

fluence run -f 'joined_deals(ids)' -i decider_config.aqua --particle-id --data $KRAS --relay kras-01