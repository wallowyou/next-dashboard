const data = {
  languages: [
    {
      value: 'en-US',
      name: 'English (United States)',
      prompt_name: 'English',
      example: 'Hello!',
      supported: true,
    },
    {
      value: 'zh-Hans',
      name: '简体中文',
      prompt_name: 'Chinese Simplified',
      example: '你好！',
      supported: true,
    },
    // 添加你需要支持的其他语言
  ],
} as const

export default data