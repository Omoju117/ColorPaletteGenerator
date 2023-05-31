# Color Palette Generator

## 概要

Udemy のコース"Mastering OpenAI Python APIs: Unleash ChatGPT and GPT4"で登場する ColorPaletteGenerator を Node.js で作り直したものになります。
OpenAI API を利用する際の Tips を記録・共有するために用意したものとなります。
コースはこちら ↓
https://www.udemy.com/course/mastering-openai/

## 起動手順

1. このプロジェクトのクローンを行う
2. cd このプロジェクトのルートディレクトリに移動
3. .env.example をコピーしてルートディレクトリに.env を用意し、事前に取得した OPENAI_API_KEY を設定します
4. docker-compose build
5. docker-compose up

以下の URL にアクセスすると画面が表示されます
http://localhost:3000/

![ColorPaletteGenerator](/public/img/indications/color-palette-generator.png "ColorPaletteGenerator")

## 操作方法

画面中央の入力フィールドにキーワードを入力し、Enter する。
キーワードは固有名詞であればなんでも OK。(映画、自然(海・山・砂漠など)の固有名詞、街の名前、Google のブランドカラー...ect)

## OpenAI API の Tips

このコースでは AI に出す指示(プロンプト)の重要な要素は以下であると紹介がありました。

1. 明確な指示を出すこと
2. 出力として欲しいフォーマットを指定すること
3. 必要に応じて出力例を用意してあげること
4. 複雑で入り組んだ指示の場合には separator を使用すること()

このプロジェクトでは指示を出す際に 1,2,3 のポイントを押さえています。
とてもシンプルですが面白いプロジェクトだったので OpenAI API を触ってみるのにちょうどいいと思います。
※指示(プロンプト)は src/app.js 内の generateColors 関数内にあります

## OpenAI API Playground

OpenAI API にはさまざまなモデルが存在します。
それぞれのモデルの特徴を把握し、自身のプロジェクトにマッチするかを比較検証するために Playground が提供されていました。
色々と調整をしながら試すことができるので使い勝手が良さそうです。
https://platform.openai.com/playground
