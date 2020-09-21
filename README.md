# README(backtech_test_app)

## 理解していない部分
- sequelizeの仕組みをあまり理解していない。データベース接続を容易にするもの、くらいの理解度。

- bcryptを使用してパスワードをhash化しているが、genSaltSyncで変数saltを作り、hash作成の際にそれを第2引数にしないとcompareSyncでうまく動作せず、このsaltなどの仕組みがあまり理解出来ていない。

- async async
await/asyncは非同期処理を同期的に行うためのものって理解で、nodeの非同期処理のデメリットやなぜ同期的に行うためにasync asyncを使うのかをあまり理解できていない。

- promise
generateResetTokenでPromiseを使っているが、ここでPromiseを使って非同期的に実装する必要があるのかは理解していない。上記に繋がる。

- パスワードリセットトークンを作成するために「crypto」を使って、「暗号論的擬似乱数」というのを作成しているみたいだが、第一引数であるバイト数が何かや、第2引数のコールバックの詳しい仕組みは分からない。とにかくパスワードリセットトークンを作成出来るといった具合の理解度。
