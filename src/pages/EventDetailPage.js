/**
 * 事件详情页面组件
 * 
 * 展示单个纪念日的完整故事、照片轮播和详细信息
 * 支持图片轮播、视频播放和分享功能
 * 
 * @version 2.0
 * @author Love Memorial Team
 */

import { loveEvents, eventTypes, utils } from '../data/events.js';

export default class EventDetailPage {
  constructor(props = {}) {
    this.props = props;
    this.eventId = props.params?.id;
    this.event = null;
    this.swiperInstance = null;
  }

  async render() {
    // 根据ID查找事件
    this.event = loveEvents.find(event => event.id === this.eventId);
    
    if (!this.event) {
      return this.renderNotFound();
    }
    
    return `
      <div class="event-detail-page min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <!-- 返回按钮 -->
        <div class="fixed top-24 left-6 z-30">
          <button id="back-btn" class="glass-morphism w-12 h-12 rounded-full flex items-center justify-center hover-lift">
            <span class="text-xl">←</span>
          </button>
        </div>
        
        <!-- 头部封面区域 -->
        <header class="relative h-screen flex items-center justify-center overflow-hidden">
          ${this.renderHeroSection()}
        </header>
        
        <!-- 内容区域 -->
        <main class="relative z-10 -mt-20">
          <!-- 基本信息卡片 -->
          <section class="container mx-auto px-6 mb-16">
            ${this.renderBasicInfo()}
          </section>
          
          <!-- 详细描述 -->
          <section class="container mx-auto px-6 mb-16">
            ${this.renderDescription()}
          </section>
          
          <!-- 图片画廊 -->
          ${this.event.media?.gallery ? `
            <section class="container mx-auto px-6 mb-16">
              ${this.renderGallery()}
            </section>
          ` : ''}
          
          <!-- 视频内容 -->
          ${this.event.media?.video ? `
            <section class="container mx-auto px-6 mb-16">
              ${this.renderVideo()}
            </section>
          ` : ''}
          
          <!-- 相关回忆 -->
          <section class="container mx-auto px-6 mb-16">
            ${this.renderRelatedEvents()}
          </section>
        </main>
      </div>
    `;
  }

  /**
   * 渲染头部封面区域
   */
  renderHeroSection() {
    const event = this.event;
    const eventType = eventTypes[event.type];
    
    return `
      <!-- 背景图片 -->
      <div class="absolute inset-0">
        <img src="${event.media?.coverImage?.src || '/assets/images/default-bg.jpg'}" 
             alt="${event.media?.coverImage?.alt || event.title}"
             class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      
      <!-- 内容 -->
      <div class="relative z-10 text-center text-white px-6">
        <div class="max-w-4xl mx-auto" data-aos="fade-up">
          <!-- 类型标签 -->
          <div class="inline-flex items-center glass-morphism px-4 py-2 rounded-full mb-6">
            <span class="text-2xl mr-2">${eventType.icon}</span>
            <span class="font-medium">${eventType.name}</span>
          </div>
          
          <!-- 标题 -->
          <h1 class="text-4xl lg:text-6xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
            ${event.title}
          </h1>
          
          <!-- 日期和地点 -->
          <div class="flex flex-col lg:flex-row items-center justify-center gap-6 text-lg mb-8" data-aos="fade-up" data-aos-delay="200">
            <div class="flex items-center glass-morphism px-4 py-2 rounded-full">
              <span class="mr-2">📅</span>
              <span>${event.dates.displayDate} (${event.dates.lunar || event.dates.gregorian})</span>
            </div>
            ${event.location ? `
              <div class="flex items-center glass-morphism px-4 py-2 rounded-full">
                <span class="mr-2">📍</span>
                <span>${event.location}</span>
              </div>
            ` : ''}
            ${event.weather ? `
              <div class="flex items-center glass-morphism px-4 py-2 rounded-full">
                <span class="mr-2">🌤️</span>
                <span>${event.weather}</span>
              </div>
            ` : ''}
          </div>
          
          <!-- 简短描述 -->
          <p class="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">
            ${event.description.short}
          </p>
        </div>
      </div>
      
      <!-- 滚动提示 -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div class="flex flex-col items-center">
          <span class="text-sm opacity-80 mb-2">滚动查看更多</span>
          <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-white/80 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 渲染基本信息
   */
  renderBasicInfo() {
    const event = this.event;
    
    return `
      <div class="glass-morphism rounded-2xl p-8" data-aos="fade-up">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- 核心信息 -->
          <div class="lg:col-span-2">
            <h2 class="text-3xl font-bold text-gradient mb-6">${event.name}</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="flex items-center">
                  <span class="w-8 h-8 bg-gradient-to-r ${event.theme.primary} rounded-full flex items-center justify-center text-white text-sm mr-3">📅</span>
                  <div>
                    <div class="font-medium">日期</div>
                    <div class="text-gray-600 dark:text-gray-400">${event.dates.displayDate}</div>
                  </div>
                </div>
                
                ${event.location ? `
                  <div class="flex items-center">
                    <span class="w-8 h-8 bg-gradient-to-r ${event.theme.primary} rounded-full flex items-center justify-center text-white text-sm mr-3">📍</span>
                    <div>
                      <div class="font-medium">地点</div>
                      <div class="text-gray-600 dark:text-gray-400">${event.location}</div>
                    </div>
                  </div>
                ` : ''}
                
                ${event.weather ? `
                  <div class="flex items-center">
                    <span class="w-8 h-8 bg-gradient-to-r ${event.theme.primary} rounded-full flex items-center justify-center text-white text-sm mr-3">🌤️</span>
                    <div>
                      <div class="font-medium">天气</div>
                      <div class="text-gray-600 dark:text-gray-400">${event.weather}</div>
                    </div>
                  </div>
                ` : ''}
              </div>
              
              <div class="space-y-4">
                <div class="flex items-center">
                  <span class="w-8 h-8 bg-gradient-to-r ${event.theme.primary} rounded-full flex items-center justify-center text-white text-sm mr-3">⭐</span>
                  <div>
                    <div class="font-medium">重要程度</div>
                    <div class="flex">
                      ${Array.from({length: 5}, (_, i) => 
                        `<span class="${i < event.metadata.significance ? 'text-yellow-400' : 'text-gray-300'}"">⭐</span>`
                      ).join('')}
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <span class="w-8 h-8 bg-gradient-to-r ${event.theme.primary} rounded-full flex items-center justify-center text-white text-sm mr-3">😊</span>
                  <div>
                    <div class="font-medium">心情</div>
                    <div class="text-gray-600 dark:text-gray-400">${this.getMoodText(event.metadata.mood)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 标签云 -->
          <div>
            <h3 class="text-xl font-bold mb-4">相关标签</h3>
            <div class="flex flex-wrap gap-2">
              ${event.metadata.tags.map(tag => `
                <span class="px-3 py-1 bg-gradient-to-r ${event.theme.secondary} rounded-full text-sm font-medium">
                  #${tag}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 渲染详细描述
   */
  renderDescription() {
    const event = this.event;
    
    return `
      <div class="glass-morphism rounded-2xl p-8" data-aos="fade-up" data-aos-delay="100">
        <h2 class="text-3xl font-bold text-gradient mb-8">💝 完整故事</h2>
        
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <div class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
            ${event.description.long}
          </div>
        </div>
        
        ${event.description.highlights ? `
          <div class="mt-8 p-6 bg-gradient-to-r ${event.theme.secondary} rounded-xl">
            <h3 class="text-xl font-bold text-gradient mb-4">✨ 难忘瞬间</h3>
            <ul class="space-y-3">
              ${event.description.highlights.map(highlight => `
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-gradient-to-r ${event.theme.primary} rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span class="text-gray-700 dark:text-gray-300">${highlight}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * 渲染图片画廊 - 创意艺术展示
   */
  renderGallery() {
    const gallery = this.event.media.gallery;
    
    return `
      <div class="glass-morphism rounded-2xl p-8" data-aos="fade-up" data-aos-delay="200">
        <h2 class="text-3xl font-bold text-gradient mb-8 flex items-center">
          <span class="mr-3">🎨</span>
          创意画廊
          <span class="ml-4 text-sm font-normal text-gray-500 bg-gradient-to-r ${this.event.theme.secondary} px-3 py-1 rounded-full">
            ${gallery.length} 张艺术作品
          </span>
        </h2>
        
        <!-- 创意瀑布流展示 -->
        <div class="creative-waterfall-gallery mb-8">
          <!-- 主视觉焦点区域 -->
          <div class="hero-showcase mb-8" data-aos="zoom-in">
            <div class="relative group">
              <!-- 主图容器 -->
              <div class="main-focal-image relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-700">
                <div class="aspect-[21/9] bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-800 dark:to-gray-700">
                  <img src="${gallery[0]?.src}" 
                       alt="${gallery[0]?.alt}"
                       class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 cursor-pointer"
                       onclick="openImageModal('${gallery[0]?.src}', '${gallery[0]?.alt}', '${gallery[0]?.caption || ''}')">
                </div>
                
                <!-- 动态光晕效果 -->
                <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <!-- 焦点图说明 - 始终可见 -->
                ${gallery[0]?.caption ? `
                  <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div class="max-w-3xl mx-auto text-center">
                      <p class="text-white text-lg font-medium mb-2">${gallery[0].caption}</p>
                      <div class="flex items-center justify-center space-x-4 text-sm text-white/80">
                        <span class="flex items-center"><span class="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></span>主焦点</span>
                        <span class="flex items-center"><span class="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>精选</span>
                      </div>
                    </div>
                  </div>
                ` : ''}
                
                <!-- 装饰性标签 -->
                <div class="absolute top-6 right-6 flex items-center space-x-2">
                  <div class="px-3 py-1 bg-gradient-to-r ${this.event.theme.primary} text-white rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                    💎 镇馆之作
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 创意拼贴瀑布流 -->
          <div class="waterfall-masonry" data-aos="fade-up" data-aos-delay="300">
            ${this.renderCreativeWaterfall(gallery.slice(1))}
          </div>
        </div>
        
        <!-- 交互式故事轮播 -->
        <div class="story-carousel mb-6" data-aos="fade-up" data-aos-delay="400">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
            <span class="mr-2">📖</span>
            照片故事线
            <span class="ml-auto text-sm text-gray-500">每张照片都有它的故事</span>
          </h3>
          
          <!-- 横向故事卷轴 -->
          <div class="swiper story-swiper rounded-2xl overflow-hidden">
            <div class="swiper-wrapper">
              ${gallery.map((image, index) => `
                <div class="swiper-slide">
                  <div class="story-card relative group cursor-pointer gallery-thumb" data-index="${index}">
                    <div class="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                      <img src="${image.src}" 
                           alt="${image.alt}"
                           class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110">
                      
                      <!-- 故事卡片信息层 -->
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                        <!-- 始终可见的标题 -->
                        <div class="absolute bottom-4 left-4 right-4">
                          <div class="text-white">
                            <h4 class="font-semibold text-sm mb-1">${image.alt}</h4>
                            <!-- 悬停时显示的详细说明 -->
                            ${image.caption ? `<p class="text-xs opacity-0 group-hover:opacity-90 transition-opacity duration-300 line-clamp-2">${image.caption}</p>` : ''}
                          </div>
                        </div>
                      </div>
                      
                      <!-- 序号标识 -->
                      <div class="absolute top-3 left-3 w-8 h-8 bg-gradient-to-r ${this.event.theme.primary} text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        ${index + 1}
                      </div>
                      
                      <!-- 交互提示 -->
                      <div class="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span class="text-white text-xs">👁️</span>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <!-- 故事轮播导航 -->
            <div class="swiper-button-next story-nav-next !text-pink-500 !text-xl"></div>
            <div class="swiper-button-prev story-nav-prev !text-pink-500 !text-xl"></div>
            
            <!-- 故事进度条 -->
            <div class="swiper-scrollbar !bg-gray-200 dark:!bg-gray-700 !h-1 !rounded-full !opacity-60">
              <div class="!bg-gradient-to-r ${this.event.theme.primary} !rounded-full"></div>
            </div>
          </div>
        </div>
        
        <!-- 智能操作面板 -->
        <div class="smart-gallery-actions p-6 bg-gradient-to-r from-pink-50/80 via-white/50 to-purple-50/80 dark:from-gray-800/80 dark:via-gray-700/50 dark:to-gray-600/80 rounded-2xl backdrop-blur-sm border border-white/20">
          <div class="flex flex-wrap items-center justify-between gap-6">
            <!-- 统计信息 -->
            <div class="flex items-center space-x-6 text-sm">
              <div class="flex items-center text-gray-600 dark:text-gray-400">
                <div class="w-3 h-3 bg-gradient-to-r ${this.event.theme.primary} rounded-full mr-2 animate-pulse"></div>
                <span class="font-medium">${gallery.length}</span>
                <span class="ml-1">张回忆</span>
              </div>
              <div class="flex items-center text-gray-600 dark:text-gray-400">
                <span class="text-yellow-400 mr-1">✨</span>
                <span>创意布局</span>
              </div>
              <div class="flex items-center text-gray-600 dark:text-gray-400">
                <span class="text-purple-400 mr-1">🎨</span>
                <span>艺术展示</span>
              </div>
            </div>
            
            <!-- 操作按钮组 -->
            <div class="flex items-center space-x-3">
              <button class="gallery-shuffle-btn px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all" onclick="shuffleGallery()">
                <span class="mr-1">🔀</span>随机排列
              </button>
              <button class="gallery-fullscreen-btn px-4 py-2 bg-gradient-to-r ${this.event.theme.primary} text-white rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all" onclick="openGalleryFullscreen()">
                <span class="mr-1">🔍</span>沉浸模式
              </button>
              <button class="gallery-slideshow-btn px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all" onclick="startSlideshow()">
                <span class="mr-1">▶️</span>自动播放
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * 渲染创意瀑布流布局
   */
  renderCreativeWaterfall(images) {
    if (images.length === 0) return '';
    
    // 创建多种艺术布局模式
    const artLayouts = [
      // 不对称网格
      {
        name: 'asymmetric',
        pattern: 'grid-cols-4 grid-rows-3 gap-3',
        positions: [
          { span: 'col-span-2 row-span-2', aspect: 'aspect-[4/3]' },
          { span: 'col-span-1 row-span-1', aspect: 'aspect-square' },
          { span: 'col-span-1 row-span-1', aspect: 'aspect-square' },
          { span: 'col-span-2 row-span-1', aspect: 'aspect-[2/1]' },
          { span: 'col-span-1 row-span-1', aspect: 'aspect-[3/4]' },
          { span: 'col-span-1 row-span-1', aspect: 'aspect-[3/4]' }
        ]
      },
      // 杂志风格
      {
        name: 'magazine',
        pattern: 'grid-cols-6 grid-rows-4 gap-2',
        positions: [
          { span: 'col-span-3 row-span-3', aspect: 'aspect-[3/4]' },
          { span: 'col-span-3 row-span-2', aspect: 'aspect-[3/2]' },
          { span: 'col-span-2 row-span-1', aspect: 'aspect-[2/1]' },
          { span: 'col-span-1 row-span-1', aspect: 'aspect-square' },
          { span: 'col-span-2 row-span-1', aspect: 'aspect-[2/1]' },
          { span: 'col-span-1 row-span-1', aspect: 'aspect-square' }
        ]
      },
      // 蒙德里安风格
      {
        name: 'mondrian',
        pattern: 'grid-cols-5 grid-rows-5 gap-1',
        positions: [
          { span: 'col-span-2 row-span-3', aspect: 'aspect-[2/3]' },
          { span: 'col-span-1 row-span-2', aspect: 'aspect-[1/2]' },
          { span: 'col-span-2 row-span-2', aspect: 'aspect-square' },
          { span: 'col-span-1 row-span-1', aspect: 'aspect-square' },
          { span: 'col-span-2 row-span-2', aspect: 'aspect-square' },
          { span: 'col-span-1 row-span-2', aspect: 'aspect-[1/2]' }
        ]
      }
    ];
    
    // 根据图片数量选择布局
    const layoutIndex = images.length % artLayouts.length;
    const selectedLayout = artLayouts[layoutIndex];
    
    return `
      <div class="creative-waterfall-container">
        <!-- 主要艺术网格 -->
        <div class="art-grid grid ${selectedLayout.pattern} mb-6" data-layout="${selectedLayout.name}">
          ${images.slice(0, 6).map((image, index) => {
            const position = selectedLayout.positions[index] || selectedLayout.positions[0];
            const delay = (index + 1) * 150;
            
            return `
              <div class="art-piece ${position.span} group cursor-pointer" 
                   data-aos="fade-up" 
                   data-aos-delay="${delay}"
                   data-aos-anchor-placement="top-bottom">
                <div class="relative ${position.aspect} overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-rotate-1">
                  <img src="${image.src}" 
                       alt="${image.alt}"
                       class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                       onclick="openImageModal('${image.src}', '${image.alt}', '${image.caption || ''}')">
                  
                  <!-- 艺术滤镜效果 -->
                  <div class="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <!-- 创意信息显示层 -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <!-- 文字信息区域 -->
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                      <div class="text-white transform transition-all duration-300">
                        <h4 class="font-semibold text-sm mb-1 opacity-90 group-hover:opacity-100">${image.alt}</h4>
                        ${image.caption ? `<p class="text-xs opacity-0 group-hover:opacity-90 transition-opacity duration-300 line-clamp-2">${image.caption}</p>` : ''}
                        <div class="flex items-center mt-2 text-xs opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                          <span class="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></span>
                          第 ${index + 2} 幅作品
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 装饰性几何边框 -->
                  <div class="absolute inset-0 border-2 border-white/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <!-- 创意标签 -->
                  <div class="absolute top-3 right-3 flex items-center space-x-1">
                    <div class="w-6 h-6 bg-gradient-to-r ${this.event.theme.primary} text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                      ${index + 2}
                    </div>
                    <div class="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span class="text-white text-xs">🎨</span>
                    </div>
                  </div>
                  
                  <!-- 互动光标提示 -->
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <span class="text-white text-lg">👁️</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        
        <!-- 溢出图片的极简展示 -->
        ${images.length > 6 ? `
          <div class="overflow-gallery mt-8" data-aos="fade-up" data-aos-delay="700">
            <h4 class="text-md font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
              <span class="mr-2">✨</span>
              更多精彩瞬间 (${images.length - 6} 张)
              <span class="ml-auto text-sm text-gray-500">简约展示</span>
            </h4>
            
            <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              ${images.slice(6).map((image, index) => `
                <div class="overflow-item group cursor-pointer" data-aos="zoom-in" data-aos-delay="${(index + 1) * 100}">
                  <div class="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <img src="${image.src}" 
                         alt="${image.alt}"
                         class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                         onclick="openImageModal('${image.src}', '${image.alt}', '${image.caption || ''}')">
                    
                    <!-- 简约遮罩 -->
                    <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div class="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                        <span class="text-gray-700 text-xs">🔍</span>
                      </div>
                    </div>
                    
                    <!-- 序号 -->
                    <div class="absolute bottom-1 right-1 w-5 h-5 bg-gradient-to-r ${this.event.theme.primary} text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ${index + 7}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- 布局切换提示 -->
        <div class="layout-info mt-6 text-center" data-aos="fade-up" data-aos-delay="800">
          <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-full text-sm text-gray-600 dark:text-gray-400">
            <span class="mr-2">🎨</span>
            当前布局: ${selectedLayout.name === 'asymmetric' ? '不对称艺术' : selectedLayout.name === 'magazine' ? '杂志风格' : '蒙德里安'}
            <span class="ml-2 text-xs opacity-75">刷新页面体验不同布局</span>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * 渲染马赛克拼贴网格 - 保留作为后备方案
   */
  renderMosaicGrid(images) {
    if (images.length === 0) return '';
    
    // 创建不规则的拼贴布局
    const layouts = [
      // 2张图片的布局
      { pattern: 'grid-cols-2', sizes: ['aspect-square', 'aspect-[4/3]'] },
      // 3张图片的布局
      { pattern: 'grid-cols-3', sizes: ['aspect-[3/4]', 'aspect-square', 'aspect-[4/3]'] },
      // 4张图片的布局
      { pattern: 'grid-cols-2 grid-rows-2', sizes: ['aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-square'] }
    ];
    
    const layout = layouts[Math.min(images.length - 1, layouts.length - 1)];
    
    return `
      <div class="mosaic-container grid ${layout.pattern} gap-4" data-aos="fade-up" data-aos-delay="400">
        ${images.slice(0, 4).map((image, index) => {
          const size = layout.sizes[index] || 'aspect-square';
          const delay = (index + 1) * 100;
          
          return `
            <div class="mosaic-item group cursor-pointer" data-aos="flip-left" data-aos-delay="${delay}">
              <div class="relative ${size} rounded-xl overflow-hidden shadow-lg transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500">
                <img src="${image.src}" 
                     alt="${image.alt}"
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     onclick="openImageModal('${image.src}', '${image.alt}', '${image.caption || ''}')">
                
                <!-- 创意遮罩效果 -->
                <div class="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- 图片信息浮层 -->
                ${image.caption ? `
                  <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p class="text-white text-sm font-medium line-clamp-2">${image.caption}</p>
                  </div>
                ` : ''}
                
                <!-- 装饰性边框 -->
                <div class="absolute inset-0 border-2 border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- 图片标签 -->
                <div class="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                  ${index + 2}
                </div>
              </div>
            </div>
          `;
        }).join('')}
        
        <!-- 更多图片提示 -->
        ${images.length > 4 ? `
          <div class="more-images-hint col-span-full mt-4 text-center" data-aos="fade-up" data-aos-delay="600">
            <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r ${this.event.theme.secondary} rounded-full text-sm text-gray-600 dark:text-gray-400">
              <span class="mr-2">✨</span>
              还有 ${images.length - 4} 张照片在缩略图中
              <span class="ml-2">👇</span>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * 渲染视频内容
   */
  renderVideo() {
    const video = this.event.media.video;
    
    return `
      <div class="glass-morphism rounded-2xl p-8" data-aos="fade-up" data-aos-delay="300">
        <h2 class="text-3xl font-bold text-gradient mb-8">🎬 珍贵视频</h2>
        
        <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
          <video controls 
                 poster="${video.poster}"
                 class="w-full h-full object-cover">
            <source src="${video.src}" type="video/mp4">
            您的浏览器不支持视频播放。
          </video>
        </div>
        
        ${video.caption ? `
          <p class="text-center text-gray-600 dark:text-gray-400 mt-4 italic">${video.caption}</p>
        ` : ''}
      </div>
    `;
  }

  /**
   * 渲染相关回忆
   */
  renderRelatedEvents() {
    const relatedEvents = loveEvents
      .filter(event => event.id !== this.eventId && event.type === this.event.type)
      .slice(0, 3);
    
    if (relatedEvents.length === 0) return '';
    
    return `
      <div class="glass-morphism rounded-2xl p-8" data-aos="fade-up" data-aos-delay="400">
        <h2 class="text-3xl font-bold text-gradient mb-8">🔗 相关回忆</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          ${relatedEvents.map(event => `
            <a href="/event/${event.id}" class="block group">
              <div class="glass-morphism rounded-xl overflow-hidden hover-lift">
                <div class="aspect-video bg-gray-100 dark:bg-gray-800">
                  <img src="${event.media?.coverImage?.src || '/assets/images/default-cover.jpg'}" 
                       alt="${event.media?.coverImage?.alt || event.title}"
                       class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="p-4">
                  <h3 class="font-bold text-gradient mb-2">${event.title}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${event.dates.displayDate}</p>
                  <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">${event.description.short}</p>
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * 渲染404页面
   */
  renderNotFound() {
    return `
      <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div class="text-center">
          <div class="text-8xl mb-6">😢</div>
          <h1 class="text-4xl font-bold text-gradient mb-4">回忆未找到</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-8">抱歉，我们找不到您要查看的回忆。</p>
          <a href="/timeline" class="btn-primary inline-flex items-center">
            返回时光轴
          </a>
        </div>
      </div>
    `;
  }

  /**
   * 获取心情文本
   */
  getMoodText(mood) {
    const moodMap = {
      joyful: '😄 快乐',
      romantic: '💕 浪漫',
      peaceful: '😌 平静',
      excited: '🤩 兴奋',
      nostalgic: '😊 怀念'
    };
    return moodMap[mood] || '😊 美好';
  }

  /**
   * 页面挂载后的初始化
   */
  async mount() {
    // 初始化AOS动画
    if (window.AOS) {
      window.AOS.refresh();
    }
    
    // 返回按钮事件
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.history.back();
      });
    }
    
    // 初始化图片轮播（如果有Swiper库）
    this.initSwiper();
    
    // 绑定缩略图点击事件
    this.bindThumbnailEvents();
    
    // 添加全局图片模态框函数
    window.openImageModal = this.openImageModal.bind(this);
    
    // 添加创意画廊的额外功能
    window.shuffleGallery = this.shuffleGallery.bind(this);
    window.openGalleryFullscreen = this.openGalleryFullscreen.bind(this);
    window.startSlideshow = this.startSlideshow.bind(this);
  }

  /**
   * 初始化Swiper轮播
   */
  initSwiper() {
    // 初始化故事轮播组件
    if (typeof window.Swiper !== 'undefined' && document.querySelector('.story-swiper')) {
      this.storySwiperInstance = new window.Swiper('.story-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.story-nav-next',
          prevEl: '.story-nav-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
          dragSize: 50
        },
        keyboard: {
          enabled: true,
        },
        // 使用渐变过渡效果
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        // 响应式配置
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 25
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30
          }
        },
        // 性能优化
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2
        },
        // 事件监听
        on: {
          slideChange: function () {
            const activeIndex = this.realIndex;
            // 更新故事卡片的选中状态
            const storyCards = document.querySelectorAll('.story-card');
            storyCards.forEach((card, index) => {
              if (index === activeIndex) {
                card.classList.add('active');
                card.style.transform = 'scale(1.05)';
                card.style.zIndex = '20';
              } else {
                card.classList.remove('active');
                card.style.transform = 'scale(1)';
                card.style.zIndex = '1';
              }
            });
          },
          transitionStart: function() {
            // 转场动画开始时的效果
            this.slides.forEach(slide => {
              const img = slide.querySelector('img');
              if (img) {
                img.style.filter = 'brightness(0.8) contrast(1.1)';
              }
            });
          },
          transitionEnd: function() {
            // 转场动画结束时恢复
            this.slides.forEach(slide => {
              const img = slide.querySelector('img');
              if (img) {
                img.style.filter = 'brightness(1) contrast(1)';
              }
            });
          }
        }
      });
    }
    
    // 初始化原有的图片轮播（如果存在）
    if (typeof window.Swiper !== 'undefined' && document.querySelector('.gallery-swiper')) {
      this.swiperInstance = new window.Swiper('.gallery-swiper', {
        loop: true,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          renderBullet: function (index, className) {
            return '<span class="' + className + ' !bg-pink-400 !w-3 !h-3 !opacity-60 hover:!opacity-100 !transition-all"></span>';
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        keyboard: {
          enabled: true,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
        },
        breakpoints: {
          640: {
            touchRatio: 1.5
          },
          768: {
            touchRatio: 1.2
          }
        },
        on: {
          slideChange: function () {
            const activeIndex = this.realIndex;
            const thumbnails = document.querySelectorAll('.gallery-thumb');
            thumbnails.forEach((thumb, index) => {
              if (index === activeIndex) {
                thumb.classList.add('active');
                thumb.style.transform = 'scale(1.1)';
                thumb.style.zIndex = '10';
              } else {
                thumb.classList.remove('active');
                thumb.style.transform = 'scale(1)';
                thumb.style.zIndex = '1';
              }
            });
          }
        }
      });
    }
  }

  /**
   * 绑定缩略图事件
   */
  bindThumbnailEvents() {
    document.querySelectorAll('.gallery-thumb').forEach((thumb, thumbnailIndex) => {
      thumb.addEventListener('click', () => {
        const index = parseInt(thumb.dataset.index);
        
        // 更新 Swiper 到对应的幻灯片
        if (this.swiperInstance) {
          this.swiperInstance.slideTo(index);
        }
        
        // 添加点击反馈动画
        thumb.style.transform = 'scale(0.95)';
        setTimeout(() => {
          thumb.style.transform = 'scale(1.1)';
        }, 150);
        
        // 更新所有缩略图的选中状态
        document.querySelectorAll('.gallery-thumb').forEach((otherThumb, otherIndex) => {
          if (otherIndex === thumbnailIndex) {
            otherThumb.classList.add('active');
            otherThumb.style.zIndex = '10';
          } else {
            otherThumb.classList.remove('active');
            otherThumb.style.transform = 'scale(1)';
            otherThumb.style.zIndex = '1';
          }
        });
        
        // 添加轻微的震动反馈（如果支持）
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      });
      
      // 添加鼠标悬停效果
      thumb.addEventListener('mouseenter', () => {
        if (!thumb.classList.contains('active')) {
          thumb.style.transform = 'scale(1.05)';
        }
      });
      
      thumb.addEventListener('mouseleave', () => {
        if (!thumb.classList.contains('active')) {
          thumb.style.transform = 'scale(1)';
        }
      });
    });
    
    // 初始化时设置第一个缩略图为激活状态
    const firstThumb = document.querySelector('.gallery-thumb');
    if (firstThumb) {
      firstThumb.classList.add('active');
      firstThumb.style.transform = 'scale(1.1)';
      firstThumb.style.zIndex = '10';
    }
  }

  /**
   * 打开图片模态框
   */
  openImageModal(src, alt, caption) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="relative max-w-6xl max-h-full">
        <img src="${src}" alt="${alt}" class="max-w-full max-h-full object-contain rounded-lg">
        <button class="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors text-xl">
          ✕
        </button>
        ${caption ? `
          <div class="absolute bottom-4 left-4 right-4 text-center">
            <p class="text-white bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 inline-block max-w-lg">${caption}</p>
          </div>
        ` : ''}
      </div>
    `;
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.textContent === '✕') {
        document.body.removeChild(modal);
      }
    });
    
    document.body.appendChild(modal);
  }
  
  /**
   * 随机打乱画廊布局
   */
  shuffleGallery() {
    const artGrid = document.querySelector('.art-grid');
    if (!artGrid) return;
    
    const artPieces = Array.from(artGrid.querySelectorAll('.art-piece'));
    const layouts = ['asymmetric', 'magazine', 'mondrian'];
    const currentLayout = artGrid.getAttribute('data-layout');
    
    // 选择下一个布局
    const nextLayout = layouts[(layouts.indexOf(currentLayout) + 1) % layouts.length];
    
    // 添加过渡动画
    artGrid.style.opacity = '0.3';
    artGrid.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      artGrid.setAttribute('data-layout', nextLayout);
      
      // 重新设置网格类
      const layoutConfigs = {
        asymmetric: 'grid-cols-4 grid-rows-3 gap-3',
        magazine: 'grid-cols-6 grid-rows-4 gap-2',
        mondrian: 'grid-cols-5 grid-rows-5 gap-1'
      };
      
      artGrid.className = `art-grid grid ${layoutConfigs[nextLayout]}`;
      artGrid.setAttribute('data-layout', nextLayout);
      
      // 恢复动画
      artGrid.style.opacity = '1';
      artGrid.style.transform = 'scale(1)';
      
      // 更新布局提示文字
      const layoutInfo = document.querySelector('.layout-info div span');
      if (layoutInfo) {
        const layoutNames = {
          asymmetric: '不对称艺术',
          magazine: '杂志风格',
          mondrian: '蒙德里安'
        };
        layoutInfo.textContent = `当前布局: ${layoutNames[nextLayout]}`;
      }
    }, 300);
  }
  
  /**
   * 打开全屏浏览模式
   */
  openGalleryFullscreen() {
    const gallery = this.event.media.gallery;
    if (!gallery || gallery.length === 0) return;
    
    const fullscreenModal = document.createElement('div');
    fullscreenModal.className = 'fixed inset-0 bg-black z-50 flex items-center justify-center';
    fullscreenModal.innerHTML = `
      <div class="relative w-full h-full">
        <!-- 全屏 Swiper -->
        <div class="swiper fullscreen-swiper w-full h-full">
          <div class="swiper-wrapper">
            ${gallery.map((image, index) => `
              <div class="swiper-slide flex items-center justify-center">
                <div class="relative max-w-full max-h-full">
                  <img src="${image.src}" 
                       alt="${image.alt}"
                       class="max-w-full max-h-full object-contain">
                  ${image.caption ? `
                    <div class="absolute bottom-4 left-4 right-4 text-center">
                      <p class="text-white bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 inline-block max-w-lg">${image.caption}</p>
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- 全屏导航 -->
          <div class="swiper-button-next !text-white !text-2xl"></div>
          <div class="swiper-button-prev !text-white !text-2xl"></div>
          
          <!-- 全屏分页器 -->
          <div class="swiper-pagination !bottom-8"></div>
        </div>
        
        <!-- 关闭按钮 -->
        <button class="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors text-xl z-10 fullscreen-close">
          ✕
        </button>
        
        <!-- 信息面板 -->
        <div class="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white z-10">
          <div class="flex items-center space-x-4 text-sm">
            <span>🎨 创意画廊</span>
            <span>📷 ${gallery.length} 张</span>
            <span>🔍 沉浸模式</span>
          </div>
        </div>
      </div>
    `;
    
    // 添加事件监听
    const closeBtn = fullscreenModal.querySelector('.fullscreen-close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(fullscreenModal);
    });
    
    fullscreenModal.addEventListener('click', (e) => {
      if (e.target === fullscreenModal) {
        document.body.removeChild(fullscreenModal);
      }
    });
    
    document.body.appendChild(fullscreenModal);
    
    // 初始化全屏Swiper
    if (typeof window.Swiper !== 'undefined') {
      new window.Swiper('.fullscreen-swiper', {
        loop: true,
        keyboard: {
          enabled: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + ' !bg-white !w-3 !h-3 !opacity-60 hover:!opacity-100 !transition-all"></span>';
          }
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      });
    }
  }
  
  /**
   * 开始幻灯片模式
   */
  startSlideshow() {
    const gallery = this.event.media.gallery;
    if (!gallery || gallery.length === 0) return;
    
    let currentIndex = 0;
    const slideshowModal = document.createElement('div');
    slideshowModal.className = 'fixed inset-0 bg-black z-50 flex items-center justify-center';
    
    const showSlide = () => {
      const image = gallery[currentIndex];
      slideshowModal.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center">
          <img src="${image.src}" 
               alt="${image.alt}"
               class="max-w-full max-h-full object-contain transition-opacity duration-1000">
          
          ${image.caption ? `
            <div class="absolute bottom-8 left-8 right-8 text-center">
              <p class="text-white text-lg bg-black/50 backdrop-blur-sm rounded-lg px-6 py-4 inline-block max-w-2xl">${image.caption}</p>
            </div>
          ` : ''}
          
          <!-- 控制面板 -->
          <div class="absolute top-6 left-6 right-6 flex items-center justify-between">
            <div class="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
              <div class="flex items-center space-x-4 text-sm">
                <span>▶️ 幻灯片</span>
                <span>${currentIndex + 1} / ${gallery.length}</span>
                <span class="slideshow-timer">●</span>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <button class="slideshow-pause w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                ⏸️
              </button>
              <button class="slideshow-close w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                ✕
              </button>
            </div>
          </div>
          
          <!-- 进度条 -->
          <div class="absolute bottom-4 left-8 right-8">
            <div class="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div class="slideshow-progress h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-[4000ms] ease-linear" style="width: 0%"></div>
            </div>
          </div>
        </div>
      `;
    };
    
    let isPlaying = true;
    let slideInterval;
    
    const startInterval = () => {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        if (isPlaying) {
          currentIndex = (currentIndex + 1) % gallery.length;
          showSlide();
          bindControls();
        }
      }, 4000);
    };
    
    const bindControls = () => {
      const pauseBtn = slideshowModal.querySelector('.slideshow-pause');
      const closeBtn = slideshowModal.querySelector('.slideshow-close');
      const progressBar = slideshowModal.querySelector('.slideshow-progress');
      const timer = slideshowModal.querySelector('.slideshow-timer');
      
      if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
          isPlaying = !isPlaying;
          pauseBtn.textContent = isPlaying ? '⏸️' : '▶️';
          timer.textContent = isPlaying ? '●' : '⏸️';
          if (isPlaying) {
            startInterval();
          } else {
            clearInterval(slideInterval);
          }
        });
      }
      
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          clearInterval(slideInterval);
          document.body.removeChild(slideshowModal);
        });
      }
      
      if (progressBar && isPlaying) {
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = '100%';
        }, 100);
      }
    };
    
    // 键盘控制
    const handleKeydown = (e) => {
      switch (e.key) {
        case 'Escape':
          clearInterval(slideInterval);
          document.body.removeChild(slideshowModal);
          document.removeEventListener('keydown', handleKeydown);
          break;
        case ' ':
          e.preventDefault();
          isPlaying = !isPlaying;
          slideshowModal.querySelector('.slideshow-pause').click();
          break;
        case 'ArrowLeft':
          currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
          showSlide();
          bindControls();
          break;
        case 'ArrowRight':
          currentIndex = (currentIndex + 1) % gallery.length;
          showSlide();
          bindControls();
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeydown);
    document.body.appendChild(slideshowModal);
    
    showSlide();
    bindControls();
    startInterval();
  }
}