/**
 * 时光轴页面组件
 * 
 * 展示所有纪念日的时间线，支持筛选、搜索和动画效果
 * 
 * @version 2.0
 * @author Love Memorial Team
 */

import { loveEvents, eventTypes, utils } from '../data/events.js';

export default class TimelinePage {
  constructor(options = {}) {
    this.options = options;
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.filteredEvents = [...loveEvents];
    this.isLoading = false;
  }

  /**
   * 渲染页面
   */
  async render() {
    // 每次渲染时重新获取最新统计数据
    const currentStats = utils.getStatistics();
    
    return `
      <div class="timeline-page pt-24 pb-16">
        <!-- 页面头部 -->
        <section class="timeline-header py-16 px-6">
          <div class="container mx-auto max-w-6xl text-center">
            <h1 class="text-4xl md:text-6xl font-playfair font-bold text-gradient mb-6" data-aos="fade-up">
              我们的时光轴
            </h1>
            
            <p class="text-xl text-gray-600 font-noto max-w-3xl mx-auto leading-relaxed mb-12" data-aos="fade-up" data-aos-delay="300">
              每一个节日，每一个生日，每一个纪念日，都是我们爱情故事中珍贵的片段。
              让我们一起重温那些美好的时光，感受爱情的温度。
            </p>
            
            <!-- 筛选和搜索区域 -->
            <div class="timeline-controls space-y-6" data-aos="fade-up" data-aos-delay="600">
              <!-- 分类筛选 -->
              <div class="filter-section">
                <h3 class="text-lg font-medium text-gray-700 mb-4">按类型筛选</h3>
                <div class="flex flex-wrap justify-center gap-3">
                  <button class="filter-btn active" data-filter="all">
                    <span class="mr-2">💖</span>全部
                  </button>
                  ${Object.entries(eventTypes).map(([type, config]) => `
                    <button class="filter-btn" data-filter="${type}">
                      <span class="mr-2">${config.icon}</span>${config.name}
                    </button>
                  `).join('')}
                </div>
              </div>
              
              <!-- 搜索框 -->
              <div class="search-section max-w-md mx-auto">
                <div class="relative">
                  <input type="text" 
                         id="timeline-search" 
                         placeholder="搜索回忆..."
                         class="w-full px-4 py-3 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors duration-300 glass-effect">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                </div>
              </div>
              
              <!-- 统计信息 -->
              <div class="timeline-stats grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div class="stat-card glass-effect p-4 rounded-xl text-center">
                  <div class="text-2xl font-bold text-pink-500" id="total-events">${loveEvents.length}</div>
                  <div class="text-sm text-gray-500">总回忆</div>
                </div>
                <div class="stat-card glass-effect p-4 rounded-xl text-center">
                  <div class="text-2xl font-bold text-purple-500" id="this-year-events">${utils.getEventsByYear(new Date().getFullYear().toString()).length}</div>
                  <div class="text-sm text-gray-500">今年</div>
                </div>
                <div class="stat-card glass-effect p-4 rounded-xl text-center">
                  <div class="text-2xl font-bold text-indigo-500" id="featured-events">${utils.getFeaturedEvents().length}</div>
                  <div class="text-sm text-gray-500">精选</div>
                </div>
                <div class="stat-card glass-effect p-4 rounded-xl text-center">
                  <div class="text-2xl font-bold text-rose-500" id="love-days">${currentStats.daysInLove}</div>
                  <div class="text-sm text-gray-500">相爱天数</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 时光轴主体 -->
        <section class="timeline-main px-6">
          <div class="container mx-auto max-w-5xl">
            <!-- 加载状态 -->
            <div id="timeline-loading" class="hidden text-center py-12">
              <div class="loading-heart mx-auto mb-4"></div>
              <p class="text-gray-500">正在筛选回忆...</p>
            </div>
            
            <!-- 时光轴容器 -->
            <div id="timeline-container" class="relative">
              <!-- 中央时间线 -->
              <div class="timeline-line absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-pink-400 via-purple-400 to-indigo-400 rounded-full"></div>
              
              <!-- 事件列表 -->
              <div id="timeline-events" class="space-y-16">
                <!-- 事件将通过 JavaScript 动态渲染 -->
              </div>
            </div>
            
            <!-- 无结果状态 -->
            <div id="no-results" class="hidden text-center py-20">
              <div class="text-6xl mb-4">💔</div>
              <h3 class="text-xl font-playfair font-semibold text-gray-700 mb-2">没有找到相关回忆</h3>
              <p class="text-gray-500 mb-6">试试调整筛选条件或搜索关键词</p>
              <button class="btn-primary px-6 py-3 rounded-xl" onclick="this.clearFilters()">
                清除筛选
              </button>
            </div>
          </div>
        </section>
        
        <!-- 底部导航 -->
        <section class="timeline-footer py-16 px-6 bg-gradient-to-r from-pink-50 to-purple-50">
          <div class="container mx-auto max-w-4xl text-center">
            <h3 class="text-2xl font-playfair font-bold text-gray-800 mb-4">
              想要查看更多？
            </h3>
            <p class="text-gray-600 mb-8">
              探索我们的其他页面，发现更多美好时光
            </p>
            
            <div class="flex flex-wrap justify-center gap-4">
              <button class="btn-primary px-6 py-3 rounded-xl" data-navigate="/gallery">
                <span class="mr-2">🖼️</span>照片画廊
              </button>
              <button class="btn-secondary px-6 py-3 rounded-xl" data-navigate="/about">
                <span class="mr-2">💝</span>关于我们
              </button>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  /**
   * 页面挂载
   */
  async mount() {
    try {
      // 初始化事件监听器
      this.initEventListeners();
      
      // 渲染时光轴
      this.renderTimeline();
      
      // 初始化滚动动画
      this.initScrollAnimations();
      
    } catch (error) {
      console.error('Timeline page mount error:', error);
    }
  }

  /**
   * 初始化事件监听器
   */
  initEventListeners() {
    // 筛选按钮
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleFilterChange(e.target.dataset.filter);
      });
    });
    
    // 搜索框
    const searchInput = document.getElementById('timeline-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }
    
    // 导航按钮
    document.querySelectorAll('[data-navigate]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const path = e.currentTarget.dataset.navigate;
        if (path && window.router) {
          window.router.push(path);
        }
      });
    });
  }

  /**
   * 处理筛选变化
   */
  handleFilterChange(filter) {
    // 更新按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    // 更新筛选状态
    this.currentFilter = filter;
    this.applyFilters();
  }

  /**
   * 处理搜索
   */
  handleSearch(query) {
    this.searchQuery = query.trim();
    this.applyFilters();
  }

  /**
   * 应用筛选和搜索
   */
  applyFilters() {
    this.showLoading();
    
    // 模拟筛选延迟，提供更好的用户体验
    setTimeout(() => {
      let events = [...loveEvents];
      
      // 按类型筛选
      if (this.currentFilter !== 'all') {
        events = events.filter(event => event.type === this.currentFilter);
      }
      
      // 按搜索关键词筛选
      if (this.searchQuery) {
        events = utils.searchEvents(this.searchQuery);
      }
      
      this.filteredEvents = events;
      this.renderTimeline();
      this.hideLoading();
      
    }, 300);
  }

  /**
   * 显示加载状态
   */
  showLoading() {
    document.getElementById('timeline-loading').classList.remove('hidden');
    document.getElementById('timeline-events').style.opacity = '0.5';
  }

  /**
   * 隐藏加载状态
   */
  hideLoading() {
    document.getElementById('timeline-loading').classList.add('hidden');
    document.getElementById('timeline-events').style.opacity = '1';
  }

  /**
   * 渲染时光轴
   */
  renderTimeline() {
    const container = document.getElementById('timeline-events');
    const noResults = document.getElementById('no-results');
    
    if (!container) return;
    
    if (this.filteredEvents.length === 0) {
      container.innerHTML = '';
      noResults.classList.remove('hidden');
      return;
    }
    
    noResults.classList.add('hidden');
    
    // 按日期排序
    const sortedEvents = utils.sortByDate();
    
    container.innerHTML = sortedEvents.map((event, index) => 
      this.createEventCard(event, index)
    ).join('');
    
    // 重新初始化滚动动画
    this.initScrollAnimations();
    
    // 绑定事件卡片点击事件
    this.bindEventCardClicks();
  }

  /**
   * 创建事件卡片
   */
  createEventCard(event, index) {
    const isEven = index % 2 === 0;
    const alignClass = isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto';
    const cardDirection = isEven ? 'md:flex-row-reverse' : 'md:flex-row';
    
    return `
      <div class="timeline-event relative" data-aos="fade-up" data-aos-delay="${index * 100}">
        <!-- 时间点 -->
        <div class="timeline-dot absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg bg-gradient-to-r ${event.theme.primary} z-10"></div>
        
        <!-- 事件卡片 -->
        <div class="timeline-card ml-16 md:ml-0 md:w-1/2 ${alignClass}">
          <div class="event-card card-glass p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer" data-event-id="${event.id}">
            <!-- 卡片头部 -->
            <div class="event-header mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="event-date text-sm text-gray-500 font-medium">
                  ${event.dates.displayDate} ${event.dates.year}
                </span>
                <span class="event-type px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${event.theme.primary} text-white">
                  ${eventTypes[event.type]?.icon} ${event.name}
                </span>
              </div>
              
              <h3 class="event-title text-xl font-playfair font-semibold text-gray-800 mb-2">
                ${event.title}
              </h3>
            </div>
            
            <!-- 封面图片 -->
            ${event.media.coverImage ? `
              <div class="event-image mb-4 overflow-hidden rounded-xl">
                <img src="${event.media.coverImage.src}" 
                     alt="${event.media.coverImage.alt}"
                     class="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                     onerror="this.src='https://via.placeholder.com/400x300/f8fafc/64748b?text=美好回忆'">
              </div>
            ` : ''}
            
            <!-- 描述 -->
            <p class="event-description text-gray-600 leading-relaxed line-clamp-3 mb-4">
              ${event.description.short}
            </p>
            
            <!-- 标签 -->
            <div class="event-tags flex flex-wrap gap-2 mb-4">
              ${event.metadata.tags.slice(0, 3).map(tag => `
                <span class="tag px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                  ${tag}
                </span>
              `).join('')}
            </div>
            
            <!-- 卡片底部 -->
            <div class="event-footer flex items-center justify-between">
              <div class="event-stats flex items-center space-x-4 text-sm text-gray-500">
                <span>📍 ${event.location || '未知地点'}</span>
                ${event.metadata.significance ? `
                  <span>${'⭐'.repeat(event.metadata.significance)}</span>
                ` : ''}
              </div>
              
              <span class="view-detail text-pink-500 text-sm font-medium">
                查看详情 →
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 绑定事件卡片点击事件
   */
  bindEventCardClicks() {
    document.querySelectorAll('.event-card[data-event-id]').forEach(card => {
      card.addEventListener('click', () => {
        const eventId = card.dataset.eventId;
        if (eventId && window.router) {
          window.router.push(`/event/${eventId}`);
        }
      });
    });
  }

  /**
   * 初始化滚动动画
   */
  initScrollAnimations() {
    // 更新时间线高度
    const timelineLine = document.querySelector('.timeline-line');
    const timelineContainer = document.getElementById('timeline-container');
    
    if (timelineLine && timelineContainer) {
      timelineLine.style.height = timelineContainer.offsetHeight + 'px';
    }
    
    // 观察时间点进入视口
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-pulse-glow');
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.timeline-dot').forEach(dot => {
      observer.observe(dot);
    });
  }

  /**
   * 清除筛选
   */
  clearFilters() {
    this.currentFilter = 'all';
    this.searchQuery = '';
    
    // 重置UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector('[data-filter="all"]').classList.add('active');
    
    const searchInput = document.getElementById('timeline-search');
    if (searchInput) {
      searchInput.value = '';
    }
    
    // 重新渲染
    this.applyFilters();
  }

  /**
   * 页面卸载
   */
  unmount() {
    // 清理事件监听器和动画
  }
}