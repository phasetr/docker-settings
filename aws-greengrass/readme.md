# README
## URL
- [AWS チュートリアル](https://docs.aws.amazon.com/greengrass/v2/developerguide/getting-started.html)
- [Github, Docker](https://github.com/aws-greengrass/aws-greengrass-docker)

## new
```sh
docker build .
dc up -d
dc ps
dc exec awsapp bash

apt install default-jdk
java --version
```

```sh
sudo -E java -Droot="/greengrass/v2" -Dlog.store=FILE \
  -jar ./GreengrassInstaller/lib/Greengrass.jar \
  --aws-region ap-northeast-1 \
  --thing-name MyGreengrassCore \
  --thing-group-name MyGreengrassCoreGroup \
  --thing-policy-name GreengrassV2IoTThingPolicy \
  --tes-role-name GreengrassV2TokenExchangeRole \
  --tes-role-alias-name GreengrassCoreTokenExchangeRoleAlias \
  --component-default-user ggc_user:ggc_group \
  --provision true \
  --setup-system-service true \
  --deploy-dev-tools true
```
