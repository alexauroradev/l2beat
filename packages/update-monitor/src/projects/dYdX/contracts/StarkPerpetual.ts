import { providers, utils } from 'ethers'

import { bytes32ToAddress } from '../../../common/address'
import { StarkWare2019Proxy } from '../../../common/proxies/StarkWare2019Proxy'
import { ContractParameters } from '../../../types'
import { addresses } from '../constants'

export async function getStarkPerpetual(
  provider: providers.JsonRpcProvider,
): Promise<ContractParameters> {
  return {
    name: 'StarkPerpetual',
    address: addresses.starkPerpetual,
    upgradeability: await StarkWare2019Proxy.getUpgradeability(
      provider,
      addresses.starkPerpetual,
    ),
    values: {
      subContracts: await Promise.all([
        getMapping(provider, addresses.starkPerpetual, 30, 1).then(
          bytes32ToAddress,
        ),
        getMapping(provider, addresses.starkPerpetual, 30, 2).then(
          bytes32ToAddress,
        ),
        getMapping(provider, addresses.starkPerpetual, 30, 3).then(
          bytes32ToAddress,
        ),
        getMapping(provider, addresses.starkPerpetual, 30, 4).then(
          bytes32ToAddress,
        ),
      ]),
    },
  }
}

async function getMapping(
  provider: providers.Provider,
  address: string,
  slot: number,
  key: number,
) {
  const compositeKey = utils.solidityKeccak256(
    ['uint256', 'uint256'],
    [key, slot],
  )
  return provider.getStorageAt(address, compositeKey)
}
