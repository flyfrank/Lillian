/**
 * SPA 路由系统 - 爱情纪念网站
 * 
 * 管理单页应用的路由、页面切换和状态管理
 * 支持历史记录、深链接和平滑过渡
 * 
 * @version 2.0
 * @author Love Memorial Team
 */

import { siteConfig } from '../data/events.js';

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.history = [];
    this.isNavigating = false;
    this.transitionDuration = 500;
    
    // 绑定事件
    this.bindEvents();
    
    // 初始化路由
    this.initializeRoutes();
  }

  /**
   * 注册路由
   */
  initializeRoutes() {
    // 根路径重定向到hero页面
    this.addRoute('/', {
      name: 'home',
      component: 'HeroPage',
      title: `${siteConfig.title} - ${siteConfig.subtitle}`,
      meta: {
        description: siteConfig.description,
        keywords: '爱情,纪念,回忆,时光,浪漫'
      }
    });

    this.addRoute('/hero', {
      name: 'hero',
      component: 'HeroPage',
      title: `欢迎来到${siteConfig.title}`,
      meta: {
        description: '爱情的数字化博物馆封面页',
        keywords: '爱情,封面,欢迎'
      }
    });

    this.addRoute('/timeline', {
      name: 'timeline',
      component: 'TimelinePage',
      title: `时光轴 - ${siteConfig.title}`,
      meta: {
        description: '我们共同度过的美好时光',
        keywords: '时光轴,回忆,纪念日'
      }
    });

    this.addRoute('/gallery', {
      name: 'gallery',
      component: 'GalleryPage',
      title: `回忆画廊 - ${siteConfig.title}`,
      meta: {
        description: '精选的珍贵照片和回忆',
        keywords: '画廊,照片,回忆'
      }
    });

    this.addRoute('/about', {
      name: 'about',
      component: 'AboutPage',
      title: `关于我们 - ${siteConfig.title}`,
      meta: {
        description: '了解我们的爱情故事',
        keywords: '关于,爱情故事,我们'
      }
    });

    this.addRoute('/event/:id', {
      name: 'event-detail',
      component: 'EventDetailPage',
      title: '详情页面',
      meta: {
        description: '纪念日详情页面',
        keywords: '详情,纪念日'
      }
    });

    this.addRoute('/search', {
      name: 'search',
      component: 'SearchPage',
      title: `搜索 - ${siteConfig.title}`,
      meta: {
        description: '搜索回忆和纪念日',
        keywords: '搜索,查找'
      }
    });

    this.addRoute('/settings', {
      name: 'settings',
      component: 'SettingsPage',
      title: `设置 - ${siteConfig.title}`,
      meta: {
        description: '个性化设置',
        keywords: '设置,主题,偏好'
      }
    });
  }

  /**
   * 添加路由
   */
  addRoute(path, config) {
    // 从路径中自动提取参数名称
    const paramNames = [];
    const paramMatches = path.match(/:([^/]+)/g);
    if (paramMatches) {
      paramMatches.forEach(match => {
        paramNames.push(match.substring(1)); // 移除冒号
      });
    }
    
    const regex = this.pathToRegex(path);
    
    this.routes.set(path, {
      ...config,
      path,
      regex,
      paramNames
    });
  }

  /**
   * 路径转正则表达式
   */
  pathToRegex(path) {
    let regexPath = path
      .replace(/\//g, '\\/')
      .replace(/:([^/]+)/g, '([^/]+)');
    
    return new RegExp(`^${regexPath}$`);
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    // 监听浏览器前进后退
    window.addEventListener('popstate', (event) => {
      this.handlePopState(event);
    });

    // 监听链接点击
    document.addEventListener('click', (event) => {
      this.handleLinkClick(event);
    });

    // 监听页面加载
    document.addEventListener('DOMContentLoaded', () => {
      this.handleInitialRoute();
    });
  }

  /**
   * 处理初始路由
   */
  handleInitialRoute() {
    const path = window.location.pathname + window.location.search;
    this.navigate(path, { replace: true });
  }

  /**
   * 处理浏览器前进后退
   */
  handlePopState(event) {
    const path = window.location.pathname + window.location.search;
    this.navigate(path, { 
      replace: true, 
      fromPopState: true,
      state: event.state 
    });
  }

  /**
   * 处理链接点击
   */
  handleLinkClick(event) {
    const link = event.target.closest('a[href]');
    
    if (!link) return;
    if (link.hostname !== window.location.hostname) return;
    if (link.hasAttribute('download')) return;
    if (link.hasAttribute('external')) return;
    if (event.ctrlKey || event.metaKey || event.shiftKey) return;

    event.preventDefault();
    
    const href = link.getAttribute('href');
    this.navigate(href);
  }

  /**
   * 导航到指定路径
   */
  async navigate(path, options = {}) {
    if (this.isNavigating) return;
    
    const {
      replace = false,
      fromPopState = false,
      state = null,
      transition = true
    } = options;

    try {
      this.isNavigating = true;

      // 查找匹配的路由
      const route = this.findRoute(path);
      
      if (!route) {
        console.warn(`No route found for path: ${path}`);
        // 重定向到首页而不是404
        if (path !== '/' && path !== '/hero') {
          this.navigate('/', { replace: true });
          return;
        }
        // 如果连首页都找不到，则显示错误
        this.navigate('/error', { replace: true });
        return;
      }

      // 提取参数
      const params = this.extractParams(path, route);
      const query = this.extractQuery(path);

      // 创建路由上下文
      const routeContext = {
        route,
        path,
        params,
        query,
        state,
        fromPopState
      };

      // 执行路由守卫
      const canNavigate = await this.executeGuards(routeContext);
      if (!canNavigate) {
        this.isNavigating = false;
        return;
      }

      // 更新历史记录
      if (!fromPopState) {
        if (replace) {
          window.history.replaceState(state, '', path);
        } else {
          window.history.pushState(state, '', path);
        }
      }

      // 执行页面切换
      if (transition) {
        await this.executePageTransition(routeContext);
      } else {
        await this.renderPage(routeContext);
      }

      // 更新当前路由
      this.currentRoute = routeContext;
      this.history.push(routeContext);

      // 更新页面元数据
      this.updateMetadata(route);

      // 触发路由变化事件
      this.emit('route:changed', routeContext);

    } catch (error) {
      console.error('Navigation error:', error);
      this.navigate('/error', { replace: true });
    } finally {
      this.isNavigating = false;
    }
  }

  /**
   * 查找匹配的路由
   */
  findRoute(path) {
    const pathname = path.split('?')[0];
    
    for (const [routePath, route] of this.routes) {
      if (route.regex.test(pathname)) {
        return route;
      }
    }
    
    return null;
  }

  /**
   * 提取路径参数
   */
  extractParams(path, route) {
    const pathname = path.split('?')[0];
    const matches = pathname.match(route.regex);
    
    if (!matches) return {};
    
    const params = {};
    route.paramNames.forEach((name, index) => {
      params[name] = matches[index + 1];
    });
    
    return params;
  }

  /**
   * 提取查询参数
   */
  extractQuery(path) {
    const queryString = path.split('?')[1];
    if (!queryString) return {};
    
    const params = new URLSearchParams(queryString);
    const query = {};
    
    for (const [key, value] of params) {
      query[key] = value;
    }
    
    return query;
  }

  /**
   * 执行路由守卫
   */
  async executeGuards(routeContext) {
    // 这里可以添加全局路由守卫逻辑
    // 例如：权限检查、登录状态验证等
    
    // 触发守卫事件
    const guardResult = this.emit('route:guard', routeContext);
    
    // 如果有监听器返回 false，则阻止导航
    return !guardResult.some(result => result === false);
  }

  /**
   * 执行页面切换动画
   */
  async executePageTransition(routeContext) {
    const app = document.getElementById('app');
    if (!app) return this.renderPage(routeContext);

    // 添加离开动画
    app.classList.add('page-leaving');
    
    // 等待动画完成
    await this.delay(this.transitionDuration / 2);
    
    // 渲染新页面
    await this.renderPage(routeContext);
    
    // 添加进入动画
    app.classList.remove('page-leaving');
    app.classList.add('page-entering');
    
    // 等待动画完成
    await this.delay(this.transitionDuration / 2);
    
    // 清理动画类
    app.classList.remove('page-entering');
  }

  /**
   * 渲染页面
   */
  async renderPage(routeContext) {
    const { route, params, query } = routeContext;
    
    // 动态导入页面组件
    try {
      const componentModule = await import(`../pages/${route.component}.js`);
      const PageComponent = componentModule.default || componentModule[route.component];
      
      // 创建页面实例
      const pageInstance = new PageComponent({
        route,
        params,
        query,
        router: this
      });
      
      // 渲染页面
      const app = document.getElementById('app');
      if (app) {
        app.innerHTML = await pageInstance.render();
        
        // 执行页面初始化
        if (typeof pageInstance.mount === 'function') {
          await pageInstance.mount();
        }
      }
      
    } catch (error) {
      console.error(`Failed to load page component: ${route.component}`, error);
      throw error;
    }
  }

  /**
   * 更新页面元数据
   */
  updateMetadata(route) {
    // 更新标题
    document.title = route.title;
    
    // 更新 meta 标签
    if (route.meta) {
      this.updateMetaTag('description', route.meta.description);
      this.updateMetaTag('keywords', route.meta.keywords);
    }
  }

  /**
   * 更新 meta 标签
   */
  updateMetaTag(name, content) {
    if (!content) return;
    
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  /**
   * 事件发射器
   */
  emit(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
    
    // 返回监听器的结果（用于守卫）
    const listeners = this.getEventListeners(eventName);
    return listeners.map(listener => listener(data));
  }

  /**
   * 获取事件监听器
   */
  getEventListeners(eventName) {
    // 简化版本，实际项目中可以使用更复杂的事件系统
    return [];
  }

  /**
   * 延迟函数
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 获取当前路由
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * 生成路径
   */
  generatePath(routeName, params = {}, query = {}) {
    const route = Array.from(this.routes.values()).find(r => r.name === routeName);
    if (!route) return '/';
    
    let path = route.path;
    
    // 替换参数
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
    
    // 添加查询参数
    const queryString = new URLSearchParams(query).toString();
    if (queryString) {
      path += `?${queryString}`;
    }
    
    return path;
  }

  /**
   * 编程式导航方法
   */
  push(path, state = null) {
    return this.navigate(path, { state });
  }

  replace(path, state = null) {
    return this.navigate(path, { replace: true, state });
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  go(delta) {
    window.history.go(delta);
  }
}

// 创建全局路由实例
const router = new Router();

// 导出路由实例和路由类
export default router;
export { Router };