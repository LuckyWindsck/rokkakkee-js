# rokkakkee-js

[陣取り合戦 - ロッカッケー](https://rokkakkee.netlify.app/) の CLI 版

## ルール（ブラウザー版）

陣取り合戦 ロッカッケー のあぞびかた

1. 緑と紫が交互に進んで戦うよ！
2. マスの数字 1 は 防御力！ \
   自陣なら通過すると +1 \
   敵陣なら攻撃すると -1 \
   0 まで減ると 白に戻る！
3. 本体を直接攻撃されるとポータルに戻される！
4. マスが全て埋まったとき
   自陣のマスが多いほうの勝ち！

## 使い方

```shell
$ yarn
$ yarn build
$ ./bin/rokkakkee --rule
$ ./bin/rokkakkee
```
