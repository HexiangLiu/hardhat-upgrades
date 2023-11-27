import { ethers } from 'hardhat';
import { BoxV2 } from '../typechain-types';

const main = async () => {
  const boxProxyAdmin = await ethers.getContract('DefaultProxyAdmin');
  const transparentProxy = await ethers.getContract('Box_Proxy');
  console.log(transparentProxy.interface.formatJson());
  const transparentProxyAddress = await transparentProxy.getAddress();
  const proxyBoxV1 = await ethers.getContractAt('Box', transparentProxyAddress);
  const versionV1 = await proxyBoxV1.version();
  console.log(versionV1);
  const boxV2: BoxV2 = await ethers.getContract('BoxV2');
  const boxV2Address = await boxV2.getAddress();
  // @ts-ignore
  const upgradeTx = await boxProxyAdmin.upgrade(
    transparentProxyAddress,
    boxV2Address
  );
  await upgradeTx.wait(1);

  const proxyBoxV2 = await ethers.getContractAt(
    'BoxV2',
    transparentProxyAddress
  );
  const versionV2 = await proxyBoxV2.version();
  console.log(versionV2);
};

main()
  .then(() => process.exit())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
