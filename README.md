# 建立Edge擴充功能

使用React建構一個可適用於Edge瀏覽器的擴充功能，擴充功能主要作用為將試算表表格透過複製貼上轉為以下格式: `JSON`, `HTML`, `Markdown`，點擊相應的按鈕即可複製轉換後代碼。

其實只是因為我蠻頻繁會用到，每次想要轉成其他格式又是一頓操作勞心費力，但也沒有找到有類似或相關的功能可以使用的外掛，於是只好自己亂弄一個勉強堪用，至少夠我自己用，但是代碼內容也是亂七八糟，本想說整理一下要不乾脆上傳到商店去，可是又覺得太丟臉了，所以就放在自己這，以後也好查找。

## Installation

下載此專案，解壓縮後導航到該專案文件夾中，並用 `yarn install` 進行依賴項安裝。

```bash
  cd edge-addons
  yarn install
```

然後執行 `yarn start` 則可以在網頁上查看此擴充功能的畫面。

在完成依賴項的安裝後，執行 `yarn build`，而後會在根目錄下發現有2個新增的文件夾: `dist`與`build`，打開 **Edge瀏覽器** 導航到擴充功能管理畫面，或是網址列輸入 `edge://extensions/`，將 **開發人員模式** 的選項開關設定為開啟，具體說明可以參考[微軟的網頁](https://learn.microsoft.com/zh-tw/microsoft-edge/extensions-chromium/getting-started/extension-sideloading)，將 `dist`文件夾中的 `manifest.json` 檔案拖到擴充功能管理的視窗畫面中，然後就會看到 **從其他來源** 分類中的擴充功能多了一個 `Table Data Converte`。

## Usage

先複製一個要轉換格式的試算表表格，複製後正常情況下已經會在系統的剪貼簿內，總之就是複製貼上

1. 複製表格
2. 點擊瀏覽器上剛剛安裝的擴充功能會跳出彈窗
3. 在文字輸入區塊按 `貼上`
4. 點擊對應的按鈕複製轉換後的代碼
