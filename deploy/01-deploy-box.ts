import { getNamedAccounts } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/dist/types';

const deploy: DeployFunction = async ({ deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log('-------------------');
  await deploy('Box', {
    from: deployer,
    log: true,
    proxy: {
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  });
};

export default deploy;
