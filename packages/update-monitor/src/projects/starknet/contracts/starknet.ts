import { providers } from 'ethers'

import { StarkWare2019Proxy } from '../../../common/proxies/StarkWare2019Proxy'
import { getStarkWareNamedStorageAddress } from '../../../common/starkWareNamedStorage'
import { StarkNet__factory } from '../../../typechain'
import { ContractParameters } from '../../../types'
import { addresses } from '../constants'

export async function getStarkNet(
  provider: providers.JsonRpcProvider,
): Promise<ContractParameters> {
  const starkNet = StarkNet__factory.connect(addresses.starkNet, provider)

  return {
    name: 'StarkNet',
    address: starkNet.address,
    upgradeability: await StarkWare2019Proxy.getUpgradeability(
      provider,
      starkNet,
    ),
    values: {
      upgradeActivationDelay: (
        await starkNet.getUpgradeActivationDelay()
      ).toNumber(),
      configHash: (await starkNet.configHash()).toHexString(),
      programHash: (await starkNet.programHash()).toHexString(),
      verifierAddress: await getStarkWareNamedStorageAddress(
        provider,
        starkNet,
        'STARKNET_1.0_INIT_VERIFIER_ADDRESS',
      ),
    },
  }
}
