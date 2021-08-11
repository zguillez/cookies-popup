# cookies-popup
cookies popup for web sites

```
aws --endpoint-url http://objects-us-east-1.dream.io/ s3 cp pdf s3://static.zguillez.media/ --recursive --profile dreamhost
aws --endpoint-url http://objects-us-east-1.dream.io/ s3 ls s3://static.zguillez.media --profile dreamhost
```

```
aws --endpoint-url https://objects-us-east-1.dream.io s3api list-objects --bucket static.zguillez.media --profile dreamhost | grep Key | cut -c 21- | rev | cut -c 3-|rev | awk '{cmd="aws --endpoint https://objects-us-east-1.dream.io s3api put-object-acl --acl public-read --bucket=static.zguillez.media --profile dreamhost --key "$0; system(cmd)}'
```

```
aws cloudfront create-invalidation --distribution-id E1V2IFV6II1LK1 --paths '/*' --profile linkemann
```