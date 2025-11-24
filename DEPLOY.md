# GitHub Pages 部署指南（Hugo）

## 前置条件
- 安装 Hugo（macOS 推荐 Homebrew）：
  - `brew install hugo`
- 本仓库已配置 GitHub Actions 自动部署到 `docs/` 目录。

## 本地构建

### 方式一：使用 Hugo 默认输出（推荐）
```bash
# 构建到默认 public/ 目录
hugo

# 手动复制到 docs/ 用于 GitHub Pages
rm -rf docs/*
cp -r public/* docs/
```

### 方式二：直接构建到 docs/
```bash
hugo -d docs
```

### 本地预览
```bash
hugo server -D -p 8080
```

## 部署到 GitHub Pages（docs 目录）
- Pages 源设置为 `main` 分支的 `/docs` 目录
- 部署流程：
  1. 本地使用 `hugo -d docs` 构建静态文件到 `./docs` 目录
  2. 将 `docs/` 目录提交到 Git 仓库
  3. 推送到 `main/master` 分支
  4. GitHub Pages 自动从 `/docs` 目录读取静态文件进行部署
  - 自定义域名由 `static/CNAME` 文件配置（构建后会复制到 `docs/CNAME`）

## 静态资源
- 将图片等静态文件放入 `static/assets/...`，构建后会复制到发布目录。

## 访问
- 部署完成后访问自定义域名：`https://lillian.mpoom.cn/`