import { getNamedAccounts, network } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/dist/types';
import { developmentChains } from '../const';
import verify from '../utils/verify';

const deploy: DeployFunction = async ({ deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log('-------------------');
  const boxv2 = await deploy('BoxV2', {
    from: deployer,
    log: true,
  });

  if (!developmentChains.includes(network.name)) {
    log('Verifying...');
    await verify(boxv2.address);
  }
  log('-------------------');
};

export default deploy;
