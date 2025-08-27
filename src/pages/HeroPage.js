/**
 * 英雄页面组件 - 封面页面
 * 
 * 包含视差滚动效果、微动画和引导用户进入主要内容
 * 
 * @version 2.0
 * @author Love Memorial Team
 */

import { siteConfig, utils } from '../data/events.js';

export default class HeroPage {
  constructor(options = {}) {
    this.options = options;
    this.isAnimated = false;
  }

  /**
   * 获取最新的统计数据
   */
  getLatestStats() {
    return utils.getStatistics();
  }

  /**
   * 渲染页面
   */
  async render() {
    // 每次渲染时重新获取最新统计数据
    const stats = this.getLatestStats();
    return `
      <div class="hero-page min-h-screen relative overflow-hidden">
        <!-- 视差背景层 -->
        <div class="parallax-bg absolute inset-0 z-0">
          <!-- 渐变背景 -->
          <div class="absolute inset-0 bg-gradient-warm"></div>
          
          <!-- 装饰性几何图形 -->
          <div class="geometric-shapes">
            <div class="shape shape-1 absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full animate-float"></div>
            <div class="shape shape-2 absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full animate-float" style="animation-delay: 2s;"></div>
            <div class="shape shape-3 absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-200/30 rounded-full animate-float" style="animation-delay: 4s;"></div>
            <div class="shape shape-4 absolute bottom-40 right-1/3 w-28 h-28 bg-rose-200/30 rounded-full animate-float" style="animation-delay: 1s;"></div>
          </div>
          
          <!-- 粒子效果层 -->
          <div class="particles-layer absolute inset-0"></div>
        </div>
        
        <!-- 主内容区 -->
        <div class="hero-content relative z-10 min-h-screen flex items-center justify-center px-6">
          <div class="text-center max-w-5xl mx-auto">
            <!-- 主标题区域 -->
            <div class="hero-title-section mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h1 class="hero-main-title text-6xl md:text-8xl lg:text-9xl font-dancing font-bold mb-6 text-gradient">
                Our Love Story
              </h1>
              
              <div class="hero-subtitle text-xl md:text-3xl font-noto text-gray-600 mb-4 leading-relaxed" data-aos="fade-up" data-aos-delay="300">
                <span class="block">${siteConfig.title}</span>
                <span class="block text-lg md:text-xl text-gray-500 mt-2">${siteConfig.subtitle}</span>
              </div>
              
              <p class="hero-description text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="600">
                ${siteConfig.description}
              </p>
            </div>
            
            <!-- 统计信息区域 -->
            <div class="hero-stats grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16" data-aos="fade-up" data-aos-delay="900">
              <div class="stat-item card-glass p-6 rounded-3xl text-center transform hover:scale-105 transition-all duration-300">
                <div class="stat-number text-4xl md:text-5xl font-playfair font-bold text-pink-500 mb-2" data-count="${stats.daysInLove}">${stats.daysInLove}</div>
                <div class="stat-label text-sm md:text-base text-gray-500 font-noto">相伴天数</div>
              </div>
              
              <div class="stat-item card-glass p-6 rounded-3xl text-center transform hover:scale-105 transition-all duration-300">
                <div class="stat-number text-4xl md:text-5xl font-playfair font-bold text-purple-500 mb-2" data-count="${stats.totalEvents}">${stats.totalEvents}</div>
                <div class="stat-label text-sm md:text-base text-gray-500 font-noto">美好回忆</div>
              </div>
              
              <div class="stat-item card-glass p-6 rounded-3xl text-center transform hover:scale-105 transition-all duration-300">
                <div class="stat-number text-4xl md:text-5xl font-playfair font-bold text-indigo-500 mb-2">∞</div>
                <div class="stat-label text-sm md:text-base text-gray-500 font-noto">永恒的爱</div>
              </div>
            </div>
            
            <!-- 操作按钮区域 -->
            <div class="hero-actions space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center" data-aos="fade-up" data-aos-delay="1200">
              <button class="hero-cta-primary btn-primary px-8 py-4 rounded-2xl font-medium text-lg shadow-xl transform hover:scale-105 transition-all duration-300" data-navigate="/timeline">
                <span class="mr-3">💖</span>
                探索我们的回忆
                <span class="ml-3">✨</span>
              </button>
              
              <button class="hero-cta-secondary btn-secondary px-8 py-4 rounded-2xl font-medium text-lg shadow-xl transform hover:scale-105 transition-all duration-300" data-navigate="/about">
                <span class="mr-3">💕</span>
                了解更多
              </button>
            </div>
            
            <!-- 引导提示 -->
            <div class="hero-guide mt-20" data-aos="fade-up" data-aos-delay="1500">
              <p class="text-sm text-gray-400 mb-4">向下滚动开始我们的旅程</p>
              <div class="scroll-indicator mx-auto w-6 h-10 border-2 border-pink-300 rounded-full flex justify-center animate-bounce">
                <div class="w-1 h-3 bg-pink-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 底部过渡区域 -->
        <div class="hero-transition absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/20 to-transparent"></div>
      </div>
      
      <!-- 快速预览区域 -->
      <section class="hero-preview py-20 bg-white/50 backdrop-blur-lg">
        <div class="container mx-auto px-6 max-w-6xl">
          <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="text-3xl md:text-4xl font-playfair font-bold text-gradient mb-4">
              最新的美好时光
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              这里是我们最近记录的珍贵回忆
            </p>
          </div>
          
          <div class="recent-memories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="recent-memories">
            <!-- 最新回忆将通过 JavaScript 动态加载 -->
          </div>
          
          <div class="text-center mt-12" data-aos="fade-up">
            <button class="view-all-btn btn-primary px-8 py-3 rounded-xl" data-navigate="/timeline">
              查看所有回忆 →
            </button>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * 页面挂载后的初始化
   */
  async mount() {
    try {
      // 初始化视差滚动
      this.initParallaxScrolling();
      
      // 初始化数字计数动画
      this.initCounterAnimation();
      
      // 初始化交互事件
      this.initInteractions();
      
      // 加载最新回忆
      this.loadRecentMemories();
      
      // 初始化粒子背景
      this.initParticles();
      
      this.isAnimated = true;
      
    } catch (error) {
      console.error('Hero page mount error:', error);
    }
  }

  /**
   * 初始化视差滚动
   */
  initParallaxScrolling() {
    const shapes = document.querySelectorAll('.shape');
    const parallaxBg = document.querySelector('.parallax-bg');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${rate}px)`;
      }
      
      shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        const yPos = scrolled * speed;
        shape.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  /**
   * 初始化数字计数动画
   */
  initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.dataset.count);
      const current = parseInt(counter.textContent) || 0;
      
      // 如果目标值和当前值相同，不需要动画
      if (target === current) {
        return;
      }
      
      const duration = 2000;
      const start = performance.now();
      
      const update = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const animatedValue = Math.floor(current + (target - current) * easeOutQuart);
        
        counter.textContent = animatedValue;
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      };
      
      requestAnimationFrame(update);
    };
    
    // 创建观察器，当元素进入视口时启动动画
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          entry.target.dataset.animated = 'true';
        }
      });
    });
    
    counters.forEach(counter => {
      // 清除之前的动画状态，允许重新动画
      counter.removeAttribute('data-animated');
      observer.observe(counter);
    });
  }

  /**
   * 初始化交互事件
   */
  initInteractions() {
    // 导航按钮事件
    document.querySelectorAll('[data-navigate]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const path = e.currentTarget.dataset.navigate;
        if (path && window.router) {
          window.router.push(path);
        }
      });
    });
    
    // 滚动指示器点击事件
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const previewSection = document.querySelector('.hero-preview');
        if (previewSection) {
          previewSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    
    // 鼠标移动视差效果
    document.addEventListener('mousemove', (e) => {
      const shapes = document.querySelectorAll('.shape');
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;
      
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const x = mouseX * speed * 50;
        const y = mouseY * speed * 50;
        
        shape.style.transform += ` translate(${x}px, ${y}px)`;
      });
    });
  }

  /**
   * 加载最新回忆
   */
  async loadRecentMemories() {
    try {
      const { loveEvents } = await import('../data/events.js');
      const recentEvents = loveEvents
        .sort((a, b) => new Date(b.dates.gregorian) - new Date(a.dates.gregorian))
        .slice(0, 3);
      
      const container = document.getElementById('recent-memories');
      if (!container) return;
      
      container.innerHTML = recentEvents.map((event, index) => `
        <div class="memory-preview card-glass p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer" 
             data-aos="fade-up" 
             data-aos-delay="${index * 200}"
             data-event-id="${event.id}">
          <div class="memory-image mb-4 overflow-hidden rounded-xl">
            <img src="${event.media.coverImage.src}" 
                 alt="${event.media.coverImage.alt}"
                 class="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                 onerror="this.src='https://via.placeholder.com/400x300/f8fafc/64748b?text=美好回忆'">
          </div>
          
          <div class="memory-info">
            <div class="memory-meta flex items-center justify-between mb-3">
              <span class="memory-date text-sm text-gray-500">${event.dates.displayDate} ${event.dates.year}</span>
              <span class="memory-type px-2 py-1 rounded-full text-xs bg-gradient-to-r ${event.theme.primary} text-white">
                ${event.name}
              </span>
            </div>
            
            <h3 class="memory-title text-lg font-playfair font-semibold text-gray-800 mb-2">
              ${event.title}
            </h3>
            
            <p class="memory-description text-sm text-gray-600 line-clamp-3">
              ${event.description.short}
            </p>
          </div>
        </div>
      `).join('');
      
      // 为预览卡片添加点击事件
      container.querySelectorAll('.memory-preview').forEach(card => {
        card.addEventListener('click', () => {
          const eventId = card.dataset.eventId;
          if (eventId && window.router) {
            window.router.push(`/event/${eventId}`);
          }
        });
      });
      
    } catch (error) {
      console.error('Failed to load recent memories:', error);
    }
  }

  /**
   * 初始化粒子背景
   */
  initParticles() {
    const particlesLayer = document.querySelector('.particles-layer');
    if (!particlesLayer) return;
    
    // 创建浮动粒子
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute w-2 h-2 rounded-full opacity-30';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      
      // 随机颜色
      const colors = ['bg-pink-400', 'bg-purple-400', 'bg-indigo-400', 'bg-rose-400'];
      particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);
      
      particlesLayer.appendChild(particle);
    }
  }

  /**
   * 页面卸载清理
   */
  unmount() {
    // 清理事件监听器
    this.isAnimated = false;
  }
}