# 💕 我们的爱情时光 - 情侣纪念网站 2.0

一个高端、优雅、互动体验丰富的现代化情侣纪念网站，采用玻璃拟态设计风格和专业级动画效果，为爱情回忆打造数字化博物馆。

![Preview](https://img.shields.io/badge/Version-2.0-pink?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-SPA-blue?style=for-the-badge)
![Design](https://img.shields.io/badge/Design-Glassmorphism-purple?style=for-the-badge)

## ✨ 核心特性

### 🎨 现代化设计
- **玻璃拟态风格**：采用最新的 Glassmorphism 设计趋势
- **双主题系统**：暖调浪漫主题 & 深色奢华主题，支持一键切换
- **高级动画**：GSAP + AOS 专业级交互动画
- **响应式设计**：完美适配桌面端、平板和移动设备

### 🚀 技术架构
- **单页应用（SPA）**：流畅的页面切换体验
- **ES6+ 模块化**：现代化的 JavaScript 架构
- **Vite 构建**：极速的开发和构建体验
- **组件化开发**：易于扩展和维护

### 📱 丰富功能
- **多元化页面**：封面页、时光轴、画廊、详情页、关于页
- **媒体支持**：图片轮播、视频播放、灯箱展示
- **筛选搜索**：按类型、标签筛选回忆
- **数据驱动**：完全基于配置文件的内容管理

## 🛠️ 技术栈

### 核心技术
- **HTML5** - 语义化标记
- **CSS3** - 现代化样式（玻璃拟态、渐变、动画）
- **JavaScript ES6+** - 模块化、异步编程
- **Vite** - 极速构建工具

### 样式框架
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Google Fonts** - 优雅的字体组合
- **自定义 CSS** - 玻璃拟态和高级动画效果

### 动画库
- **GSAP** - 专业级动画引擎
- **AOS** - 滚动触发动画
- **Swiper** - 触摸友好的轮播组件
- **LightGallery** - 精美的图片灯箱

### 开发工具
- **Node.js 16+** - 运行环境
- **npm** - 包管理器
- **PostCSS** - CSS 后处理
- **Autoprefixer** - 自动添加浏览器前缀

## 📦 快速开始

### 环境要求
- Node.js 16.0.0 或更高版本
- npm 7.0.0 或更高版本

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd Lillian
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问网站**
打开浏览器访问：`http://localhost:3000`

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📝 如何添加新纪念日

### 步骤指南

1. **打开数据文件**
   ```
   src/data/events.js
   ```

2. **在 `loveEvents` 数组中添加新对象**
   ```javascript
   {
     id: 'unique-event-id', // 唯一标识符
     type: 'traditional', // traditional | birthday | anniversary | travel | milestone
     
     // 日期信息
     dates: {
       lunar: '正月初一', // 农历日期（可选）
       gregorian: '2024-02-10', // 公历日期
       year: '2024',
       displayDate: '正月初一' // 显示的日期
     },
     
     // 基本信息
     name: '春节',
     title: '第一次一起过年',
     location: '家里', // 可选
     weather: '晴朗', // 可选
     
     // 描述内容
     description: {
       short: '简短描述...',
       long: `详细故事...`,
       highlights: [ // 可选
         '难忘瞬间1',
         '难忘瞬间2'
       ]
     },
     
     // 媒体内容
     media: {
       coverImage: {
         src: '/assets/images/your-cover.jpg',
         alt: '封面图片描述',
         position: 'center' // center | top | bottom
       },
       gallery: [ // 可选
         {
           src: '/assets/images/photo1.jpg',
           alt: '图片描述',
           caption: '图片说明'
         }
       ],
       video: { // 可选
         src: '/assets/videos/video.mp4',
         poster: '/assets/images/video-poster.jpg',
         caption: '视频说明'
       }
     },
     
     // 元数据
     metadata: {
       tags: ['标签1', '标签2'],
       mood: 'joyful', // joyful | romantic | peaceful | excited | nostalgic
       significance: 5, // 1-5 星重要程度
       isPublic: true,
       featured: false, // 是否为精选内容
       createdAt: '2024-02-11',
       updatedAt: '2024-02-11'
     },
     
     // 主题配色
     theme: {
       primary: 'from-red-400 to-pink-400',
       secondary: 'from-red-100 to-pink-100',
       accent: 'red-500'
     }
   }
   ```

3. **添加图片资源**
   - 将图片文件放入 `public/assets/images/` 目录
   - 支持 `.jpg`、`.png`、`.webp` 格式
   - 建议尺寸：封面图 800x600，画廊图片 800x600

4. **保存并刷新**
   - 保存 `events.js` 文件
   - 浏览器会自动刷新显示新内容

### 事件类型说明

| 类型 | 说明 | 图标 | 示例 |
|------|------|------|------|
| `traditional` | 传统节日 | 🎊 | 春节、中秋节、七夕节 |
| `birthday` | 生日庆祝 | 🎂 | 生日派对、生日惊喜 |
| `anniversary` | 纪念日 | 💕 | 恋爱纪念日、特殊日子 |
| `travel` | 旅行足迹 | ✈️ | 旅游、度假、探索 |
| `milestone` | 里程碑 | 🌟 | 重要成就、人生节点 |

### 图片路径规则

```
正确：/assets/images/filename.jpg
错误：/public/assets/images/filename.jpg
错误：./assets/images/filename.jpg
```

## 🎨 主题定制

### 颜色配置

在 `src/styles/main.css` 中修改 CSS 变量：

```css
:root {
  /* 暖调浪漫主题 */
  --warm-bg-primary: #fff1f2;
  --warm-text-primary: #881337;
  
  /* 深色奢华主题 */
  --dark-bg-primary: #0f172a;
  --dark-text-primary: #e2e8f0;
}
```

### Tailwind 颜色

在 `tailwind.config.js` 中扩展颜色：

```javascript
theme: {
  extend: {
    colors: {
      'brand-pink': '#ec4899',
      'brand-purple': '#8b5cf6',
      // 添加更多自定义颜色
    }
  }
}
```

## 📱 页面结构

### 主要页面

- **封面页** (`/hero`) - 欢迎页面，统计信息展示
- **时光轴** (`/timeline`) - 所有回忆的时间线展示
- **画廊页** (`/gallery`) - 图片网格展示和筛选
- **详情页** (`/event/:id`) - 单个事件的详细展示
- **关于页** (`/about`) - 网站介绍和技术栈

### 组件架构

```
src/
├── data/           # 数据配置
│   └── events.js   # 事件数据
├── pages/          # 页面组件
│   ├── HeroPage.js
│   ├── TimelinePage.js
│   ├── GalleryPage.js
│   ├── EventDetailPage.js
│   └── AboutPage.js
├── utils/          # 工具函数
│   └── router.js   # 路由系统
├── styles/         # 样式文件
│   └── main.css    # 主样式
└── main.js         # 应用入口
```

## 🔧 高级配置

### 网站配置

在 `src/data/events.js` 中修改 `siteConfig`：

```javascript
export const siteConfig = {
  title: "我们的爱情时光",
  subtitle: "爱情的数字化博物馆",
  description: "记录我们共同度过的每一个美好瞬间",
  authors: {
    male: "亲爱的他",
    female: "亲爱的她"
  },
  anniversary: {
    startDate: "2023-03-14",
    startDateLunar: "二月廿三"
  },
  theme: {
    default: "warm", // warm | dark
    allowToggle: true
  }
};
```

### 动画配置

修改 `src/main.js` 中的动画设置：

```javascript
// AOS 配置
this.animations.aos.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100
});

// GSAP 默认配置
gsap.defaults({
  duration: 0.8,
  ease: "power2.out"
});
```

## 🌐 部署指南

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 设置构建命令：`npm run build`
3. 设置输出目录：`dist`
4. 部署完成

### Netlify 部署

1. 连接 GitHub 仓库到 Netlify
2. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
3. 部署完成

### 自定义服务器

```bash
# 构建项目
npm run build

# 将 dist 目录内容上传到服务器
# 配置 Web 服务器指向 dist 目录
```

## 🎯 最佳实践

### 图片优化
- 使用现代图片格式（WebP、AVIF）
- 压缩图片文件大小
- 设置合适的图片尺寸
- 使用 `loading="lazy"` 属性

### 性能优化
- 启用 Gzip 压缩
- 使用 CDN 加速
- 优化字体加载
- 减少 JavaScript 包大小

### SEO 优化
- 设置页面标题和描述
- 添加结构化数据
- 优化图片 alt 属性
- 生成 sitemap

## 🚀 扩展功能

### 可添加的功能
- 评论系统
- 分享功能
- 打印样式
- PWA 支持
- 多语言支持
- 数据备份

### 集成建议
- 后端 API（Node.js、Python）
- 数据库（MongoDB、Firebase）
- 文件存储（OSS、S3）
- 统计分析（Google Analytics）

## 📄 浏览器兼容性

| 浏览器 | 支持版本 |
|--------|----------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### 不支持的功能
- Internet Explorer
- 过旧的移动浏览器

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📜 开源协议

MIT License - 详见 [LICENSE](LICENSE) 文件

## 💝 致谢

感谢所有为这个项目做出贡献的开发者和设计师，特别是：

- [GSAP](https://greensock.com/gsap/) - 专业级动画库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Vite](https://vitejs.dev/) - 极速构建工具
- [AOS](https://michalsnik.github.io/aos/) - 滚动动画库

---

💕 **用技术记录爱情，用代码珍藏回忆** 💕

## 🌟 项目特色

- 💖 **充满爱意的设计** - 温馨浪漫的视觉风格，精致的动画效果
- 📱 **完美响应式** - 适配所有设备，从手机到桌面电脑
- 🎨 **现代化技术栈** - 使用 Tailwind CSS、原生 JavaScript 和现代 HTML5
- ⚡ **易于扩展** - 简单的数据配置，轻松添加新的纪念日
- 🔄 **动态筛选** - 按类型筛选不同的节日和纪念日
- 🖼️ **图片展示** - 优雅的图片画廊和模态框展示

## 🚀 快速开始

### 方法一：直接运行

1. 克隆或下载项目到本地
2. 直接用浏览器打开 `index.html` 文件
3. 开始浏览您的爱情回忆！

### 方法二：本地服务器（推荐）

```bash
# 如果你有 Python
python -m http.server 8000

# 如果你有 Node.js
npx serve .

# 如果你有 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 📁 项目结构

```
Lillian/
├── index.html              # 主页面
├── about.html               # 关于页面
├── README.md               # 项目说明文档
├── assets/                 # 静态资源
│   ├── css/
│   │   └── style.css       # 自定义样式
│   ├── js/
│   │   └── script.js       # 主要JavaScript逻辑
│   └── images/             # 图片文件夹（请将图片放在这里）
└── data/
    └── events.js           # 纪念日数据配置文件
```

## 💝 如何添加新的纪念日

这是最重要的部分！添加新纪念日非常简单：

### 步骤1：准备图片

将您的纪念日照片放入 `assets/images/` 文件夹中。推荐使用以下命名规范：

```
assets/images/
├── spring-festival-2024-1.jpg
├── spring-festival-2024-2.jpg
├── birthday-2024.jpg
└── anniversary-2024.jpg
```

### 步骤2：编辑数据文件

打开 `data/events.js` 文件，在 `loveEvents` 数组中添加新的事件对象：

```javascript
const loveEvents = [
  // ... 现有的事件 ...
  
  // 添加您的新纪念日
  {
    id: 9,                                    // 确保ID唯一
    type: 'traditional',                      // 类型：'traditional' | 'birthday' | 'anniversary'
    date: '正月十五',                          // 日期（农历或公历）
    name: '元宵节',                           // 节日名称
    year: '2025',                            // 年份
    title: '我们的元宵节',                     // 这个纪念日的标题
    description: '描述当时的美好回忆...',       // 详细描述
    images: ['lantern-2025-1.jpg', 'lantern-2025-2.jpg'], // 图片文件名数组
    color: 'from-red-300 to-pink-300'        // 卡片渐变色
  }
];
```

### 步骤3：保存并刷新

保存文件后，刷新浏览器即可看到新添加的纪念日！

## 🎨 自定义配置

### 节日类型

支持三种节日类型：

- `traditional` - 传统节日（春节、七夕、中秋等）
- `birthday` - 生日
- `anniversary` - 纪念日（恋爱纪念日、结婚纪念日等）

### 渐变色配置

可用的渐变色选项（Tailwind CSS 类名）：

```javascript
// 粉色系
'from-pink-300 to-rose-300'
'from-rose-300 to-pink-300'

// 紫色系
'from-purple-300 to-indigo-300'
'from-indigo-300 to-purple-300'

// 暖色系
'from-red-300 to-pink-300'
'from-yellow-300 to-orange-300'

// 冷色系
'from-blue-300 to-indigo-300'
'from-green-300 to-teal-300'
```

### 修改网站标题和描述

1. 打开 `index.html` 和 `about.html`
2. 修改 `<title>` 标签中的内容
3. 修改页面中的标题文字

## 🔧 技术栈

- **HTML5** - 语义化的现代HTML结构
- **Tailwind CSS** - 实用优先的CSS框架
- **Vanilla JavaScript** - 原生JavaScript，无依赖
- **Google Fonts** - 优雅的字体（Noto Sans SC、Playfair Display、Dancing Script）

## 📱 响应式特性

网站完美适配：

- 📱 **手机** - 垂直布局，触摸友好的交互
- 📲 **平板** - 优化的中等屏幕布局
- 💻 **桌面** - 完整的双栏时间线布局

## ✨ 功能特性

### 主页功能

- 🎯 **英雄区域** - 震撼的首屏展示
- 📊 **统计信息** - 相伴天数、回忆数量等
- 🔍 **分类筛选** - 按节日类型筛选
- 📱 **移动端菜单** - 响应式导航
- ⬆️ **返回顶部** - 平滑滚动到顶部

### 交互功能

- 🖼️ **图片模态框** - 点击图片查看大图
- 🎭 **平滑动画** - 入场动画和悬停效果
- 📜 **平滑滚动** - 页面内导航平滑滚动
- 🎨 **悬停效果** - 丰富的交互反馈

### 关于页面

- 💕 **爱情故事** - 讲述你们的相遇相知
- 🌟 **网站特色介绍** - 展示网站亮点
- 💝 **感谢页面** - 表达爱意的专页

## 🎯 最佳实践

### 图片优化

- 推荐尺寸：400x300px（4:3比例）
- 格式：JPG 或 PNG
- 大小：每张图片不超过 500KB
- 命名：使用有意义的文件名

### 内容编写

- **标题**：简洁有力，15字以内
- **描述**：真挚动人，50-100字
- **日期**：使用农历或公历，保持一致

## 🚀 部署指南

### GitHub Pages（推荐）

1. 将项目推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 main 分支作为源
4. 访问 `https://你的用户名.github.io/仓库名`

### Netlify

1. 将项目文件夹拖拽到 Netlify
2. 自动部署完成
3. 获得免费的 HTTPS 域名

### Vercel

1. 连接 GitHub 仓库到 Vercel
2. 自动部署和预览
3. 支持自定义域名

## 💡 常见问题

### Q: 图片显示不出来怎么办？

A: 检查以下几点：
1. 图片文件是否放在 `assets/images/` 文件夹中
2. 文件名是否与数据中的名称完全一致（包括大小写）
3. 图片格式是否为 jpg、png 或 gif

### Q: 如何修改网站的颜色主题？

A: 可以在以下位置修改：
1. `assets/css/style.css` - 自定义CSS颜色
2. HTML文件中的 Tailwind 类名
3. 数据文件中每个事件的 `color` 属性

### Q: 可以添加视频吗？

A: 可以！修改 `createImagesHTML` 函数添加视频支持，或直接在描述中添加视频链接。

### Q: 如何自定义字体？

A: 在 HTML 的 Google Fonts 链接中添加新字体，然后在 Tailwind 配置中注册。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目仅供个人使用，请不要用于商业用途。

## 💌 致谢

感谢所有为爱情而努力的人们，愿天下有情人终成眷属！

---

**用心记录，用爱珍藏** ❤️
