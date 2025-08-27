/**
 * 关于我们页面组件
 * 
 * 展示网站的故事、技术栈和情侣的介绍
 * 包含精美的视觉设计和交互动画
 * 
 * @version 2.0
 * @author Love Memorial Team
 */

import { siteConfig, utils } from '../data/events.js';

export default class AboutPage {
  constructor(props = {}) {
    this.props = props;
  }

  async render() {
    // 每次渲染时重新获取最新统计数据
    const stats = utils.getStatistics();
    
    return `
      <div class="about-page min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <!-- 页面头部 -->
        <header class="relative overflow-hidden py-20 lg:py-32">
          <div class="container mx-auto px-6 relative z-10">
            <div class="text-center max-w-4xl mx-auto" data-aos="fade-up">
              <h1 class="text-4xl lg:text-6xl font-bold text-gradient mb-6">
                关于我们的故事
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
                这是一个关于爱情、回忆和技术的美好故事
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

        <!-- 我们的爱情故事 -->
        <section class="container mx-auto px-6 mb-20">
          <div class="glass-morphism rounded-2xl p-8 lg:p-12" data-aos="fade-up">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <!-- 故事文字 -->
              <div>
                <h2 class="text-3xl lg:text-4xl font-bold text-gradient mb-6">💕 我们的爱情</h2>
                <div class="prose prose-lg dark:prose-invert">
                  <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    这个网站诞生于一个简单而美好的想法：为我们的爱情创造一个永恒的数字博物馆。
                    在这里，每一个传统节日、每一个生日、每一个特殊的纪念日都被精心珍藏。
                  </p>
                  <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    从${siteConfig.anniversary.startDate}我们开始牵手走过人生的四季，
                    到今天已经相爱了${stats.daysInLove}天。这些日子里，我们一起体验了${stats.totalEvents}个美好时刻，
                    每一个都值得被永远记住。
                  </p>
                  <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                    愿我们的爱情如这个网站一样，在时光的流逝中愈发珍贵，在岁月的洗礼下更加美好。
                  </p>
                </div>
              </div>
              
              <!-- 情侣照片 -->
              <div class="relative" data-aos="fade-left" data-aos-delay="200">
                <div class="relative">
                  <!-- 主照片框 - 合影轮播 -->
                  <div class="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-8 relative overflow-hidden">
                    <!-- 合照轮播 -->
                    <div class="w-full h-full rounded-xl overflow-hidden relative">
                      <div class="swiper couple-swiper h-full">
                        <div class="swiper-wrapper">
                          <div class="swiper-slide">
                            <img src="/assets/images/couple-photos/photo-1.jpg" 
                                 alt="我们的第一张合影"
                                 class="w-full h-full object-cover"
                                 onerror="this.parentElement.innerHTML='<div class=\"w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800/50 dark:to-purple-800/50 rounded-xl flex items-center justify-center\"><div class=\"text-center\"><div class=\"text-6xl mb-4\">📷</div><p class=\"text-gray-600 dark:text-gray-400 font-medium\">第一张合影</p><p class=\"text-sm text-gray-500 dark:text-gray-500 mt-2\">请添加您的珍贵照片</p></div></div>'">
                          </div>
                          <div class="swiper-slide">
                            <img src="/assets/images/couple-photos/photo-2.jpg" 
                                 alt="甜蜜时光"
                                 class="w-full h-full object-cover"
                                 onerror="this.parentElement.innerHTML='<div class=\"w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800/50 dark:to-purple-800/50 rounded-xl flex items-center justify-center\"><div class=\"text-center\"><div class=\"text-6xl mb-4\">📷</div><p class=\"text-gray-600 dark:text-gray-400 font-medium\">第二张合影</p><p class=\"text-sm text-gray-500 dark:text-gray-500 mt-2\">请添加您的珍贵照片</p></div></div>'">
                          </div>
                          <div class="swiper-slide">
                            <img src="/assets/images/couple-photos/photo-3.jpg" 
                                 alt="幸福瞬间"
                                 class="w-full h-full object-cover"
                                 onerror="this.parentElement.innerHTML='<div class=\"w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800/50 dark:to-purple-800/50 rounded-xl flex items-center justify-center\"><div class=\"text-center\"><div class=\"text-6xl mb-4\">📷</div><p class=\"text-gray-600 dark:text-gray-400 font-medium\">第三张合影</p><p class=\"text-sm text-gray-500 dark:text-gray-500 mt-2\">请添加您的珍贵照片</p></div></div>'">
                          </div>
                          <div class="swiper-slide">
                            <img src="/assets/images/couple-photos/photo-4.jpg" 
                                 alt="永恒的承诺"
                                 class="w-full h-full object-cover"
                                 onerror="this.parentElement.innerHTML='<div class=\"w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800/50 dark:to-purple-800/50 rounded-xl flex items-center justify-center\"><div class=\"text-center\"><div class=\"text-6xl mb-4\">📷</div><p class=\"text-gray-600 dark:text-gray-400 font-medium\">第四张合影</p><p class=\"text-sm text-gray-500 dark:text-gray-500 mt-2\">请添加您的珍贵照片</p></div></div>'">
                          </div>
                        </div>
                        
                        <!-- 简洁的分页器 -->
                        <div class="swiper-pagination couple-pagination"></div>
                        
                        <!-- 简洁的导航按钮 -->
                        <div class="swiper-button-next couple-nav-next"></div>
                        <div class="swiper-button-prev couple-nav-prev"></div>
                      </div>
                      
                      <!-- 合影标题 -->
                      <div class="absolute top-4 left-4 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                        我们的珍贵合影
                      </div>
                    </div>
                    
                    <!-- 装饰元素 -->
                    <div class="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-80"></div>
                    <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full opacity-60"></div>
                  </div>
                  
                  <!-- 浮动的小心心 -->
                  <div class="absolute -top-2 -left-2 text-2xl animate-bounce" style="animation-delay: 0s;">💝</div>
                  <div class="absolute -top-2 -right-2 text-xl animate-bounce" style="animation-delay: 0.5s;">💖</div>
                  <div class="absolute -bottom-2 -left-2 text-xl animate-bounce" style="animation-delay: 1s;">💗</div>
                  <div class="absolute -bottom-2 -right-2 text-2xl animate-bounce" style="animation-delay: 1.5s;">💓</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 统计数据 -->
        <section class="container mx-auto px-6 mb-20">
          <div class="glass-morphism rounded-2xl p-8" data-aos="fade-up" data-aos-delay="100">
            <h2 class="text-3xl font-bold text-gradient text-center mb-12">📊 我们的数字足迹</h2>
            
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div class="text-center" data-aos="zoom-in" data-aos-delay="100">
                <div class="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl text-white">💕</span>
                </div>
                <div class="text-3xl font-bold text-gradient mb-2">${stats.daysInLove}</div>
                <div class="text-gray-600 dark:text-gray-400">相爱天数</div>
              </div>
              
              <div class="text-center" data-aos="zoom-in" data-aos-delay="200">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl text-white">📝</span>
                </div>
                <div class="text-3xl font-bold text-gradient mb-2">${stats.totalEvents}</div>
                <div class="text-gray-600 dark:text-gray-400">珍贵回忆</div>
              </div>
              
              <div class="text-center" data-aos="zoom-in" data-aos-delay="300">
                <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl text-white">⭐</span>
                </div>
                <div class="text-3xl font-bold text-gradient mb-2">${stats.featuredCount}</div>
                <div class="text-gray-600 dark:text-gray-400">精选时刻</div>
              </div>
              
              <div class="text-center" data-aos="zoom-in" data-aos-delay="400">
                <div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl text-white">🎉</span>
                </div>
                <div class="text-3xl font-bold text-gradient mb-2">${Object.keys(stats.eventsByType).length}</div>
                <div class="text-gray-600 dark:text-gray-400">回忆类型</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 技术栈介绍 -->
        <section class="container mx-auto px-6 mb-20">
          <div class="glass-morphism rounded-2xl p-8" data-aos="fade-up" data-aos-delay="200">
            <h2 class="text-3xl font-bold text-gradient text-center mb-12">🛠️ 技术实现</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${this.renderTechStack()}
            </div>
            
            <div class="mt-12 p-6 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl">
              <h3 class="text-xl font-bold text-gradient mb-4 text-center">✨ 设计理念</h3>
              <p class="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                采用现代化的玻璃拟态设计风格，配合专业级动画效果，为爱情回忆创造最优雅的展示平台。
                每一个细节都经过精心设计，只为给我们的爱情故事最完美的呈现。
              </p>
            </div>
          </div>
        </section>


        <!-- 感谢语 -->
        <section class="container mx-auto px-6 mb-20">
          <div class="text-center" data-aos="fade-up" data-aos-delay="400">
            <div class="glass-morphism rounded-2xl p-12">
              <div class="text-6xl mb-6">💖</div>
              <h2 class="text-3xl font-bold text-gradient mb-6">感谢每一份美好</h2>
              <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                感谢时光见证我们的爱情，感谢技术记录我们的回忆，
                感谢每一个看到这里的朋友为我们送上祝福。
                愿所有的爱情都能如我们一样幸福美满！
              </p>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  /**
   * 渲染技术栈
   */
  renderTechStack() {
    const techStack = [
      {
        name: 'Vite',
        icon: '⚡',
        description: '极速的现代化构建工具',
        color: 'from-yellow-400 to-orange-400'
      },
      {
        name: 'Vanilla JS',
        icon: '📱',
        description: '原生JavaScript ES6+',
        color: 'from-blue-400 to-purple-400'
      },
      {
        name: 'Tailwind CSS',
        icon: '🎨',
        description: '实用优先的CSS框架',
        color: 'from-green-400 to-blue-400'
      },
      {
        name: 'GSAP',
        icon: '🎬',
        description: '专业级动画库',
        color: 'from-purple-400 to-pink-400'
      },
      {
        name: 'AOS',
        icon: '✨',
        description: '滚动动画效果',
        color: 'from-pink-400 to-red-400'
      },
      {
        name: 'SPA Router',
        icon: '🧭',
        description: '单页应用路由系统',
        color: 'from-indigo-400 to-purple-400'
      }
    ];

    return techStack.map((tech, index) => `
      <div class="text-center group" data-aos="zoom-in" data-aos-delay="${(index + 1) * 100}">
        <div class="w-16 h-16 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <span class="text-2xl">${tech.icon}</span>
        </div>
        <h3 class="text-lg font-bold text-gradient mb-2">${tech.name}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">${tech.description}</p>
      </div>
    `).join('');
  }

  /**
   * 页面挂载后的初始化
   */
  async mount() {
    // 初始化AOS动画
    if (window.AOS) {
      window.AOS.refresh();
    }
    
    // 初始化合影轮播
    this.initCouplePhotosCarousel();
    
    // 绑定表单提交事件
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    
    // 添加一些互动动画
    this.addInteractiveAnimations();
  }

  /**
   * 处理表单提交
   */
  handleFormSubmit(e) {
    e.preventDefault();
    
    // 模拟表单提交
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // 显示感谢消息
    this.showThankYouMessage();
    
    // 重置表单
    e.target.reset();
  }

  /**
   * 显示感谢消息
   */
  showThankYouMessage() {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 glass-morphism rounded-lg p-4 shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    toast.innerHTML = `
      <div class="flex items-center">
        <span class="text-2xl mr-3">💕</span>
        <div>
          <p class="font-medium text-gradient">感谢您的祝福！</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">您的留言我们已经收到</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);
    
    // 自动消失
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  /**
   * 添加交互动画
   */
  addInteractiveAnimations() {
    // 鼠标跟随效果（可选）
    document.addEventListener('mousemove', (e) => {
      const hearts = document.querySelectorAll('.floating-heart');
      hearts.forEach((heart, index) => {
        const speed = (index + 1) * 0.1;
        const x = e.clientX * speed;
        const y = e.clientY * speed;
        
        heart.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }
  
  /**
   * 初始化合照轮播 - 简化版
   */
  initCouplePhotosCarousel() {
    // 初始化 Swiper 轮播
    if (typeof window.Swiper !== 'undefined' && document.querySelector('.couple-swiper')) {
      this.coupleSwiper = new window.Swiper('.couple-swiper', {
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        pagination: {
          el: '.couple-pagination',
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + ' !bg-white !w-3 !h-3 !opacity-60 hover:!opacity-100 !transition-all"></span>';
          }
        },
        navigation: {
          nextEl: '.couple-nav-next',
          prevEl: '.couple-nav-prev',
        },
        keyboard: {
          enabled: true,
        },
        // 使用渐变过渡效果
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        // 性能优化
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
        },
        // 响应式设置
        breakpoints: {
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }
      });
      
      console.log('合影轮播初始化成功');
    } else {
      console.warn('Swiper库未加载或找不到.couple-swiper元素');
    }
  }
}