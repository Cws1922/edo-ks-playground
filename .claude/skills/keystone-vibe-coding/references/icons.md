---
type: reference
---

# Keystone Icons Reference

> Package: `@fe-infra/keystone-icons-react` v0.7.7
> Import: `import { KsIconName } from '@fe-infra/keystone-icons-react'`

---

## Common Props (All Icons)

| Prop        | Type               | Default          | Description                                |
| ----------- | ------------------ | ---------------- | ------------------------------------------ |
| `size`      | `string \| number` | `16`             | Icon size in pixels                        |
| `color`     | `string`           | `'currentColor'` | Inherits from parent text color by default |
| `className` | `string`           | —                | Forwarded — use Tailwind utilities here    |
| `style`     | `object`           | —                | Avoid; prefer `className`                  |

**Usage:**

Icons default `color` to `currentColor`, so they inherit the surrounding
text color. Set the color with a Tailwind class on the icon or a parent —
**do not** pass a hardcoded hex.

```jsx
import { KsIconSearch } from '@fe-infra/keystone-icons-react';

// Good — color flows from the parent's text color
<button className="text-primary-fill">
  <KsIconSearch size={24} />
  Search
</button>

// Good — set color directly via className on the icon
<KsIconSearch size={24} className="text-error-fill" />

// Bad — hardcoded hex bypasses tokens and breaks theming
// <KsIconSearch size={24} color="#009995" />

// Bad — never set width/height in style; use the size prop
// <KsIconSearch style={{ width: 24, height: 24 }} />
```

---

## All Icons (325 total, alphabetical)

### A

KsIconAccountHealth, KsIconAd, KsIconAddCaptions, KsIconAddCircle, KsIconAddFlag, KsIconAddItem, KsIconAddLink, KsIconAddressSymbol, KsIconAddSection, KsIconAdGroupNav, KsIconAdNav, KsIconAdVariation, KsIconAiAssistant, KsIconAiGeneration, KsIconAlarm, KsIconAlignCenter, KsIconAlignLeft, KsIconAlignRight, KsIconAllApps, KsIconAnalytics, KsIconAndroid, KsIconAnnouncement, KsIconApple, KsIconApplications, KsIconArrowDown, KsIconArrowDownSmall, KsIconArrowLeft, KsIconArrowLeftSmall, KsIconArrowRight, KsIconArrowRightSmall, KsIconArrowUp, KsIconArrowUpSmall, KsIconAscend, KsIconAscendDown, KsIconAscendUp, KsIconAutomatedGroup

### B

KsIconBag, KsIconBank, KsIconBell, KsIconBlockedVideo, KsIconBlockNone, KsIconBold, KsIconBookmark, KsIconBookmarked, KsIconBreakdown, KsIconBriefcase, KsIconBrowserWindow, KsIconBrush, KsIconBulletedList

### C

KsIconCalendar, KsIconCamera, KsIconCampaignGroupNav, KsIconCar, KsIconCardList, KsIconCarousel, KsIconCart, KsIconCaseSensitive, KsIconCatalog, KsIconChangeUser, KsIconChart, KsIconCheckMark, KsIconCheckMarkSmall, KsIconChevronDown, KsIconChevronLeft, KsIconChevronRight, KsIconChevronUp, KsIconCircle, KsIconCircularConnection, KsIconClock, KsIconClose, KsIconCloseSmall, KsIconCoin, KsIconColorDropper, KsIconColoredAudio, KsIconColoredCode, KsIconColoredCompressedFile, KsIconColoredExcel, KsIconColoredFacebook, KsIconColoredFolder, KsIconColoredInstagram, KsIconColoredInstantMessagingUrl, KsIconColoredLine, KsIconColoredMessenger, KsIconColoredPdf, KsIconColoredPicture, KsIconColoredPptx, KsIconColoredSamsung, KsIconColoredSnapchat, KsIconColoredTelegram, KsIconColoredUnknown, KsIconColoredVideo, KsIconColoredWhatsapp, KsIconColoredWord, KsIconColoredX, KsIconColoredZalo, KsIconCommand, KsIconCompare, KsIconComputer, KsIconConnect, KsIconContext, KsIconConversions, KsIconCopyContent, KsIconCoupon, KsIconCreditCard, KsIconCrop, KsIconCustomColumn, KsIconCut

### D

KsIconDarkmode, KsIconDelete, KsIconDeveloperCode, KsIconDisconnect, KsIconDivide, KsIconDocumentFile, KsIconDoubleChevronDown, KsIconDoubleChevronLeft, KsIconDoubleChevronRight, KsIconDoubleChevronUp, KsIconDoubleDay, KsIconDownload, KsIconDragItem, KsIconDropbox

### E

KsIconEdit, KsIconEngage, KsIconEnter, KsIconErase, KsIconExpand, KsIconExport

### F

KsIconFacebook, KsIconFeelGood, KsIconFilledAscend, KsIconFilledBookmark, KsIconFilledCamera, KsIconFilledCaution, KsIconFilledCheck, KsIconFilledChevronDown, KsIconFilledChevronLeft, KsIconFilledChevronRight, KsIconFilledChevronUp, KsIconFilledClose, KsIconFilledDisapproval, KsIconFilledFlag, KsIconFilledHeart, KsIconFilledHelp, KsIconFilledInfo, KsIconFilledInProgress, KsIconFilledLimitedApproval, KsIconFilledLocationPin, KsIconFilledLock, KsIconFilledPause, KsIconFilledPin, KsIconFilledPlay, KsIconFilledRocket, KsIconFilledStar, KsIconFilledThumbsDown, KsIconFilledThumbsUp, KsIconFilledTiktokUi, KsIconFilledTips, KsIconFilledUnlock, KsIconFilledUnmarkedFlag, KsIconFilledVolumeDown, KsIconFilledVolumeMute, KsIconFilledVolumeUp, KsIconFilledWarning, KsIconFilterApply, KsIconFlight, KsIconFold, KsIconFolder, KsIconFolderAdd, KsIconFolderMinus, KsIconFollowers, KsIconFormatText, KsIconFullScreen, KsIconFullSelect

### G

KsIconGear, KsIconGenerateImage, KsIconGoogle, KsIconGoogleDrive

### H

KsIconHamburger, KsIconHanger, KsIconHashtag, KsIconHeadset, KsIconHeart, KsIconHelp, KsIconHero, KsIconHideKeyboard, KsIconHideTimeline, KsIconHistory, KsIconHoliday, KsIconHome, KsIconHourglass

### I

KsIconImageCollection, KsIconInfo, KsIconInternational, KsIconInvalidConversion, KsIconItalicized

### L

KsIconLayout, KsIconLeadGeneration, KsIconLeftParenthesis, KsIconLightmode, KsIconLipsync, KsIconLoading, KsIconLocal, KsIconLocationPin, KsIconLog, KsIconLogout, KsIconLowercase

### M

KsIconMail, KsIconMarkedFlag, KsIconMessage, KsIconMinus, KsIconModel, KsIconMoney, KsIconMoreHorizontal, KsIconMoreVertical, KsIconMoveOne, KsIconMusic

### N

KsIconNarrow, KsIconNewWindow, KsIconNotes

### O

KsIconOffScreen, KsIconOption, KsIconOverlayPause, KsIconOverlayPlay

### P

KsIconPaste, KsIconPause, KsIconPauseCircle, KsIconPayment, KsIconPendingConversion, KsIconPenTool, KsIconPeople, KsIconPercent, KsIconPhone, KsIconPicture, KsIconPin, KsIconPlaceholder, KsIconPlay, KsIconPlayCircle, KsIconPlus, KsIconPlusSmall, KsIconPreviewClose, KsIconPreviewOpen, KsIconPrivateVideo, KsIconProtection, KsIconPuzzle

### Q

KsIconQrCode

### R

KsIconRatioFormat, KsIconReceipt, KsIconRedo, KsIconReduceCircle, KsIconReduceSection, KsIconRefresh, KsIconRemoveBackground, KsIconReusePrompt, KsIconRightParenthesis

### S

KsIconSave, KsIconSaveProject, KsIconSearch, KsIconSelectDirectional, KsIconSend, KsIconSentence, KsIconSeperateAudio, KsIconSettingsConfig, KsIconShare, KsIconShift, KsIconShop, KsIconShopify, KsIconShowKeyboard, KsIconShowTimeline, KsIconSignIn, KsIconSmartOptimization, KsIconSmartPlus, KsIconSound, KsIconSplit, KsIconSquare, KsIconStar, KsIconStickers, KsIconStop, KsIconStrikeThrough, KsIconSwitch

### T

KsIconTable, KsIconTablet, KsIconTargeting, KsIconTest, KsIconTextFile, KsIconThumbsDown, KsIconThumbsUp, KsIconTiktok, KsIconTiktokBlack, KsIconTiktokUi, KsIconTiktokWhite, KsIconTips, KsIconTitlecase, KsIconToggleOff, KsIconToggleOn, KsIconTopicTag, KsIconToTop, KsIconTransitions, KsIconTranslate, KsIconTrending, KsIconTrophy, KsIconTuxShare, KsIconTwitter

### U

KsIconUnapprovedConversion, KsIconUnderline, KsIconUndo, KsIconUnfold, KsIconUnlink, KsIconUpload, KsIconUploadImage, KsIconUploadOne, KsIconUppercase, KsIconUser

### V

KsIconVideoClip, KsIconVideoCollection, KsIconViewReport, KsIconVoice, KsIconVoiceSpeed, KsIconVolumeDown, KsIconVolumeMute, KsIconVolumeUp

### W

KsIconWallet, KsIconWand, KsIconWhatsapp

### Z

KsIconZoomIn, KsIconZoomOut

---

## Aliases (18 total)

| Alias                  | Points To            |
| ---------------------- | -------------------- |
| `KsIconMove`           | KsIconMoveOne        |
| `KsIconFilter`         | KsIconFilterApply    |
| `KsIconLink`           | KsIconAddLink        |
| `KsIconBlock`          | KsIconBlockNone      |
| `KsIconFolderSubtract` | KsIconFolderMinus    |
| `KsIconConfigSettings` | KsIconSettingsConfig |
| `KsIconAddFile`        | KsIconAddItem        |
| `KsIconCheck`          | KsIconCheckMark      |
| `KsIconCheckSmall`     | KsIconCheckMarkSmall |
| `KsIconAlarmClock`     | KsIconAlarm          |
| `KsIconShoppingCart`   | KsIconCart           |
| `KsIconAnalysis`       | KsIconAnalytics      |
| `KsIconBankCard`       | KsIconCreditCard     |
| `KsIconShoppingBag`    | KsIconBag            |
| `KsIconPreview`        | KsIconPreviewOpen    |
| `KsIconSmile`          | KsIconFeelGood       |
| `KsIconRemind`         | KsIconBell           |
| `KsIconAllApplication` | KsIconApplications   |

---

## Common Icon Choices by Use Case

| Use Case          | Icon                                                     |
| ----------------- | -------------------------------------------------------- |
| Navigation menu   | `KsIconHamburger`                                        |
| Search            | `KsIconSearch`                                           |
| Help / FAQ        | `KsIconHelp`, `KsIconFilledHelp`                         |
| Notifications     | `KsIconBell`                                             |
| Close / Dismiss   | `KsIconClose`, `KsIconCloseSmall`                        |
| Back / Forward    | `KsIconChevronLeft`, `KsIconChevronRight`                |
| Expand / Collapse | `KsIconChevronDown`, `KsIconChevronUp`                   |
| External link     | `KsIconNewWindow`                                        |
| Settings          | `KsIconGear`, `KsIconSettingsConfig`                     |
| Add / Create      | `KsIconPlus`, `KsIconAddCircle`                          |
| Delete / Remove   | `KsIconDelete`, `KsIconClose`                            |
| Edit              | `KsIconEdit`                                             |
| Download          | `KsIconDownload`                                         |
| Upload            | `KsIconUpload`                                           |
| Copy              | `KsIconCopyContent`                                      |
| Refresh           | `KsIconRefresh`                                          |
| Log / Document    | `KsIconLog`, `KsIconDocumentFile`                        |
| Analytics / Chart | `KsIconChart`, `KsIconAnalytics`                         |
| User / Profile    | `KsIconUser`, `KsIconPeople`                             |
| Star / Favorite   | `KsIconStar`, `KsIconFilledStar`                         |
| Info              | `KsIconInfo`, `KsIconFilledInfo`                         |
| Warning           | `KsIconFilledWarning`, `KsIconFilledCaution`             |
| Success / Check   | `KsIconCheckMark`, `KsIconFilledCheck`                   |
| Error             | `KsIconFilledClose`                                      |
| Play / Pause      | `KsIconPlay`, `KsIconPause`                              |
| More options      | `KsIconMoreHorizontal`, `KsIconMoreVertical`             |
| Filter            | `KsIconFilterApply`                                      |
| Sort              | `KsIconAscend`, `KsIconAscendUp`, `KsIconAscendDown`     |
| Calendar / Date   | `KsIconCalendar`                                         |
| Money / Payment   | `KsIconMoney`, `KsIconCreditCard`, `KsIconWallet`        |
| TikTok logo       | `KsIconTiktok`, `KsIconTiktokBlack`, `KsIconTiktokWhite` |
