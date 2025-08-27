# GitHub Pages 部署指南

## 🚀 部署到 GitHub Pages

### 🔧 路由问题修复

本项目已经解决了常见的SPA在GitHub Pages上的路由问题：

1. **✅ 根路径显示内容**：根路径 `/` 现在会正确显示Hero页面内容
2. **✅ 直接访问子路由**：支持直接访问 `/hero`、`/timeline` 等路径
3. **✅ 404处理**：添加了 `404.html` 文件处理GitHub Pages的SPA路由
4. **✅ 自动重定向**：无效路径会自动重定向到首页

### 方法一：使用 docs 目录（推荐）

1. **构建项目**
   ```bash
   npm run build
   ```

2. **提交 docs 目录到 Git**
   ```bash
   git add docs/
   git commit -m "Build: 更新 GitHub Pages 构建文件"
   git push origin main
   ```

3. **在 GitHub 仓库设置中启用 Pages**
   - 进入仓库设置 (Settings)
   - 找到 Pages 选项
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main" 分支
   - Folder 选择 "/docs"
   - 点击 Save

4. **访问网站**
   - GitHub 会提供一个链接，通常是：
   - `https://[用户名].github.io/[仓库名]/`

### 方法二：使用 GitHub Actions 自动部署

如果您希望自动化部署流程，可以使用已创建的 `.github/workflows/deploy.yml` 文件：

1. **在 GitHub 仓库设置中**
   - 进入 Settings > Pages
   - Source 选择 "GitHub Actions"

2. **推送代码**
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push origin main
   ```

3. **自动构建和部署**
   - 每次推送到 main 分支时，GitHub Actions 会自动构建并部署

### 🔧 配置说明

- **构建输出目录**: `docs/` (已从 `dist/` 更改)
- **静态资源**: 自动复制到 `docs/assets/`
- **合照轮播**: 图片位于 `docs/assets/images/couple-photos/`

### 📁 文件结构

```
docs/
├── index.html                 # 主页面
├── assets/
│   ├── images/               # 图片资源
│   │   ├── couple-photos/    # 合照轮播图片
│   │   └── default-cover.svg # 默认封面
│   ├── *.js                  # JavaScript 文件
│   └── *.css                 # CSS 文件
```

### ⚠️ 注意事项

1. **docs 目录不应被 .gitignore 忽略**（已配置）
2. **每次修改代码后需要重新构建**：`npm run build`
3. **合照图片需要手动添加到 `public/assets/images/couple-photos/`**
4. **确保图片文件命名正确**：photo-1.jpg, photo-2.jpg, photo-3.jpg, photo-4.jpg