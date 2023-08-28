#!/bin/bash

set -o errexit -o pipefail -u

rm -rf .fluence

fluence market register --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5

fluence market add-peer --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5 --peer-id 12D3KooWRT8V5awYdEZm6aAV9HWweCEbhWd7df4wehqHZXAB7yMZ --slots 1

fluence market add-peer --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5 --peer-id 12D3KooWQdpukY3p2DhDfUfDgphAqsGu5ZUrmQ4mcHSGrRag6gQK --slots 1

fluence market add-peer --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5 --peer-id 12D3KooWBM3SdXWqGaawQDGQ6JprtwswEg3FWGvGhmgmMez1vRbR --slots 1

fluence deal deploy --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5
