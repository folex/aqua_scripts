rm -rf .fluence

## Mumbai

fluence market register --network testnet --priv-key 0x8447c3b0ebbb09f3153ec59702459ee23c4af524e7882de9f5718f14c3f0e00b

fluence market add-peer --network testnet --priv-key 0x8447c3b0ebbb09f3153ec59702459ee23c4af524e7882de9f5718f14c3f0e00b --peer-id 12D3KooWRT8V5awYdEZm6aAV9HWweCEbhWd7df4wehqHZXAB7yMZ --slots 1

fluence market add-peer --network testnet --priv-key 0x8447c3b0ebbb09f3153ec59702459ee23c4af524e7882de9f5718f14c3f0e00b --peer-id 12D3KooWQdpukY3p2DhDfUfDgphAqsGu5ZUrmQ4mcHSGrRag6gQK --slots 1

fluence market add-peer --network testnet --priv-key 0x8447c3b0ebbb09f3153ec59702459ee23c4af524e7882de9f5718f14c3f0e00b --peer-id 12D3KooWBM3SdXWqGaawQDGQ6JprtwswEg3FWGvGhmgmMez1vRbR --slots 1

# local
fluence market add-peer --network testnet --priv-key 0x8447c3b0ebbb09f3153ec59702459ee23c4af524e7882de9f5718f14c3f0e00b --peer-id 12D3KooWJDiLFLmWstcFpAofWkYJzuvwuquNTQQkB9xzKjRyqqFJ --slots 1

fluence deal deploy --network testnet --priv-key 0x8447c3b0ebbb09f3153ec59702459ee23c4af524e7882de9f5718f14c3f0e00b

fluence deal match --network testnet --priv-key 0x8447c3b0ebbb09f3153ec59702459ee23c4af524e7882de9f5718f14c3f0e00b 0x6dD1aFfe90415C61AeDf5c0ACcA9Cf5fD5031517

fluence run -f 'runDeployedServices()'


## Hardhat

fluence market register --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5

fluence market add-peer --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5 --peer-id 12D3KooWRT8V5awYdEZm6aAV9HWweCEbhWd7df4wehqHZXAB7yMZ --slots 1

fluence market add-peer --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5 --peer-id 12D3KooWQdpukY3p2DhDfUfDgphAqsGu5ZUrmQ4mcHSGrRag6gQK --slots 1

fluence market add-peer --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5 --peer-id 12D3KooWBM3SdXWqGaawQDGQ6JprtwswEg3FWGvGhmgmMez1vRbR --slots 1

fluence deal deploy --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5

fluence deal match --network local --priv-key 0xfbd9e512cc1b62db1ca689737c110afa9a3799e1bc04bf12c1c34ac39e0e2dd5 0x6dD1aFfe90415C61AeDf5c0ACcA9Cf5fD5031517

fluence run -f 'runDeployedServices()'