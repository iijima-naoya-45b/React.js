# React.jsの枠作成

### build
`docker compose build`

### backend側のコンテナに入る
`docker compose run api bash`

### db作成
`rails db:create`

# ここで、失敗する場合は、config/database.ymlの以下を修正。

18行目:
 host: db ←ここをdbと打ち直して再実行。

### node_modulesのinstall
`docker compose run front npm install`

### docker立ち上げ
docker compose up

### port番号
`localhost:3000`
<img width="959" alt="スクリーンショット 2024-01-21 16 11 19" src="https://github.com/iijima-naoya-45b/React.js/assets/134466566/4346e20c-9e4a-411b-860c-4b8c4f80c510">
`localhost:3001`
[![Image from Gyazo](https://i.gyazo.com/bdc97dc8d2464ffeb41786262b66d640.png)](https://gyazo.com/bdc97dc8d2464ffeb41786262b66d640)
