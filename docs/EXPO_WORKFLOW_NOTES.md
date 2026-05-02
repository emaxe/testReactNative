---
title: Expo + React Native — Project Notes & Fixes
date: 2026-05-02
tags: [expo, react-native, cicd, eas, github-actions]
status: active
---

# Expo + React Native — Полная документация проекта

## 1. Общая информация о проекте

- **Название:** testReactNative
- **Репозиторий:** `emaxe/testReactNative` (публичный)
- **Стек:** React Native + Expo SDK 52 + React Navigation (Bottom Tabs)
- **Сборка:** EAS Build через GitHub Actions
- **Платформы:** Android (APK через preview-профиль), iOS (теоретически)

## 2. Структура проекта

```
testReactNative/
├── .github/workflows/build-apk.yml   # GitHub Actions workflow
├── screens/
│   ├── HomeScreen.js                  # Главная с карточками навигации
│   ├── CounterScreen.js               # Демо счётчик с анимацией
│   ├── TodoScreen.js                  # Todo-лист с FlatList
│   ├── FormScreen.js                  # Форма с Picker, Switch, Alert
│   └── ProfileScreen.js             # Профиль со статистикой
├── App.js                             # NavigationContainer + BottomTabNavigator
├── index.js                           # registerRootComponent(App)
├── app.json                           # Expo config (package, EAS projectId, owner)
├── eas.json                           # EAS Build profiles
└── package.json                       # Зависимости (КРИТИЧНО! версии зафиксированы)
```

## 3. Ключевые технические решения и правки

### 3.1 Expo SDK 52 — совместимость версий (КРИТИЧНО)

**Проблема:** При установке последних версий зависимостей (`react-native-screens`, `react-native-safe-area-context`) сборка падает из-за несовместимости с Expo SDK 52.

**Решение — жёсткая фиксация версий, совместимых с SDK 52:**

```json
"react-native": "^0.76.9",
"react-native-safe-area-context": "~4.12.0",
"react-native-screens": "~4.4.0",
"expo-asset": "~11.0.5",
"@react-native-picker/picker": "^2.9.0"
```

> **Важно:** Для Expo SDK 52 использовать ТОЛЬКО тильду (`~`) для пакетов expo-*. Крышечка (`^`) для react-native-пакетов подбирать по таблице совместимости Expo.

### 3.2 Смена скриптов запуска

**Было (не работает для локальной сборки):**
```json
"android": "expo start --android",
"ios": "expo start --ios"
```

**Стало (корректно запускает нативную сборку):**
```json
"android": "expo run:android",
"ios": "expo run:ios"
```

### 3.3 EAS конфигурация

**В `app.json` обязательно добавить:**
```json
"extra": {
  "eas": {
    "projectId": "eb78fc79-0112-47e0-b156-6e405518f1dc"
  }
},
"owner": "emaxe"
```

- `projectId` — создаётся автоматически при `eas init` или в веб-интерфейсе Expo
- `owner` — имя пользователя/организации в Expo

**В `eas.json` — профили сборки:**
```json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": { "buildType": "app-bundle" }
    }
  }
}
```

### 3.4 GitHub Actions Workflow

**Файл:** `.github/workflows/build-apk.yml`

```yaml
name: Build Android APK

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Setup Expo and EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: npm ci

      - name: Build Android APK
        run: eas build --platform android --profile preview --non-interactive
```

**Секреты GitHub (Settings → Secrets and variables → Actions):**
- `EXPO_TOKEN` — генерируется в expo.dev/settings/access-tokens

### 3.5 Иконки табов — эмодзи вместо векторных

**Решение:** Вместо `react-native-vector-icons` или `@expo/vector-icons` используем обычные Unicode-эмодзи. Это:
- Уменьшает размер APK
- Устраняет зависимость от векторных шрифтов
- Работает без дополнительной настройки

```javascript
const icons = {
  Home: '🏠',
  Counter: '🔢',
  Todo: '✅',
  Form: '📝',
  Profile: '👤',
};
```

### 3.6 @react-native-picker/picker

**Проблема:** Стандартный `<Picker>` из React Native устарел в новых версиях.

**Решение:** Установлен `@react-native-picker/picker` и используется `import { Picker } from '@react-native-picker/picker'`.

### 3.7 index.js — registerRootComponent

**Обязательно:** Использовать `registerRootComponent` из Expo, а не `AppRegistry` из React Native напрямую:

```javascript
import { registerRootComponent } from 'expo';
import App from './App';
registerRootComponent(App);
```

Это обеспечивает корректную инициализацию Expo Runtime.

## 4. История коммитов (хронология правок)

| Коммит | Описание | Ключевые изменения |
|--------|----------|-------------------|
| `ddcfea6` | Initial Expo project | Создание package.json, app.json, eas.json, App.js, index.js |
| `8aac3c2` | test | Тестовый файл (удалён позже) |
| `d3989c2` | remove test | Удаление тестового файла |
| `6ce8975` | test github dir | Тест создания `.github/test.yml` (не в workflows) |
| `6c5c130` | test nested | Тест `.github/testdir/nested.yml` (неправильный путь) |
| `9f3c7b6` | test nested | Тест `.github/work/build-apk.yml` (опечатка в пути) |
| `d2d4201` | test nested | Тест `.github/work-flows/build-apk.yml` (опечатка в пути) |
| `077d774` | Create build-apk.yml | **Корректный путь** `.github/workflows/build-apk.yml` |
| `a5f75be` | Add demo screens | Добавлены 5 экранов, навигация, @react-navigation/* |
| `8195a0f` | Configure EAS project | Добавлен `projectId` и `owner` в app.json |
| `1e7bbba` | Fix versions for Expo SDK 52 | Понижение react-native-screens до ~4.4.0, safe-area-context до ~4.12.0, expo-asset ~11.0.5 |
| `22c10f6` | Fix package versions | Понижение @react-native-picker/picker до ^2.9.0, react-native до ^0.76.9 |

> **Вывод:** Директория GitHub Actions — **строго** `.github/workflows/` (с точным написанием). Любые опечатки (`work-flows`, `work`, `testdir`) приводят к тому, что Actions не запускаются.

## 5. Ограничения EAS Build (важно помнить)

- **Бесплатный план:** 30 кредитов/месяц
- **Одна Android-сборка (APK):** ~15 кредитов
- **Итого:** ~2 бесплатные сборки в месяц
- **Решение для неограниченных сборок:** GitHub Actions сам делает сборку APK (через `expo prebuild` + Gradle), без вызова EAS. Или докупить EAS ($29/мес).

## 6. Быстрые команды

```bash
# Локальный запуск
npm start              # Metro bundler
npm run android        # Сборка и запуск на Android (требует эмулятор/устройство)
npm run ios            # Сборка и запуск на iOS (требует macOS + Xcode)

# EAS
npx eas build --platform android --profile preview    # APK
npx eas build --platform android --profile production # AAB (Play Store)
npx eas build --platform ios --profile preview        # iOS (требует Apple Developer)
```

## 7. Чек-лист при создании нового Expo-проекта

- [ ] Установить Expo SDK последней стабильной версии (`~52.0.0`)
- [ ] Проверить таблицу совместимости React Native для данного SDK
- [ ] Зафиксировать версии `react-native-screens`, `react-native-safe-area-context`, `expo-asset` через тильду (`~`)
- [ ] Создать `eas.json` с профилями development / preview / production
- [ ] Зарегистрировать проект в expo.dev, получить `projectId`
- [ ] Добавить `owner` и `projectId` в `app.json`
- [ ] Создать `EXPO_TOKEN` в expo.dev и добавить в GitHub Secrets
- [ ] Workflow разместить **строго** в `.github/workflows/*.yml`
- [ ] Использовать `expo run:android` / `expo run:ios` в package.json скриптах
- [ ] В index.js использовать `registerRootComponent` из expo
- [ ] Для иконок в табах предпочесть эмодзи вместо векторных шрифтов (меньше размер, меньше зависимостей)
