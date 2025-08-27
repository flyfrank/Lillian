/**
 * 回忆画廊页面组件
 * 
 * 展示精选的珍贵照片和回忆，支持轮播和灯箱效果
 * 使用玻璃拟态设计和专业级动画
 * 
 * @version 2.0
 * @author Love Memorial Team
 */

import { loveEvents, eventTypes, utils } from '../data/events.js';

export default class GalleryPage {
  constructor(props = {}) {
    this.props = props;
    this.currentFilter = 'all';
    this.lightboxInstance = null;
  }

  async render() {
    const events = utils.sortByDate();
    const allImages = this.extractAllImages(events);
    
    return `
      <div class="gallery-page min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <!-- 页面头部 -->
        <header class="relative overflow-hidden py-20 lg:py-32">
          <div class="container mx-auto px-6 relative z-10">
            <div class="text-center max-w-4xl mx-auto" data-aos="fade-up">
              <h1 class="text-4xl lg:text-6xl font-bold text-gradient mb-6">
                回忆画廊
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
                珍藏我们共同度过的每一个美好瞬间
              </p>
              <div class="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </div>
          
          <!-- 背景装饰 -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          </div>
        </header>

        <!-- 筛选器 -->
        <section class="container mx-auto px-6 mb-12">
          <div class="glass-morphism rounded-2xl p-6" data-aos="fade-up" data-aos-delay="100">
            <div class="flex flex-wrap gap-4 justify-center">
              <button class="filter-btn active" data-filter="all">
                <span class="emoji">🖼️</span>
                全部照片 (${allImages.length})
              </button>
              ${Object.entries(eventTypes).map(([type, config]) => {
                const count = this.getImageCountByType(type, allImages);
                return `
                  <button class="filter-btn" data-filter="${type}">
                    <span class="emoji">${config.icon}</span>
                    ${config.name} (${count})
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </section>

        <!-- 图片网格 -->
        <section class="container mx-auto px-6 pb-20">
          <div class="gallery-grid" id="gallery-grid">
            ${this.renderImageGrid(allImages)}
          </div>
        </section>

        <!-- 统计信息 -->
        <section class="container mx-auto px-6 pb-20">
          <div class="glass-morphism rounded-2xl p-8 text-center" data-aos="fade-up">
            <h3 class="text-2xl font-bold text-gradient mb-6">📊 我们的回忆统计</h3>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
              ${this.renderStatistics()}
            </div>
          </div>
        </section>
      </div>
    `;
  }

  /**
   * 提取所有图片
   */
  extractAllImages(events) {
    const allImages = [];
    
    events.forEach(event => {
      // 添加封面图片
      if (event.media?.coverImage) {
        allImages.push({
          ...event.media.coverImage,
          eventId: event.id,
          eventType: event.type,
          eventName: event.name,
          eventTitle: event.title,
          date: event.dates.gregorian,
          isCover: true
        });
      }
      
      // 添加画廊图片
      if (event.media?.gallery) {
        event.media.gallery.forEach(image => {
          allImages.push({
            ...image,
            eventId: event.id,
            eventType: event.type,
            eventName: event.name,
            eventTitle: event.title,
            date: event.dates.gregorian,
            isCover: false
          });
        });
      }
    });
    
    return allImages.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * 按类型获取图片数量
   */
  getImageCountByType(type, allImages) {
    return allImages.filter(img => img.eventType === type).length;
  }

  /**
   * 渲染图片网格
   */
  renderImageGrid(images) {
    return images.map((image, index) => `
      <div class="gallery-item" 
           data-type="${image.eventType}" 
           data-aos="fade-up" 
           data-aos-delay="${(index % 12) * 50}">
        <div class="glass-morphism rounded-xl overflow-hidden group cursor-pointer hover-lift">
          <div class="aspect-square relative overflow-hidden">
            <img src="${image.src}" 
                 alt="${image.alt}"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 loading="lazy">
            
            <!-- 悬浮遮罩 -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <p class="font-medium text-sm mb-1">${image.eventName}</p>
                <p class="text-xs opacity-90">${image.caption || image.alt}</p>
              </div>
            </div>
            
            <!-- 放大图标 -->
            <div class="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="text-white text-sm">🔍</span>
            </div>
            
            <!-- 类型标签 -->
            <div class="absolute top-4 left-4">
              <span class="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                ${eventTypes[image.eventType]?.icon} ${eventTypes[image.eventType]?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * 渲染统计信息
   */
  renderStatistics() {
    // 每次渲染时重新获取最新统计数据
    const stats = utils.getStatistics();
    const allImages = this.extractAllImages(utils.sortByDate());
    
    return `
      <div class="text-center">
        <div class="text-3xl font-bold text-gradient mb-2">${allImages.length}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">珍贵照片</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-gradient mb-2">${stats.totalEvents}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">美好回忆</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-gradient mb-2">${stats.daysInLove}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">相爱天数</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-gradient mb-2">${stats.featuredCount}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">精选时刻</div>
      </div>
    `;
  }

  /**
   * 筛选图片
   */
  filterImages(type) {
    this.currentFilter = type;
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
      const itemType = item.dataset.type;
      const shouldShow = type === 'all' || itemType === type;
      
      if (shouldShow) {
        item.style.display = 'block';
        // 重新触发动画
        setTimeout(() => {
          item.setAttribute('data-aos', 'fade-up');
          item.setAttribute('data-aos-delay', (index % 12) * 50);
        }, 50);
      } else {
        item.style.display = 'none';
      }
    });
    
    // 更新筛选按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${type}"]`).classList.add('active');
  }

  /**
   * 初始化灯箱
   */
  initLightbox() {
    // 这里可以集成 lightgallery.js 或类似的灯箱库
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const img = item.querySelector('img');
        this.openLightbox(img.src, img.alt);
      });
    });
  }

  /**
   * 打开灯箱（简化版本）
   */
  openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    lightbox.innerHTML = `
      <div class="relative max-w-4xl max-h-full">
        <img src="${src}" alt="${alt}" class="max-w-full max-h-full object-contain rounded-lg">
        <button class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          ✕
        </button>
        <div class="absolute bottom-4 left-4 right-4 text-center">
          <p class="text-white bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">${alt}</p>
        </div>
      </div>
    `;
    
    // 关闭事件
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.textContent === '✕') {
        document.body.removeChild(lightbox);
      }
    });
    
    document.body.appendChild(lightbox);
  }

  /**
   * 页面挂载后的初始化
   */
  async mount() {
    // 初始化AOS动画
    if (window.AOS) {
      window.AOS.refresh();
    }
    
    // 绑定筛选器事件
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        this.filterImages(filter);
      });
    });
    
    // 初始化灯箱
    this.initLightbox();
    
    // 添加键盘支持
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const lightbox = document.querySelector('.fixed.inset-0.bg-black\\/90');
        if (lightbox) {
          document.body.removeChild(lightbox);
        }
      }
    });
  }
}