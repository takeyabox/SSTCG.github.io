# ポケポケ オンライン対戦ゲーム

スプラトゥーンの武器をテーマにしたポケモンカードゲーム風のオンライン対戦ゲームです。

## 🚀 クイックスタート

### 1. Firebase設定
`firebase-config.js` を開き、あなたのFirebaseプロジェクトの認証情報を入力してください。

### 2. ローカルサーバーで起動
```bash
# Python 3
python -m http.server 8000

# または Node.js
npx http-server -p 8000
```

### 3. ブラウザで開く
`http://localhost:8000` にアクセス

## 📖 詳細なドキュメント

完全な機能説明と使用方法は [walkthrough.md](file:///C:/Users/dengiken-admin/.gemini/antigravity/brain/3a69ee7b-43ea-41ea-b49a-fe1fac16f160/walkthrough.md) を参照してください。

## 🎮 ゲームの流れ

1. プレイヤー名を入力
2. デッキを構築（20枚 + エネルギータイプ1-3種類）
3. 合言葉で部屋を作成/参加
4. バトル開始！

## 📁 ファイル構成

- `index.html` - メインHTML
- `style.css` - スタイル
- `app.js` - アプリコントローラー
- `game.js` - バトルエンジン
- `cards.js` - カードデータ
- `firebase-config.js` - Firebase設定（要編集）

## ⚠️ 重要

- ES6モジュールを使用しているため、**必ずローカルサーバー経由**でアクセスしてください
- GitHub Pagesにデプロイする場合はViteなどでバンドルが必要です

## 🎨 実装機能

✅ デッキ構築システム  
✅ パスワードベースのマッチング  
✅ リアルタイム対戦（Firebase Realtime Database）  
✅ コイントス・セットアップフェーズ  
✅ ターン制バトル  
✅ エネルギーシステム  
✅ 進化システム  
✅ 状態異常（どく・やけど・まひ・ねむり・こんらん）  
✅ 弱点計算  
✅ 勝利条件（3ポイント先取）  
✅ プレミアムUI（スプラトゥーン風ネオンデザイン）

---

**作成日**: 2026-02-06  
**技術スタック**: HTML, CSS, JavaScript (ES6), Firebase Realtime Database
