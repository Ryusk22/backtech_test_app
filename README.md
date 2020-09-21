# README(backtech_test_app)

## 理解していない部分
- sequelizeの仕組みをあまり理解していない。データベース接続を容易にするもの、くらいの理解度。

- bcryptを使用してパスワードをhash化しているが、  
genSaltSyncで変数saltを作り、hash作成の際にそれを第2引数にしないと  
compareSyncでうまく動作せず、このsaltなどの仕組みがあまり理解出来ていない。

- async async
await/asyncは非同期処理を同期的に行うためのものって理解で、  
nodeの非同期処理のデメリットやなぜ同期的に行うために  
async asyncを使うのかをあまり理解できていない。

- promise
generateResetTokenでPromiseを使っているが、  
ここでPromiseを使って非同期的に実装する必要があるのかは理解していない。  
上記に繋がる。

- パスワードリセットトークンを作成するために「crypto」を使って、  
「暗号論的擬似乱数」というのを作成しているみたいだが、第一引数であるバイト数が何かや、  
第2引数のコールバックの詳しい仕組みは分からない。  
とにかくパスワードリセットトークンを作成出来るといった具合の理解度。

## 機能概要

- 環境  
https://github.com/Ryusk22/backtech_test_app/blob/master/package.json

- [x] 機能１−１
  - [x] ユーザーアカウントを作成する機能
  - [x] ログイン画面からログインする機能
  - [x] ログインに成功した場合に、ログイン後の画面を表示する機能

- [x] 機能１−２
  - [x] 悪意のある別サイトからの、ユーザーアカウント作成のPOST処理で、  
  ユーザーアカウントを作成出来ないようにしてください

- [x] 機能１−３
  - [x] ログインしていない状態で、ログイン後の画面のURLを入力した場合、  
  ログイン画面を表示し、ログイン成功後、入力したURLの画面を表示してください

- [x] 機能１−４（自由に考えて良い課題）

  - ユーザがパスワードを忘れた場合の仕様を考え、機能を作ってください
  - [x] パスワードリセット用のメールを受け取るように
  
### 機能１−１
  
- http://localhost:3000/register にアクセスし、  
名前、メールアドレス、パスワードを入力しアカウント作成

- ログアウト状態で http://localhost:3000/login にアクセスし、  
先程登録したメールアドレスとパスワードを入力すると、  
ログイン後の画面である http://localhost:3000/home が表示される

### 機能１−２

- VScodeのextensionであるRESTAPIを用いてユーザー作成のPOST処理を送信すると  
「invalid csrf token」エラーが発生する。  
[![Image from Gyazo](https://i.gyazo.com/40c35e00d1827505eaadb1ffc0a74ece.gif)](https://gyazo.com/40c35e00d1827505eaadb1ffc0a74ece)

### 機能１−３

例としてログイン前にログイン後の画面のURLである  
http://localhost:3000/extra にアクセスすると、  
http://localhost:3000/login にリダイレクトされ、  
ログインすると http://localhost:3000/extra に飛ぶ。  
ログイン後の画面のURLを入力しなかった場合は http://localhost:3000/home に。

### 機能１−４

パスワードを忘れた場合は、http://localhost:3000/forgot にアクセスして、  
パスワードリセット用のメールアドレスを入力後に、  
パスワードリセット用のURLが記載のメールが届く。  
そのURLにアクセスすると新しいパスワードが入力出来て、パスワードが更新される。
