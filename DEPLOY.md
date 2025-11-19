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

## 自动部署（GitHub Actions）
- Pages 源为 GitHub Actions，推送到 `main/master` 自动触发：
  - `.github/workflows/deploy.yml` 使用 Hugo 构建并发布 `./docs`
  - 自定义域名由 `cname: lillian.mpoom.cn` 和 `static/CNAME` 保证

## 静态资源
- 将图片等静态文件放入 `static/assets/...`，构建后会复制到发布目录。

## 访问
- 部署完成后访问自定义域名：`https://lillian.mpoom.cn/`