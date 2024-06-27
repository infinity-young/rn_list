import { Dimensions, Platform } from 'react-native';

/* 判断是否是iPhoneX 或 类iPhoneX的刘海设备（目前包括iPhone XR, XS 和 XS Max）或包含灵动岛的设备（目前包括iPhone14 Pro和iPhone 14 Pro Max）
*/
export function isIphoneX() {
   // 后续苹果推出新尺寸的新设备，需要新增判断
   return isNotch() || DynamicIsland()
}
//判断是否是有刘海屏的ios手机
function isNotch() {
   const { height, width } = Dimensions.get('window')
   return (
       Platform.OS === 'ios' &&
       !Platform.isPad &&
       !Platform.isTVOS &&
       (height === 812 ||
           width === 812 ||
           height === 896 ||
           width === 896 ||
           width === 844 ||
           height === 844 ||
           width === 926 ||
           height === 926)
   )
}
//判断是否是有灵动岛的ios手机
function DynamicIsland() {
   const { height, width } = Dimensions.get('window')
   return (
       Platform.OS === 'ios' &&
       !Platform.isPad &&
       !Platform.isTVOS &&
       (height === 852 || width === 852 || height === 932 || width === 932)
   )
}