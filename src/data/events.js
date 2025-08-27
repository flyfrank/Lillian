/**
 * 爱情纪念日数据配置文件 - 升级版
 * 
 * 这个文件包含了所有需要展示的纪念日和特殊时刻
 * 支持丰富的多媒体内容、标签系统和详细元数据
 * 
 * 要添加新的纪念日，只需在 loveEvents 数组中添加新的对象即可
 * 
 * @version 2.0
 * @author Love Memorial Team
 */

// 网站配置信息
export const siteConfig = {
  title: "我们的爱情时光",
  subtitle: "爱情的数字化博物馆",
  description: "记录我们共同度过的每一个美好瞬间",
  authors: {
    male: "亲爱的他",
    female: "亲爱的她"
  },
  anniversary: {
    startDate: "2025-08-16",
    startDateLunar: "六月廿三"
  },
  theme: {
    default: "warm", // warm | dark
    allowToggle: true
  },
  social: {
    // 可选的社交媒体链接
    // instagram: "@our_love_story",
    // weibo: "@我们的爱情故事"
  }
};

// 事件类型定义
export const eventTypes = {
  traditional: {
    name: "传统节日",
    icon: "🎊",
    color: "brand-pink",
    description: "中华传统节日纪念"
  },
  birthday: {
    name: "生日",
    icon: "🎂", 
    color: "brand-gold",
    description: "生日庆祝时光"
  },
  anniversary: {
    name: "纪念日",
    icon: "💕",
    color: "pink",
    description: "特殊纪念时刻"
  },
  travel: {
    name: "旅行",
    icon: "✈️",
    color: "blue",
    description: "一起的旅行足迹"
  },
  milestone: {
    name: "里程碑",
    icon: "🌟",
    color: "purple",
    description: "重要人生节点"
  }
};

// 主要事件数据
export const loveEvents = [
  {
    id: 'spring-festival-2024',
    type: 'traditional',
    
    // 日期信息
    dates: {
      lunar: '正月初一',
      gregorian: '2024-02-10',
      year: '2024',
      displayDate: '正月初一'
    },
    
    // 基本信息
    name: '春节',
    title: '第一次一起过年',
    location: '家里',
    weather: '晴朗',
    
    // 内容描述
    description: {
      short: '我们第一次一起贴春联、包饺子、看春晚',
      long: `这是我们第一次一起过年，从准备年货到贴春联，从包饺子到看春晚，每一个环节都充满了甜蜜。你说以后每年都要这样过，我点头答应，心里已经开始期待明年的春节了。\n\n最难忘的是我们一起包饺子的时候，你手把手教我擀皮，虽然我包的歪七扭八，但你说那是世界上最美的饺子。除夕夜我们守岁到零点，一起许下新年愿望，愿我们的爱情如春节的烟花一样绚烂永恒。`,
      highlights: [
        '一起贴春联和窗花',
        '手把手教我包饺子', 
        '除夕夜一起守岁',
        '看春晚时的温馨时光'
      ]
    },
    
    // 多媒体内容
    media: {
      coverImage: {
        src: '/assets/images/default-cover.svg',
        alt: '春节合影',
        position: 'center'
      },
      gallery: [
        {
          src: '/assets/images/spring-festival-2024-1.jpg',
          alt: '贴春联',
          caption: '一起贴春联，满满的仪式感'
        },
        {
          src: '/assets/images/spring-festival-2024-2.jpg', 
          alt: '包饺子',
          caption: '你教我包饺子的温馨画面'
        },
        {
          src: '/assets/images/spring-festival-2024-3.jpg',
          alt: '年夜饭',
          caption: '丰盛的年夜饭，满桌的爱意'
        },
        {
          src: '/assets/images/spring-festival-2024-4.jpg',
          alt: '烟花',
          caption: '零点时分的烟花，如我们的爱情'
        }
      ],
      // 可选的视频内容
      video: {
        src: '/assets/videos/spring-festival-2024.mp4',
        poster: '/assets/images/spring-festival-2024-video-poster.jpg',
        caption: '春节的美好瞬间合集'
      }
    },
    
    // 元数据
    metadata: {
      tags: ['传统', '家庭', '温馨', '第一次', '除夕'],
      mood: 'joyful', // joyful, romantic, peaceful, excited, nostalgic
      significance: 5, // 1-5星重要程度
      isPublic: true, // 是否公开显示
      featured: true, // 是否为精选内容
      createdAt: '2024-02-11',
      updatedAt: '2024-02-11'
    },
    
    // 主题配色 (Tailwind classes)
    theme: {
      primary: 'from-red-400 to-pink-400',
      secondary: 'from-red-100 to-pink-100',
      accent: 'red-500'
    }
  },
  
  {
    id: 'lantern-festival-2024',
    type: 'traditional',
    
    dates: {
      lunar: '正月十五',
      gregorian: '2024-02-24',
      year: '2024',
      displayDate: '正月十五'
    },
    
    name: '元宵节',
    title: '携手看灯会',
    location: '市中心灯会',
    weather: '微寒',
    
    description: {
      short: '人潮涌动中你紧紧握着我的手，在五彩斑斓的花灯下许下心愿',
      long: `还记得那天人潮涌动，你紧紧握着我的手，我们在五彩斑斓的花灯下许下心愿。你猜我许了什么愿？我的愿望是每年灯会身边都是你。\n\n我们看到了巨大的龙灯、精美的荷花灯，还有那盏写着"有情人终成眷属"的红灯笼。你说这盏灯笼就像是为我们准备的，我笑着点头，心里满满的都是幸福。`,
      highlights: [
        '五彩斑斓的花灯海洋',
        '许下美好的心愿',
        '"有情人终成眷属"的红灯笼',
        '人群中紧握的双手'
      ]
    },
    
    media: {
      coverImage: {
        src: '/assets/images/default-cover.svg',
        alt: '灯会合影',
        position: 'center'
      },
      gallery: [
        {
          src: '/assets/images/lantern-festival-2024-1.jpg',
          alt: '花灯',
          caption: '漂亮的荷花灯，如你一样美丽'
        },
        {
          src: '/assets/images/lantern-festival-2024-2.jpg',
          alt: '龙灯',
          caption: '气势磅礴的巨龙灯'
        }
      ]
    },
    
    metadata: {
      tags: ['传统', '灯会', '许愿', '浪漫'],
      mood: 'romantic',
      significance: 4,
      isPublic: true,
      featured: true,
      createdAt: '2024-02-25',
      updatedAt: '2024-02-25'
    },
    
    theme: {
      primary: 'from-orange-400 to-red-400',
      secondary: 'from-orange-100 to-red-100', 
      accent: 'orange-500'
    }
  },

  {
    id: 'dragon-boat-2024',
    type: 'traditional',
    
    dates: {
      lunar: '五月初五',
      gregorian: '2024-06-10',
      year: '2024',
      displayDate: '五月初五'
    },
    
    name: '端午节',
    title: '我们一起包的第一个粽子',
    location: '家里厨房',
    weather: '温暖',
    
    description: {
      short: '你说要教我包粽子，结果我包的歪七扭八，你笑得直不起腰',
      long: `你说要教我包粽子，结果我包的歪七扭八，你笑得直不起腰。最后还是你一个人包了一大锅，我负责在旁边添乱和偷吃。\n\n虽然我的手艺不行，但你说这是你吃过最香的粽子，因为里面包的是我们的爱情。我们还一起看了龙舟比赛的直播，你说明年要带我去现场看真正的龙舟赛。`,
      highlights: [
        '第一次学包粽子',
        '歪七扭八的成品',
        '你温柔的笑声',
        '一起看龙舟比赛'
      ]
    },
    
    media: {
      coverImage: {
        src: '/assets/images/default-cover.svg',
        alt: '包粽子',
        position: 'center'
      },
      gallery: [
        {
          src: '/assets/images/dragon-boat-2024-1.jpg',
          alt: '包粽子过程',
          caption: '你手把手教我包粽子'
        },
        {
          src: '/assets/images/dragon-boat-2024-2.jpg',
          alt: '粽子成品',
          caption: '虽然形状奇怪，但味道很棒'
        }
      ]
    },
    
    metadata: {
      tags: ['传统', '美食', '学习', '温馨'],
      mood: 'joyful',
      significance: 4,
      isPublic: true,
      featured: false,
      createdAt: '2024-06-11',
      updatedAt: '2024-06-11'
    },
    
    theme: {
      primary: 'from-green-400 to-teal-400',
      secondary: 'from-green-100 to-teal-100',
      accent: 'green-500'
    }
  },

  {
    id: 'qixi-2023',
    type: 'traditional',
    
    dates: {
      lunar: '七月初七',
      gregorian: '2023-08-22',
      year: '2023',
      displayDate: '七月初七'
    },
    
    name: '七夕节',
    title: '我们的第一个七夕',
    location: '天台',
    weather: '星空璀璨',
    
    description: {
      short: '牛郎织女一年才能相会一次，而我每天都能见到你',
      long: `牛郎织女一年才能相会一次，而我每天都能见到你，这大概就是我最大的幸福。那晚我们在天台看星星，你说要做我永远的织女。\n\n我指着天上的星星告诉你哪个是牛郎星哪个是织女星，你说你找到了，还说银河虽然很美，但你更愿意和我走过人间的每一天。那一刻我觉得，拥有你比拥有整个星空还要幸福。`,
      highlights: [
        '天台看星星',
        '寻找牛郎织女星',
        '你说要做我永远的织女',
        '比银河更美的爱情'
      ]
    },
    
    media: {
      coverImage: {
        src: '/assets/images/default-cover.svg',
        alt: '七夕星空',
        position: 'center'
      },
      gallery: [
        {
          src: '/assets/images/qixi-2023-1.jpg',
          alt: '天台合影',
          caption: '星空下的我们'
        },
        {
          src: '/assets/images/qixi-2023-2.jpg',
          alt: '星空',
          caption: '那夜的星空格外璀璨'
        },
        {
          src: '/assets/images/qixi-2023-3.jpg',
          alt: '七夕礼物',
          caption: '你送给我的七夕礼物'
        }
      ]
    },
    
    metadata: {
      tags: ['传统', '浪漫', '星空', '第一次'],
      mood: 'romantic',
      significance: 5,
      isPublic: true,
      featured: true,
      createdAt: '2023-08-23',
      updatedAt: '2023-08-23'
    },
    
    theme: {
      primary: 'from-purple-400 to-indigo-400',
      secondary: 'from-purple-100 to-indigo-100',
      accent: 'purple-500'
    }
  },

  {
    id: 'mid-autumn-2023',
    type: 'traditional',
    
    dates: {
      lunar: '八月十五',
      gregorian: '2023-09-29',
      year: '2023',
      displayDate: '八月十五'
    },
    
    name: '中秋节',
    title: '月圆人更圆',
    location: '家里阳台',
    weather: '月明星稀',
    
    description: {
      short: '中秋的月亮格外圆，但我觉得没有你的笑容圆',
      long: `中秋的月亮格外圆，但我觉得没有你的笑容圆。我们坐在阳台上吃月饼赏月，你说月亮像你做的蛋黄酥，我说你比月亮还美。\n\n那晚的月亮真的很亮，照在你脸上的时候，我觉得嫦娥也要嫉妒你的美丽。我们分享着同一块月饼，你说这叫"分享甜蜜"，我说这叫"永结同心"。`,
      highlights: [
        '阳台赏月的温馨',
        '分享同一块月饼',
        '月光下的你最美',
        '"分享甜蜜"的约定'
      ]
    },
    
    media: {
      coverImage: {
        src: '/assets/images/default-cover.svg',
        alt: '中秋赏月',
        position: 'center'
      },
      gallery: [
        {
          src: '/assets/images/mid-autumn-2023-1.jpg',
          alt: '月饼',
          caption: '精美的月饼礼盒'
        },
        {
          src: '/assets/images/mid-autumn-2023-2.jpg',
          alt: '赏月',
          caption: '阳台赏月的我们'
        }
      ]
    },
    
    metadata: {
      tags: ['传统', '赏月', '月饼', '团圆'],
      mood: 'peaceful',
      significance: 4,
      isPublic: true,
      featured: false,
      createdAt: '2023-09-30',
      updatedAt: '2023-09-30'
    },
    
    theme: {
      primary: 'from-yellow-400 to-orange-400',
      secondary: 'from-yellow-100 to-orange-100',
      accent: 'yellow-500'
    }
  },

  {
    id: 'her-birthday-2023',
    type: 'birthday',
    
    dates: {
      lunar: '九月初八',
      gregorian: '2023-10-20',
      year: '2023',
      displayDate: '10月20日'
    },
    
    name: '你的生日',
    title: '给你的惊喜派对',
    location: '我们的小家',
    weather: '温暖如春',
    
    description: {
      short: '这是我第一次为你准备生日惊喜',
      long: `这是我第一次为你准备生日惊喜，看到你推开门时惊讶又开心的表情，我觉得一切准备都值了。生日快乐，我的女孩！\n\n我提前一周就开始准备，偷偷订了你最喜欢的蛋糕，买了你心仪已久的礼物，还邀请了你的好朋友们。当你看到满屋子的气球和"生日快乐"的横幅时，你感动得眼泪都出来了。`,
      highlights: [
        '精心准备的惊喜派对',
        '你最喜欢的蛋糕',
        '心仪已久的礼物',
        '感动的眼泪'
      ]
    },
    
    media: {
      coverImage: {
        src: '/assets/images/default-cover.svg',
        alt: '生日惊喜',
        position: 'center'
      },
      gallery: [
        {
          src: '/assets/images/her-birthday-2023-1.jpg',
          alt: '生日蛋糕',
          caption: '精美的生日蛋糕'
        },
        {
          src: '/assets/images/her-birthday-2023-2.jpg',
          alt: '生日礼物',
          caption: '特别为你准备的礼物'
        },
        {
          src: '/assets/images/her-birthday-2023-3.jpg',
          alt: '派对现场',
          caption: '温馨的生日派对现场'
        }
      ]
    },
    
    metadata: {
      tags: ['生日', '惊喜', '派对', '第一次'],
      mood: 'joyful',
      significance: 5,
      isPublic: true,
      featured: true,
      createdAt: '2023-10-21',
      updatedAt: '2023-10-21'
    },
    
    theme: {
      primary: 'from-pink-400 to-purple-400',
      secondary: 'from-pink-100 to-purple-100',
      accent: 'pink-500'
    }
  },

  {
    id: 'my-birthday-2024',
    type: 'birthday',
    
    dates: {
      lunar: '五月初二',
      gregorian: '2024-06-08',
      year: '2024',
      displayDate: '6月8日'
    },
    
    name: '我的生日',
    title: '你亲手做的生日蛋糕',
    location: '家里',
    weather: '阳光明媚',
    
    description: {
      short: '你偷偷学了好久做蛋糕',
      long: `你偷偷学了好久做蛋糕，虽然样子不太完美，但那是我吃过最甜的蛋糕。因为里面有你满满的爱意。\n\n原来你早在一个月前就开始偷偷练习做蛋糕，还专门去烘焙班学习。虽然最后做出来的蛋糕有点歪，但当你端着蛋糕唱生日歌的时候，我觉得你就是世界上最美的天使。`,
      highlights: [
        '偷偷学习做蛋糕',
        '虽不完美但充满爱意',
        '最甜的生日蛋糕',
        '你就是最美的天使'
      ]
    },
    
    media: {
      coverImage: {
        src: '/assets/images/default-cover.svg',
        alt: '自制生日蛋糕',
        position: 'center'
      },
      gallery: [
        {
          src: '/assets/images/my-birthday-2024-1.jpg',
          alt: '制作过程',
          caption: '你认真做蛋糕的样子最美'
        },
        {
          src: '/assets/images/my-birthday-2024-2.jpg',
          alt: '成品蛋糕',
          caption: '虽然不完美，但充满爱意'
        }
      ]
    },
    
    metadata: {
      tags: ['生日', '手工', '蛋糕', '用心'],
      mood: 'nostalgic',
      significance: 5,
      isPublic: true,
      featured: true,
      createdAt: '2024-06-09',
      updatedAt: '2024-06-09'
    },
    
    theme: {
      primary: 'from-blue-400 to-indigo-400',
      secondary: 'from-blue-100 to-indigo-100',
      accent: 'blue-500'
    }
  },

  {
    id: 'anniversary-2025',
    type: 'anniversary',
    
    dates: {
      lunar: '六月廿三',
      gregorian: '2025-08-16',
      year: '2025',
      displayDate: '8月16日'
    },
    
    name: '恋爱纪念日',
    title: '我们在一起的第一天',
    location: '那个秋天的上午',
    weather: '春风和煦',
    
    description: {
      short: '你噙着温柔的笑向我走来，世界有了色彩',
      long: `那是一个秋日上午，暑气仍没褪尽，空气里还裹着夏日末段的燥热，你抱着一束清透的蓝色花束走来，长发松松地披在肩头，嘴角噙着温柔的笑意。明明周遭还是闷热的夏意，可你走近时，却像一缕冬日里最暖的阳光，轻轻照进了我有些沉闷的世界。\n\n我还记得那天的每一个细节——没有春日的微风，只有夏末偶尔掠过的、带着热气的风，却因你的出现变得格外温柔；阳光比春日更烈些，落在你身上，把那件米黄色的裙子衬得愈发温柔，像酷暑里悄悄浸了凉意的云朵，又像晒透了阳光的麦穗，带着让人安心的暖软气息，消解了周遭大半的燥热。`,
      highlights: [
        '那是一个秋日上午',
        '你噙着温柔的笑',
        '世界有了色彩',
        '一起走过四季的约定'
      ]
    },
    
    media: {
      coverImage: {
        src: '/assets/images/20250816/20250816-1.jpg',
        alt: '恋爱纪念日',
        position: 'center'
      },
      gallery: [
        {
          src: '/assets/images/20250816/20250816-1.jpg',
          alt: '遇见的那一刻',
          caption: '那个改变一切的秋天的上午'
        },
        {
          src: '/assets/images/20250816/20250816-2.jpg',
          alt: '靠近那一刻',
          caption: '一起动手做苔藓景观将我们的距离拉近'
        },
        {
          src: '/assets/images/20250816/20250816-3.jpg',
          alt: '抓娃娃',
          caption: '一起去抓娃娃，一个一个超级满足'
        },
        {
          src: '/assets/images/20250816/20250816-4.jpg',
          alt: '做陶艺',
          caption: '你认真的样子非常迷人'
        },
        {
          src: '/assets/images/20250816/20250816-5.jpg',
          alt: '陶艺作品',
          caption: '5个小时的陶艺制作，成果斐然'
        },
        {
          src: '/assets/images/20250816/20250816-6.jpg',
          alt: '对眼相望',
          caption: '对眼相望，把你深深的刻进脑海'
        },
      ]
    },
    
    metadata: {
      tags: ['纪念日', '表白', '开始', '秋天'],
      mood: 'romantic',
      significance: 5,
      isPublic: true,
      featured: true,
      createdAt: '2025-08-16',
      updatedAt: '2025-08-27'
    },
    
    theme: {
      primary: 'from-rose-400 to-pink-400',
      secondary: 'from-rose-100 to-pink-100',
      accent: 'rose-500'
    }
  }
];

// 工具函数
export const utils = {
  // 根据类型获取事件
  getEventsByType: (type) => {
    return loveEvents.filter(event => event.type === type);
  },
  
  // 根据年份获取事件
  getEventsByYear: (year) => {
    return loveEvents.filter(event => event.dates.year === year);
  },
  
  // 获取精选事件
  getFeaturedEvents: () => {
    return loveEvents.filter(event => event.metadata.featured);
  },
  
  // 根据重要程度排序
  sortBySignificance: () => {
    return [...loveEvents].sort((a, b) => b.metadata.significance - a.metadata.significance);
  },
  
  // 根据日期排序
  sortByDate: (ascending = false) => {
    return [...loveEvents].sort((a, b) => {
      const dateA = new Date(a.dates.gregorian);
      const dateB = new Date(b.dates.gregorian);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  },
  
  // 搜索事件
  searchEvents: (query) => {
    const lowerQuery = query.toLowerCase();
    return loveEvents.filter(event => 
      event.name.toLowerCase().includes(lowerQuery) ||
      event.title.toLowerCase().includes(lowerQuery) ||
      event.description.short.toLowerCase().includes(lowerQuery) ||
      event.metadata.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },
  
  // 计算相爱天数
  getDaysInLove: () => {
    const startDate = new Date(siteConfig.anniversary.startDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },
  
  // 获取统计信息
  getStatistics: () => {
    return {
      totalEvents: loveEvents.length,
      daysInLove: utils.getDaysInLove(),
      eventsByType: Object.keys(eventTypes).reduce((acc, type) => {
        acc[type] = utils.getEventsByType(type).length;
        return acc;
      }, {}),
      featuredCount: utils.getFeaturedEvents().length
    };
  }
};

// 导出默认数据（保持向后兼容）
export default loveEvents;