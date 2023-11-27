# Sample Hardhat Upgrades Project

Two implementation contract with different version

1. Box
2. BoxV2

A proxy contract which will point to Box first, then upgrade to BoxV2

1. hardhat-deploy's built-in proxies
2. Openzeppelin upgrades plugin

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
