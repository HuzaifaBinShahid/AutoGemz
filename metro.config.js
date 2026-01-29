const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
  resolveRequest: (context, moduleName, platform) => {
    if (
      context.originModulePath?.includes('expo-image-picker') &&
      (moduleName === './utils' || moduleName === '.\\utils')
    ) {
      const resolved = path.join(
        path.dirname(context.originModulePath),
        'utils.js'
      );
      return { type: 'sourceFile', filePath: resolved };
    }
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = config;

