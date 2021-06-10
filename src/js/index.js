import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/list.scss';

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);
