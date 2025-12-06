# 半度温差

> 相拥而立,各自成诗。📖

探索情感世界的平衡之道 - 一个关于爱与差异的哲学博客。

## 📖 关于本站

**半度温差**是一个专注于情感、哲学和人生智慧的个人博客,探讨:

- 🌟 关系中的平衡与和谐
- 🧠 中庸之道与人生智慧
- 💝 情感需求与沟通之道
- ⚖️ 世界运行的平衡法则

## 🚀 快速开始

```bash
# 克隆项目(包含主题 submodule)
git clone --recurse-submodules https://github.com/flyfrank/Lillian.git
cd Lillian

# 本地预览
hugo server -D

# 构建网站
hugo -d docs
```

## 🛠️ 技术栈

- **静态网站生成器**: [Hugo](https://gohugo.io/) (v0.128.0+ extended)
- **主题**: [Congo](https://github.com/jpanther/congo) - 基于 Tailwind CSS 的现代化主题
- **部署**: GitHub Pages (从 main 分支的 /docs 目录)
- **CDN**: GitHub Pages 内置

## 📁 项目结构

```
Lillian/
├── config/              # 配置文件目录
│   └── _default/
│       ├── hugo.toml           # 站点基础配置
│       ├── languages.zh-cn.toml # 中文语言配置
│       ├── params.toml         # 主题参数
│       ├── menus.zh-cn.toml    # 菜单配置
│       └── markup.toml         # Markdown 配置
├── content/             # 内容目录
│   ├── posts/          # 博客文章
│   └── about/          # 关于页面
├── static/             # 静态资源
├── themes/             # 主题目录
│   └── congo/          # Congo 主题 (git submodule)
├── docs/               # 构建输出(GitHub Pages 部署源)
├── .gitmodules         # Git submodule 配置
└── DEPLOYMENT.md       # 详细部署文档
```

## ✍️ 写作指南

### 创建新文章

```bash
hugo new posts/my-article/index.md
```

### Front Matter 示例

```yaml
---
title: 文章标题
date: 2025-12-06
tags: [标签1, 标签2]
categories: [分类]
description: 文章简介
---

文章内容...
```

### 控制摘要

方式1: 自动摘要(配置文件设置 `summaryLength = 70`)

方式2: 手动分隔

```markdown
这是摘要内容。

<!--more-->

这是正文内容。
```

## 🎨 主题特性

### Congo 主题亮点

- ✨ **现代设计**: 基于 Tailwind CSS,简洁优雅
- 📱 **完美响应**: 移动端完美适配
- 🔍 **内置搜索**: 客户端全文搜索
- 🎨 **多种配色**: 7+ 配色方案可选
- 🌓 **深色模式**: 自动/手动切换
- 📊 **丰富组件**: Charts, Mermaid, KaTeX 支持
- ⚡ **性能优秀**: 轻量快速
- 🌏 **多语言**: 内置多语言支持

### 配色方案

可在 `params.toml` 中切换:
- `congo` (默认)
- `avocado`
- `cherry`
- `fire`
- `ocean`
- `sapphire`
- `slate`

## 🚢 部署

### 本地构建

```bash
# 构建到 docs 目录
hugo -d docs

# 提交并推送
git add -A
git commit -m "更新博客"
git push origin main
```

### GitHub Pages 设置

- **Source**: Deploy from a branch
- **Branch**: main
- **Folder**: /docs

详细部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔧 主题更新

```bash
# 更新主题到最新 stable 版本
cd themes/congo
git pull origin stable
cd ../..
git add themes/congo
git commit -m "更新主题"
git push
```

## ⚠️ 注意事项

1. **Submodule**: 克隆时必须包含 `--recurse-submodules` 参数
2. **缓存**: GitHub Pages 有 10 分钟 CDN 缓存
3. **日期**: 文章日期不能是未来,否则不会显示
4. **构建目录**: 必须构建到 `docs` 目录

## 📚 资源链接

- **博客地址**: https://lillian.mpoom.cn
- **Congo 主题文档**: https://jpanther.github.io/congo/docs/
- **Hugo 官方文档**: https://gohugo.io/documentation/
- **主题仓库**: https://github.com/jpanther/congo

## 📝 文章列表

- [中庸之道:在平衡中读懂世界的本质](https://lillian.mpoom.cn/posts/zhongyong-wisdom/)
- [关系的升级密码:给她关怀,给他信任,用行动让爱永不消逝](https://lillian.mpoom.cn/posts/emotiona-world-dual-needs/)
- [相信当下的力量](https://lillian.mpoom.cn/posts/believe-in-now/)
- [我们在一起的第一天 · 恋爱纪念日](https://lillian.mpoom.cn/posts/anniversary-2025/)

## 💡 常见问题

### 文章不显示?

- 检查日期是否为未来
- 检查是否标记为 `draft: true`
- 确认 `mainSections` 包含文章分区

### 摘要过长?

- 调整 `summaryLength` 值
- 使用 `<!--more-->` 手动分隔

### 样式问题?

```bash
hugo mod clean
hugo --gc --minify -d docs
```

更多问题请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📄 许可证

本项目内容采用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 许可证。

---

**半度温差** © 2025 - 在生活的此消彼长中,走出一条不疾不徐、恰到好处的人生之路。
