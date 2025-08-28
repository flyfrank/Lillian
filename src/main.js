/**
 * 主应用入口文件 - 爱情纪念网站 2.0
 * 
 * 初始化应用、集成所有模块、管理全局状态
 * 
 * @version 2.0
 * @author Love Memorial Team
 */

import { siteConfig, loveEvents, utils } from './data/events.js';
import router from './utils/router.js';
import './styles/main.css';

// 设置全局路由对象
window.router = router;

class LoveMemorialApp {
  constructor() {
    this.isInitialized = false;
    this.currentTheme = 'warm';
    this.animations = {
      gsap: null,
      aos: null
    };
    this.state = {
      loading: true,
      theme: siteConfig.theme.default,
      events: loveEvents,
      filteredEvents: loveEvents,
      currentFilter: 'all',
      searchQuery: '',
      isMenuOpen: false,
      currentEvent: null
    };
    
    // 绑定上下文
    this.bindMethods();
  }

  /**
   * 绑定方法上下文
   */
  bindMethods() {
    this.toggleTheme = this.toggleTheme.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.searchEvents = this.searchEvents.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  /**
   * 初始化应用
   */
  async init() {
    if (this.isInitialized) return;

    try {
      // 显示加载画面
      this.showLoading();

      // 检测主题偏好
      this.detectThemePreference();

      // 初始化动画库
      await this.initializeAnimations();

      // 初始化事件监听器
      this.initializeEventListeners();

      // 初始化路由
      this.initializeRouter();

      // 初始化粒子背景
      this.initializeParticles();

      // 初始化主题系统
      this.initializeTheme();

      // 预加载关键资源
      await this.preloadResources();

      // 隐藏加载画面
      this.hideLoading();

      // 标记为已初始化
      this.isInitialized = true;

      console.log('💖 Love Memorial App initialized successfully!');

    } catch (error) {
      console.error('❌ Failed to initialize app:', error);
      this.showError('应用初始化失败，请刷新页面重试。');
    }
  }

  /**
   * 显示加载画面
   */
  showLoading() {
    const loadingHTML = `
      <div id="loading-screen" class="loading-container fixed inset-0 z-100 glass-morphism flex items-center justify-center">
        <div class="text-center">
          <div class="loading-heart mx-auto mb-8"></div>
          <h2 class="text-2xl font-playfair text-gradient mb-4">加载爱的回忆中...</h2>
          <div class="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
  }

  /**
   * 隐藏加载画面
   */
  hideLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.remove();
        this.state.loading = false;
      }, 500);
    }
  }

  /**
   * 显示错误信息
   */
  showError(message) {
    const errorHTML = `
      <div id="error-screen" class="fixed inset-0 z-100 bg-red-50 flex items-center justify-center">
        <div class="text-center p-8 glass-morphism max-w-md">
          <div class="text-6xl mb-4">💔</div>
          <h2 class="text-xl font-playfair text-red-600 mb-4">出错了</h2>
          <p class="text-red-500 mb-6">${message}</p>
          <button onclick="location.reload()" class="btn-primary">
            重新加载
          </button>
        </div>
      </div>
    `;
    
    document.body.innerHTML = errorHTML;
  }

  /**
   * 检测主题偏好
   */
  detectThemePreference() {
    // 检查本地存储
    const savedTheme = localStorage.getItem('love-memorial-theme');
    if (savedTheme && ['warm', 'dark'].includes(savedTheme)) {
      this.state.theme = savedTheme;
      return;
    }

    // 检查系统偏好
    if (window.matchMedia && siteConfig.theme.allowToggle) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.state.theme = prefersDark ? 'dark' : 'warm';
    }
  }

  /**
   * 初始化动画库
   */
  async initializeAnimations() {
    try {
      // 动态导入 GSAP
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      this.animations.gsap = gsap;
      gsap.registerPlugin(ScrollTrigger);
      
      // 设置GSAP默认值
      gsap.defaults({
        duration: 0.8,
        ease: "power2.out"
      });
      
      // 创建主时间轴
      this.mainTimeline = gsap.timeline();
      
      // 动态导入 AOS
      const AOS = await import('aos');
      this.animations.aos = AOS.default;
      this.animations.aos.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        disable: 'mobile' // 在移动设备上禁用以提高性能
      });
      
      // 初始化页面入场动画
      this.initPageAnimations();

      console.log('✨ Animation libraries loaded');

    } catch (error) {
      console.warn('⚠️ Failed to load animation libraries:', error);
      // 应用仍然可以在没有动画的情况下工作
    }
  }

  /**
   * 初始化页面动画
   */
  initPageAnimations() {
    if (!this.animations.gsap) return;
    
    const { gsap } = this.animations;
    
    // 设置全局动画时间线
    this.mainTimeline = gsap.timeline();
    
    // 导航栏动画
    gsap.set('.navbar', { y: -100, opacity: 0 });
    gsap.to('.navbar', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.2
    });
    
    // 返回顶部按钮动画
    gsap.set('#back-to-top', { scale: 0, rotation: -180 });
    
    // 创建通用的元素入场动画
    this.createEntranceAnimations();
    
    // 创建悬浮效果
    this.createHoverAnimations();
    
    // 创建滚动触发动画
    this.createScrollAnimations();
  }
  
  /**
   * 创建入场动画
   */
  createEntranceAnimations() {
    if (!this.animations.gsap) return;
    
    const { gsap } = this.animations;
    
    // 卡片入场动画
    gsap.registerEffect({
      name: 'cardEntrance',
      effect: (targets, config) => {
        return gsap.fromTo(targets, 
          {
            y: 50,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: config.duration || 0.6,
            ease: 'power2.out',
            stagger: config.stagger || 0.1
          }
        );
      },
      defaults: { duration: 0.6, stagger: 0.1 }
    });
    
    // 标题渐现动画
    gsap.registerEffect({
      name: 'titleReveal',
      effect: (targets, config) => {
        return gsap.fromTo(targets,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: config.duration || 0.8,
            ease: 'power2.out'
          }
        );
      },
      defaults: { duration: 0.8 }
    });
  }
  
  /**
   * 创建悬浮动画
   */
  createHoverAnimations() {
    if (!this.animations.gsap) return;
    
    const { gsap } = this.animations;
    
    // 卡片悬浮效果
    document.addEventListener('mouseenter', (e) => {
      if (e.target.classList.contains('hover-lift')) {
        gsap.to(e.target, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }, true);
    
    document.addEventListener('mouseleave', (e) => {
      if (e.target.classList.contains('hover-lift')) {
        gsap.to(e.target, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }, true);
    
    // 按钮点击动画
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-primary') || e.target.closest('.btn-primary')) {
        const button = e.target.classList.contains('btn-primary') ? e.target : e.target.closest('.btn-primary');
        
        gsap.to(button, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        });
      }
    }, true);
  }
  
  /**
   * 创建滚动动画
   */
  createScrollAnimations() {
    if (!this.animations.gsap || !this.animations.gsap.ScrollTrigger) return;
    
    const { gsap, ScrollTrigger } = this.animations;
    
    // 视差滚动效果
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
      gsap.to(bg, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: 'none',
        scrollTrigger: {
          trigger: bg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });
    
    // 渐显动画
    gsap.utils.toArray('.fade-in-up').forEach(element => {
      gsap.fromTo(element, 
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    // 数字计数动画
    gsap.utils.toArray('.count-up').forEach(counter => {
      const endValue = parseInt(counter.dataset.count || counter.textContent);
      const obj = { value: 0 };
      
      gsap.to(obj, {
        value: endValue,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          counter.textContent = Math.round(obj.value);
        },
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  /**
   * 绑定导航事件
   */
  bindNavigationEvents() {
    // 等待DOM加载完成后绑定事件
    const bindEvents = () => {
      // 移动端菜单切换按钮
      const menuToggle = document.getElementById('menu-toggle');
      if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleMenu();
        });
        
        // 添加触摸事件支持
        menuToggle.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.toggleMenu();
        }, { passive: false });
      }
      
      // 主题切换按钮
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleTheme();
        });
      }
      
      // 搜索按钮
      const searchBtn = document.getElementById('search-btn');
      if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openSearch();
        });
      }
      
      // 返回顶部按钮
      const backToTop = document.getElementById('back-to-top');
      if (backToTop) {
        backToTop.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }
      
      // 移动端菜单链接点击事件
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
          link.addEventListener('click', () => {
            // 点击链接后关闭菜单
            this.state.isMenuOpen = false;
            this.updateMenuState();
          });
        });
      }
      
      // 点击页面其他区域关闭菜单
      document.addEventListener('click', (e) => {
        if (this.state.isMenuOpen) {
          const navbar = document.getElementById('main-nav');
          if (navbar && !navbar.contains(e.target)) {
            this.state.isMenuOpen = false;
            this.updateMenuState();
          }
        }
      });
    };
    
    // 如果DOM已经加载，直接绑定事件
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bindEvents);
    } else {
      bindEvents();
    }
    
    // 监听路由变化，重新绑定事件
    document.addEventListener('route:changed', () => {
      setTimeout(bindEvents, 100);
    });
  }

  /**
   * 初始化事件监听器
   */
  initializeEventListeners() {
    // 窗口事件
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);

    // 导航菜单事件绑定
    this.bindNavigationEvents();

    // 主题切换监听
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener((e) => {
      if (!localStorage.getItem('love-memorial-theme')) {
        this.state.theme = e.matches ? 'dark' : 'warm';
        this.applyTheme();
      }
    });

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModals();
        // 关闭移动端菜单
        if (this.state.isMenuOpen) {
          this.state.isMenuOpen = false;
          this.updateMenuState();
        }
      }
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        this.openSearch();
      }
    });

    // 路由变化监听
    document.addEventListener('route:changed', (e) => {
      this.handleRouteChange(e.detail);
    });
  }

  /**
   * 初始化路由
   */
  initializeRouter() {
    // 路由已在 router.js 中自动初始化
    console.log('🧭 Router initialized');
  }

  /**
   * 初始化粒子背景
   */
  async initializeParticles() {
    try {
      // 创建粒子容器
      const particlesContainer = document.createElement('div');
      particlesContainer.id = 'particles-js';
      particlesContainer.className = 'particles-container';
      
      // 生成粒子
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
      }
      
      document.body.appendChild(particlesContainer);
      console.log('✨ Particles initialized');

    } catch (error) {
      console.warn('⚠️ Failed to initialize particles:', error);
    }
  }

  /**
   * 初始化主题系统
   */
  initializeTheme() {
    this.applyTheme();
    console.log(`🎨 Theme initialized: ${this.state.theme}`);
  }

  /**
   * 应用主题
   */
  applyTheme() {
    const body = document.body;
    
    // 移除所有主题类
    body.classList.remove('theme-warm', 'theme-dark');
    
    // 应用当前主题
    body.classList.add(`theme-${this.state.theme}`);
    
    // 保存到本地存储
    localStorage.setItem('love-memorial-theme', this.state.theme);
    
    // 触发主题变化事件
    document.dispatchEvent(new CustomEvent('theme:changed', {
      detail: { theme: this.state.theme }
    }));
  }

  /**
   * 切换主题
   */
  toggleTheme() {
    this.state.theme = this.state.theme === 'warm' ? 'dark' : 'warm';
    this.applyTheme();
    
    // 添加切换动画
    document.body.style.transition = 'background 0.5s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 500);
  }

  /**
   * 预加载关键资源
   */
  async preloadResources() {
    const resourcesToPreload = [
      // 关键CSS（已通过Vite处理）
      // 关键图片
      ...loveEvents.slice(0, 3).map(event => event.media.coverImage.src),
      // 字体（通过Google Fonts预加载）
    ];

    const promises = resourcesToPreload.map(src => {
      return new Promise((resolve) => {
        if (src.endsWith('.jpg') || src.endsWith('.png') || src.endsWith('.webp')) {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // 即使失败也继续
          img.src = src;
        } else {
          resolve();
        }
      });
    });

    await Promise.all(promises);
    console.log('🚀 Resources preloaded');
  }

  /**
   * 处理窗口大小变化
   */
  handleResize() {
    // 重新计算粒子位置等
    if (this.animations.aos) {
      this.animations.aos.refresh();
    }
  }

  /**
   * 处理滚动
   */
  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 更新导航栏状态
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 更新返回顶部按钮
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      if (scrollTop > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  /**
   * 处理路由变化
   */
  handleRouteChange(routeContext) {
    // 关闭移动端菜单
    this.state.isMenuOpen = false;
    this.updateMenuState();

    // 重新初始化动画
    if (this.animations.aos) {
      setTimeout(() => {
        this.animations.aos.refresh();
      }, 100);
    }

    // 重置滚动位置（可选）
    if (routeContext.route.name !== 'event-detail') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * 切换菜单
   */
  toggleMenu() {
    this.state.isMenuOpen = !this.state.isMenuOpen;
    this.updateMenuState();
  }

  /**
   * 更新菜单状态
   */
  updateMenuState() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (mobileMenu) {
      if (this.state.isMenuOpen) {
        // 显示菜单
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        
        // 添加显示动画
        if (this.animations.gsap) {
          this.animations.gsap.fromTo(mobileMenu, 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        }
      } else {
        // 隐藏菜单
        if (this.animations.gsap) {
          this.animations.gsap.to(mobileMenu, {
            opacity: 0,
            y: -20,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              mobileMenu.classList.add('hidden');
              mobileMenu.classList.remove('flex');
            }
          });
        } else {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
        }
      }
    }

    // 菜单按钮动画
    if (menuToggle) {
      const spans = menuToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        if (this.state.isMenuOpen) {
          // 变成X形状
          menuToggle.classList.add('active');
          if (this.animations.gsap) {
            this.animations.gsap.to(spans[0], {
              rotation: 45,
              y: 6,
              duration: 0.3,
              ease: 'power2.out'
            });
            this.animations.gsap.to(spans[1], {
              opacity: 0,
              duration: 0.2
            });
            this.animations.gsap.to(spans[2], {
              rotation: -45,
              y: -6,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        } else {
          // 变回三条线
          menuToggle.classList.remove('active');
          if (this.animations.gsap) {
            this.animations.gsap.to(spans[0], {
              rotation: 0,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
            this.animations.gsap.to(spans[1], {
              opacity: 1,
              duration: 0.3,
              delay: 0.1
            });
            this.animations.gsap.to(spans[2], {
              rotation: 0,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        }
      }
    }
    
    // 防止菜单打开时的背景滚动
    if (this.state.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * 筛选事件
   */
  filterEvents(type) {
    this.state.currentFilter = type;
    
    if (type === 'all') {
      this.state.filteredEvents = this.state.events;
    } else {
      this.state.filteredEvents = utils.getEventsByType(type);
    }

    // 触发筛选事件
    document.dispatchEvent(new CustomEvent('events:filtered', {
      detail: {
        type,
        events: this.state.filteredEvents
      }
    }));
  }

  /**
   * 搜索事件
   */
  searchEvents(query) {
    this.state.searchQuery = query;
    
    if (!query.trim()) {
      this.filterEvents(this.state.currentFilter);
      return;
    }

    this.state.filteredEvents = utils.searchEvents(query);

    // 触发搜索事件
    document.dispatchEvent(new CustomEvent('events:searched', {
      detail: {
        query,
        events: this.state.filteredEvents
      }
    }));
  }

  /**
   * 关闭所有模态框
   */
  closeModals() {
    const modals = document.querySelectorAll('.modal, .overlay');
    modals.forEach(modal => {
      modal.classList.add('hidden');
    });
  }

  /**
   * 打开搜索
   */
  openSearch() {
    router.push('/search');
  }

  /**
   * 获取应用状态
   */
  getState() {
    return { ...this.state };
  }

  /**
   * 更新应用状态
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    
    // 触发状态变化事件
    document.dispatchEvent(new CustomEvent('app:state-changed', {
      detail: this.state
    }));
  }

  /**
   * 获取统计信息
   */
  getStatistics() {
    return utils.getStatistics();
  }

  /**
   * 获取工具函数
   */
  getUtils() {
    return utils;
  }
}

// 创建全局应用实例
const app = new LoveMemorialApp();

// 暴露到全局作用域以供调试和确保功能正常
window.app = app;

// 导出应用实例
export default app;

// 当DOM加载完成时初始化应用
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

// 全局错误处理
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});