# Lillian 博客部署文档

## 项目简介

**半度温差** - 探索情感世界的平衡之道

- 主题: Congo (基于 Tailwind CSS)
- Hugo 版本: v0.128.0+ extended
- 部署方式: GitHub Pages (从 main 分支的 /docs 目录)

## 技术栈

- **静态网站生成器**: Hugo Extended
- **主题**: [Congo](https://github.com/jpanther/congo) (stable 分支)
- **样式框架**: Tailwind CSS
- **部署平台**: GitHub Pages
- **CDN**: GitHub Pages 内置 CDN

## 本地开发

### 环境要求

```bash
# Hugo Extended 版本 0.128.0+
hugo version

# Git (用于管理 submodule)
git version
```

### 初始化项目

```bash
# 克隆仓库(包含 submodule)
git clone --recurse-submodules https://github.com/flyfrank/Lillian.git
cd Lillian

# 如果已克隆,更新 submodule
git submodule update --init --recursive
```

### 本地预览

```bash
# 启动开发服务器
hugo server -D

# 指定端口
hugo server -D -p 8080

# 访问: http://localhost:1313
```

### 构建网站

```bash
# 构建到 docs 目录(用于 GitHub Pages 部署)
hugo -d docs

# 清理并重新构建
hugo --gc --minify -d docs
```

## 内容管理

### 创建新文章

```bash
# 创建新文章(会在 content/posts/ 下创建文件夹)
hugo new posts/my-article/index.md
```

### 文章 Front Matter 示例

```yaml
---
title: 文章标题
date: 2025-12-06
tags: [标签1, 标签2]
categories: [分类]
description: 文章简介,会显示在列表页
---

文章内容...
```

### 摘要控制

Congo 主题支持自动摘要和手动摘要:

1. **自动摘要**: 配置文件中设置 `summaryLength = 70` (字数)
2. **手动摘要**: 在文章中使用 `<!--more-->` 标记分隔

```markdown
---
title: 示例文章
---

这是摘要内容,会显示在列表页。

<!--more-->

这是正文内容,不会在列表页显示。
```

## 配置说明

### 主配置文件结构

```
config/_default/
├── hugo.toml           # 站点基础配置
├── languages.zh-cn.toml  # 中文语言配置
├── markup.toml         # Markdown 渲染配置
├── menus.zh-cn.toml    # 菜单配置
├── module.toml         # Hugo 模块配置(如使用 module 方式)
└── params.toml         # 主题参数配置
```

### 重要配置项

**hugo.toml**:
- `baseURL`: 网站 URL
- `summaryLength`: 摘要长度(字数)
- `theme`: 主题名称

**languages.zh-cn.toml**:
- `title`: 网站标题
- `mainSections`: 主要内容分区(如 ["posts"])
- `[params.author]`: 作者信息

**params.toml**:
- `colorScheme`: 配色方案(congo/avocado/cherry/fire/ocean/sapphire/slate)
- `enableSearch`: 启用搜索
- `[homepage]`: 首页布局配置
- `[article]`: 文章页配置
- `[list]`: 列表页配置

## 部署流程

### GitHub Pages 配置

1. **仓库设置** (已配置):
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /docs

2. **构建并推送**:

```bash
# 1. 构建网站
hugo -d docs

# 2. 提交更改
git add -A
git commit -m "更新博客内容"

# 3. 推送到 GitHub
git push origin main
```

3. **访问网站**: https://lillian.mpoom.cn

### 部署注意事项

1. **Submodule 配置**: `.gitmodules` 文件必须存在且正确,否则 GitHub Pages 无法下载主题
   
   ```ini
   [submodule "themes/congo"]
       path = themes/congo
       url = https://github.com/jpanther/congo.git
       branch = stable
   ```

2. **CDN 缓存**: GitHub Pages 有 10 分钟缓存(`max-age=600`),更新后需等待或强制刷新

3. **.nojekyll 文件**: docs 目录中包含此文件,防止 GitHub Pages 使用 Jekyll 处理

4. **构建目录**: 必须构建到 `docs` 目录,因为 GitHub Pages 配置为从此目录部署

## 主题更新

### 更新 Congo 主题

```bash
# 进入主题目录
cd themes/congo

# 拉取最新的 stable 分支
git pull origin stable

# 返回项目根目录
cd ../..

# 提交更新
git add themes/congo
git commit -m "更新 Congo 主题到最新版本"
git push
```

### 回退主题版本

```bash
cd themes/congo
git checkout <commit-hash>
cd ../..
git add themes/congo
git commit -m "回退主题到特定版本"
git push
```

## 常见问题

### 1. 文章不显示

**检查清单**:
- [ ] 文章日期是否为未来? (检查 `date` 字段)
- [ ] 文章是否标记为 draft? (移除 `draft: true`)
- [ ] 配置的 `mainSections` 是否包含文章所在分区?

### 2. 摘要过长

**解决方案**:
- 在 `hugo.toml` 中调整 `summaryLength` 值
- 在文章中使用 `<!--more-->` 手动控制摘要

### 3. 样式不生效

**解决方案**:
- 清理 Hugo 缓存: `hugo mod clean`
- 重新构建: `hugo --gc --minify -d docs`
- 清除浏览器缓存

### 4. GitHub Pages 404

**检查清单**:
- [ ] `.gitmodules` 文件是否存在?
- [ ] GitHub Pages 设置是否正确? (main 分支, /docs 目录)
- [ ] docs 目录是否已提交到 GitHub?
- [ ] 等待 CDN 缓存更新 (最多 10 分钟)

### 5. Submodule 问题

```bash
# 重新初始化 submodule
git submodule deinit -f themes/congo
git submodule update --init --recursive

# 或重新添加
git submodule add -b stable https://github.com/jpanther/congo.git themes/congo
```

## 主题特性

### Congo 主题优势

✅ **性能优秀**: 基于 Tailwind CSS,体积小,加载快  
✅ **摘要控制**: 自动处理摘要长度,支持手动分隔  
✅ **响应式设计**: 完美适配移动端  
✅ **搜索功能**: 内置客户端搜索(Fuse.js)  
✅ **深色模式**: 自动切换或手动选择  
✅ **多语言支持**: 内置多语言配置  
✅ **SEO 友好**: 完善的 meta 标签和结构化数据  
✅ **丰富组件**: Charts, Mermaid, KaTeX 等

### 与 hugo-book 主题对比

| 特性 | hugo-book | Congo |
|------|-----------|-------|
| 主要用途 | 文档网站 | 博客/个人网站 |
| 摘要控制 | ❌ 需自定义模板 | ✅ 原生支持 |
| 搜索功能 | ✅ FlexSearch | ✅ Fuse.js |
| 配色方案 | 固定 | 7+ 方案可选 |
| 移动端 | 基础支持 | 完美适配 |
| 更新频率 | 较低 | 活跃维护 |

## 备份与恢复

### 备份配置

```bash
# 备份配置文件
cp -r config config.backup
cp hugo.toml.backup hugo.toml.backup.$(date +%Y%m%d)
```

### 恢复配置

```bash
# 从备份恢复
cp -r config.backup config
```

## 联系方式

- **网站**: https://lillian.mpoom.cn
- **仓库**: https://github.com/flyfrank/Lillian
- **主题文档**: https://jpanther.github.io/congo/docs/

---

最后更新: 2025-12-06
