
const env = (userAgent?: string, platform?: string) => {

  const { userAgent: _userAgent, platform: _platform } = window.navigator;
  userAgent = userAgent || _userAgent
  platform = platform || _platform

  return {
    isWin: platform.includes('Win'),
    isMac: platform.includes('Mac'),
    isLinux: !!platform.match(/Linux|X11/i),

    isIpad: !!userAgent.match(/iPad/i),
    isMobile: !!userAgent.match(/mobile|phone/i),

    isAndroid: !!userAgent.match(/android/i),
    IsIphone: !!userAgent.match(/iphone/i),
    isWM: !!userAgent.match(/windows mobile/i),

    isWeChat: !!userAgent.match(/MicroMessenger/i),
  };
}
export default env