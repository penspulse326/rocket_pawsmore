<h1 align="center" style="font-weight: 700">Pawsmore｜寵物社交與數據記錄平台</h1>
<div align="center" style="margin-bottom:24px">
  
![image](https://github.com/penspulse326/rocket_pawsmore/assets/22139550/3919bea0-e970-417e-80d2-4584d6fc9b2b)

### ｜[網站連結](https://rocket-pawsmore.vercel.app/)｜[設計稿](https://www.figma.com/file/k4eFSqtEjqGKgduy7kFHgu/Web-setting?type=design&node-id=577%3A1780&mode=design&t=lMnpJOSpgNjy7Uzn-1)｜[前端 Repo](https://github.com/penspulse326/rocket_pawsmore)｜[後端 Repo](https://github.com/koalaoliver/Pawsmore)｜

</div>
<br/>

## 設計沿革

根據內政部至 2023 年 10 月的統計，在 2017 至 2018 年間，國人每年登記新生兒人數與毛孩領養數已經交叉，  
至今每年毛孩領養數不斷上漲，寵物保健與社交更是個大社群熱門話題。  
Pawsmore 結合社交網站與數據記錄功能，提供飼主們分享生活點滴與照護資料，促進分享交流，溫暖毛孩們的每一天。


## 功能清單

- 註冊帳號及建立個人資料
- 建立寵物檔案
- 發布寵物檔案貼文
- 對貼文按下喜歡或發布留言
- 探索物種貼文
- 搜尋寵物帳號
- 追蹤寵物檔案
- 查看他人寵物檔案紀錄回顧
- 新增各類紀錄卡片
- 查看數據總覽
- 分享卡片至社群貼文

## 建議體驗流程
- 使用 **`email：ss@11.com`**、**`密碼：sss111`** 登入
- 瀏覽熱門貼文，可以按讚或留言
- 點選該貼文的發文帳號連結到寵物檔案查看更多資訊
- 追蹤後該寵物的三天內的貼文都會出現在首頁的動態牆
- 首頁右邊側邊欄的探索可以查看各物種的相關貼文
- 首頁右邊側邊搜尋輸入帳號 realDiablos 找到黑炭
- 點選追蹤下方的回顧標籤可以看到黑炭的各式紀錄
- 點選置頂導覽列的數據紀錄可以看到**湯寶寶**數據紀錄
- 點選右上角查看數據總覽可查看最近一筆紀錄的異常狀況與原因
- 返回紀錄頁面，可以釘選任何已經有紀錄的一天，右側會出現對應的卡片，點開查看該紀錄的資訊，下方可以分享該筆紀錄至社群貼文
- 完成後點選置頂導覽列的社群首頁可以看到剛剛分享的貼文出現在動態牆，點開可查看卡片詳細資訊

## Git 協作規範
### Commit
| 類型 | 格式 | 說明 |
| :---: | :---: | :--- |
| 新增功能 | feat: | 新增功能 |
| 修補錯誤 | fix: | 修正現有功能的錯誤 |
| 重構程式 | refactor: | 重組、優化程式(邏輯不變) |
| 樣式相關 | style: | 修改程式碼風格 (不影響程式碼運行的變動) |
| 維護資料 | chore: | 更新專案建置、版本…其他 (不影響程式碼運行的變動) |

### Branch
| 類型 | 格式 |
| :---: | :---: |
| 新增頁面樣式 | layout/ |
| 新增功能 | feature/ |
| 重構功能 | refactor/ |
| 修正功能 | bugfix/ |
| 緊急修復 | hotfix/ |

## 技術規格 
### 前端
- Next.js
- React.js
- TypeScript
- React-Hook-Form
- Redux@Toolkit
- Moment.js
- TailwindCSS
- Swiper

### 後端
- C#
- MSSQL
- Postman
- ASP.Net
- LINQ
- Azure VM
