const babelConfig = {
  presets: [
    [require.resolve('babel-preset-es2015'), {
      modules: false,
    }],
    require.resolve('babel-preset-es2016'),
    require.resolve('babel-preset-stage-1'),
    require.resolve('babel-preset-react'),
  ],
  plugins: [
    require.resolve('babel-plugin-lodash'),
    require.resolve('react-hot-loader/babel'),
  ],
};

export default babelConfig;
