import { providers } from 'ethers'

import { Eip1967Proxy } from '../../../common/proxies/Eip1967Proxy'
import {
  ZkSwap2Governance,
  ZkSwap2Governance__factory,
} from '../../../typechain'
import { ContractParameters } from '../../../types'
import { addresses } from '../constants'

export async function getGovernance(
  provider: providers.JsonRpcProvider,
): Promise<ContractParameters> {
  const governance = ZkSwap2Governance__factory.connect(
    addresses.governance,
    provider,
  )

  return {
    name: 'Governance',
    address: governance.address,
    upgradeability: {
      type: 'eip1967 proxy',
      admin: await Eip1967Proxy.getAdmin(provider, governance),
      implementation: await Eip1967Proxy.getImplementation(
        provider,
        governance,
      ),
    },
    values: {
      validators: await getValidators(governance),
      networkGovernor: await governance.networkGovernor(),
      tokenLister: await governance.tokenLister(),
    },
  }
}

async function getValidators(governance: ZkSwap2Governance) {
  const events = await governance.queryFilter(
    governance.filters.ValidatorStatusUpdate(),
    0,
  )
  const validators = new Set<string>()
  for (const event of events) {
    if (event.args.isActive) {
      validators.add(event.args.validatorAddress)
    } else {
      validators.delete(event.args.validatorAddress)
    }
  }
  return [...validators]
}
