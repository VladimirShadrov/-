import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/list.scss';
import '../styles/footer.scss';
import { data } from './data';
import { getDomItem } from './helpers';
import { createDropdownItem } from './helpers';
import { createCheckboxItemSingle } from './helpers';
import { changeListItemImage } from './helpers';
import { openDropdown } from './helpers';

const list = getDomItem('.list');

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);

// Отрисовка элементов списка из массива данных
function createList(data, list) {
  data.forEach((dataItem) => {
    if (dataItem.groups.length) {
      createDropdownItem(dataItem, list);
    } else {
      createCheckboxItemSingle(dataItem, list);
    }
  });
}

createList(data, list);

document.body.addEventListener('click', (event) => {
  event.preventDefault();

  if (event.target.dataset.name === 'dropdown') {
    openDropdown(event.target, data, 'list__selector-active');
    changeListItemImage(event.target, 'list__selector-active');
  }

  if (event.target.dataset.name === 'checkbox') {
    changeListItemImage(event.target, 'list__checkbox-checked');
  }
});
