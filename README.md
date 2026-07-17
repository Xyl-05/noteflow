# NoteFlow - 创意笔记管理应用

一款简洁优雅的全栈个人笔记管理工具，帮助用户高效记录、整理和管理日常笔记。

## 🌟 项目亮点

- **现代化技术栈**: React 18 + TypeScript + Vite
- **优雅的界面设计**: TailwindCSS 3 + Lucide Icons
- **状态管理**: Zustand 轻量级状态管理
- **RESTful API**: PHP 后端服务
- **数据库**: SQLite 轻量级数据库
- **响应式布局**: 完美适配桌面端和移动端
- **完整的 CRUD 功能**: 创建、读取、更新、删除笔记
- **标签系统**: 智能标签分类管理
- **实时搜索**: 快速过滤笔记内容

## 🛠️ 技术栈

### 前端
- **React 18** - 用户界面框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具
- **TailwindCSS 3** - 实用优先的 CSS 框架
- **React Router DOM** - 客户端路由
- **Zustand** - 轻量级状态管理
- **Lucide React** - 精美的图标库

### 后端
- **PHP 7.4+** - 服务器端脚本语言
- **PDO** - PHP 数据对象（数据库抽象层）

### 数据存储
- **SQLite** - 轻量级嵌入式数据库

## 📁 项目结构

```
noteflow/
├── php-api/                # PHP 后端代码
│   ├── config/             # 配置文件
│   │   └── database.php    # 数据库连接配置
│   ├── data/               # SQLite 数据库文件
│   └── index.php           # API 入口文件（路由处理）
├── src/                    # 前端代码
│   ├── components/         # React 组件
│   │   ├── Navbar.tsx      # 导航栏组件
│   │   ├── Hero.tsx        # 首页英雄区域
│   │   ├── Features.tsx    # 功能展示组件
│   │   ├── NotesList.tsx   # 笔记列表组件
│   │   ├── NoteEditor.tsx  # 笔记编辑器组件
│   │   ├── Contact.tsx     # 联系表单组件
│   │   └── Footer.tsx      # 页脚组件
│   ├── store/              # 状态管理
│   │   └── useNotesStore.ts # Zustand store
│   ├── types.ts            # 前端类型定义
│   ├── App.tsx             # 应用主组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML 模板
├── package.json            # 项目依赖配置
├── vite.config.ts          # Vite 配置（含代理）
├── tailwind.config.js      # TailwindCSS 配置
├── postcss.config.js       # PostCSS 配置
└── tsconfig.json           # 前端 TypeScript 配置
```

## 🚀 快速开始

### 环境要求

- **Node.js** 20.x+
- **PHP** 7.4+（需启用 pdo_sqlite 和 sqlite3 扩展）

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

这将同时启动：
- 前端开发服务器: `http://localhost:5173`
- PHP 后端 API: `http://localhost:8000`

### 单独启动

```bash
# 仅启动前端
npm run dev:frontend

# 仅启动后端
npm run dev:backend
```

### 构建生产版本

```bash
npm run build
```

### 运行构建检查

```bash
npm run check
```

## 📋 API 接口

### 笔记接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/notes` | 获取所有笔记 |
| GET | `/api/notes/:id` | 获取单个笔记 |
| POST | `/api/notes` | 创建新笔记 |
| PUT | `/api/notes/:id` | 更新笔记 |
| DELETE | `/api/notes/:id` | 删除笔记 |

### 联系表单接口

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/contact` | 提交联系表单 |

### 健康检查

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/health` | 检查 API 状态 |

## 🎯 功能特性

1. **首页展示**: Hero 区域展示产品核心价值，Features 区域展示核心功能
2. **笔记列表**: 支持搜索过滤和标签筛选，卡片式布局展示笔记预览
3. **笔记编辑**: 支持创建和编辑笔记，添加和管理标签
4. **联系表单**: 用户反馈收集，表单验证，提交成功提示
5. **响应式设计**: 移动端、平板、桌面端完美适配
6. **动画效果**: 页面加载动画、悬浮效果、按钮交互反馈

## 🎨 设计规范

- **主色调**: 深蓝色 (#1e3a8a) + 薄荷绿 (#10b981)
- **字体**: Inter 现代无衬线字体
- **间距**: 基于 4px 的倍数系统
- **圆角**: 统一使用 rounded-xl

## 📝 开发说明

### 状态管理

使用 Zustand 管理笔记数据状态，支持：
- 获取笔记列表
- 创建新笔记
- 更新笔记
- 删除笔记
- 根据 ID 获取笔记

### 路由配置

```
/           - 首页（Hero + Features）
/notes      - 笔记列表页
/notes/new  - 创建新笔记
/notes/:id  - 编辑现有笔记
/contact    - 联系表单页
```

### 数据模型

```typescript
interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}
```

### 数据库表结构

```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    tags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📄 许可证

MIT License

---

## 🙋‍♂️ 关于开发者

这是一个专为 **前端/全栈实习生岗位** 设计的全栈项目示例，展示了完整的前后端开发能力，包括：

- React 组件化开发
- TypeScript 类型安全
- 状态管理
- PHP RESTful API 设计
- SQLite 数据库操作
- PDO 数据库抽象层
- 响应式布局
- 现代 UI 设计

欢迎在面试中展示此项目！
