# 半度温差 · Hugo Book 博客

相拥而立，各自成诗。📖

关于《半度温差》：爱与差异的哲学。这里的文字，是情侣间对生活的温情记录，也是对关系中微妙哲学的探索。我们接受并欣赏彼此那恰到好处的 0.5° 温差，在差异中发现爱意，在思考中温暖彼此。

## 📖 项目简介

基于 Hugo 静态网站生成器与 Book 主题构建的个人博客，用于记录生活感悟与成长思考。

## 🚀 快速开始

### 环境要求

- Hugo v0.146 或更高版本（需要 extended 版本）
- Git

### 安装 Hugo

macOS 推荐使用 Homebrew：

```bash
brew install hugo
```

### 克隆项目

```bash
git clone https://github.com/your-username/Lillian.git
cd Lillian
```

### 本地开发

```bash
# 启动开发服务器（含草稿）
hugo server -D -p 8080

# 访问 http://localhost:8080
# 修改文件后会自动重新加载
```

### 构建部署

```bash
# 构建到 docs/ 目录（用于 GitHub Pages）
hugo -d docs

# 或构建到默认 public/ 目录
hugo
```

## 📝 内容管理

### 创建新文章

```bash
# 在 content/posts/ 目录下创建新文章
hugo new posts/my-article/index.md
```

### 添加图片

将图片放置在 `static/assets/images/` 目录下：

```
static/assets/images/
├── 20250816/
│   ├── 20250816-1.jpg
│   ├── 20250816-2.jpg
│   └── 20250816-3.jpg
└── default-cover.svg
```

在文章中使用图片：

```markdown
![图片描述](/assets/images/20250816/20250816-1.jpg)
*图片说明文字*
```

### 文章 Front Matter 示例

```yaml
---
title: 文章标题
date: 2025-11-19
draft: false
tags: [标签1, 标签2]
categories: [分类]
description: 文章简介
---
```

## 📁 项目结构

```
Lillian/
├── content/              # 内容目录
│   ├── _index.md        # 首页（landing 布局）
│   ├── about.md         # 关于页面
│   └── posts/           # 博客文章
│       ├── _index.md    # 文章列表页
│       ├── anniversary-2025/
│       │   └── index.md
│       └── believe-in-now/
│           └── index.md
├── static/              # 静态资源
│   ├── assets/images/   # 图片资源
│   ├── CNAME           # 自定义域名配置
│   └── favicon.png     # 网站图标
├── themes/book/         # Book 主题（子模块）
├── docs/               # 发布目录（提交到 Git）
├── public/             # 默认构建输出（不提交）
├── hugo.toml           # Hugo 配置文件
└── archetypes/         # 内容模板
    └── default.md
```

## ⚙️ 主题配置

主要配置在 `hugo.toml` 文件中：

```toml
# 基础配置
baseURL = "https://lillian.mpoom.cn/"
languageCode = "zh-cn"
title = "半度温差"
theme = "book"

# Book 主题参数
[params]
BookTheme = "auto"          # light | dark | auto
BookToC = true              # 显示目录
BookSearch = true           # 启用搜索
BookComments = false        # 评论功能
BookDateFormat = "2006年01月02日"

# 禁用 taxonomies（Book 主题推荐）
disableKinds = ["taxonomy", "term"]
```

### 菜单配置

```toml
[menu]
  [[menu.after]]
  name = "首页"
  url = "/"
  weight = 10
  
  [[menu.after]]
  name = "文章"
  url = "/posts/"
  weight = 20
  
  [[menu.after]]
  name = "关于"
  url = "/about/"
  weight = 30
```

## 🎨 主题定制

### 自定义样式

在 `assets/_custom.scss` 中添加自定义样式（需要在项目根目录创建）。

### 自定义模板

在 `layouts/` 目录下创建模板文件可覆盖主题默认模板。

## 🚢 部署

### GitHub Pages 自动部署

项目已配置 GitHub Actions 自动部署：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建到 `docs/` 目录
3. GitHub Pages 从 `docs/` 目录发布
4. 访问 https://lillian.mpoom.cn

### 手动部署

```bash
# 构建到 docs/ 目录
hugo -d docs

# 提交并推送
git add docs/
git commit -m "Update site"
git push
```

### 自定义域名

在 `static/CNAME` 文件中配置域名：

```
lillian.mpoom.cn
```

## 📚 参考资料

- [Hugo 官方文档](https://gohugo.io/documentation/)
- [Book 主题文档](https://github.com/alex-shpak/hugo-book)
- [Markdown 语法指南](https://www.markdownguide.org/)

## 🌐 访问

线上地址：https://lillian.mpoom.cn

## 📄 许可证

MIT License
