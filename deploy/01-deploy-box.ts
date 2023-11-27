import { getNamedAccounts, network } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/dist/types';
import { developmentChains } from '../const';
import verify from '../utils/verify';

const deploy: DeployFunction = async ({ deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log('-------------------');
  const box = await deploy('Box', {
    from: deployer,
    log: true,
    proxy: {
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  });

  if (!developmentChains.includes(network.name)) {
    log('Verifying...');
    await verify(box.address);
  }
  log('-------------------');
};

export default deploy;
