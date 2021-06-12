import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/list.scss';
import '../styles/footer.scss';
import { data } from './data';
import { createList } from './helpers';
import { getDomItem } from './helpers';
import { getArrayDomItems } from './helpers';
import { createDropdownItem } from './helpers';
import { createCheckboxItemSingle } from './helpers';
import { changeListItemImage } from './helpers';
import { openAndCloseDropdown } from './helpers';
import { openAndCloseNestedDropdown } from './helpers';
import { setParentIdNestedElements } from './helpers';

const list = getDomItem('.list');

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);

// Отрисовка элементов списка из массива данных

// Добавить ID родителей дочерним элементам
setParentIdNestedElements(data);

// Отрисовать динамический список
createList(data, list, createDropdownItem, createCheckboxItemSingle);

document.body.addEventListener('click', (event) => {
  event.preventDefault();

  if (event.target.dataset.name === 'dropdown') {
    openAndCloseDropdown(event.target, data, 'list__selector-active');
    changeListItemImage(event.target, 'list__selector-active');
  }

  if (event.target.dataset.name === 'checkbox') {
    changeListItemImage(event.target, 'list__checkbox-checked');
  }

  if (event.target.dataset.name === 'inside-checkbox') {
    changeListItemImage(event.target, 'list__inside-checkbox-checked');
  }

  if (event.target.dataset.name === 'inside-dropdown') {
    openAndCloseNestedDropdown(
      event.target,
      data,
      'list__inside-selector-active'
    );
  }

  if (event.target.classList.contains('footer__button')) {
    showResult();
  }
});

// Временная функция

function showResult() {
  const selectedInternalCheckboxes = getArrayDomItems(
    '.list__inside-checkbox-checked'
  );
  const selectedCheckboxes = getArrayDomItems('.list__checkbox-checked');

  const result = [];

  selectedInternalCheckboxes.forEach((item) => {
    result.push(
      +item.parentElement.dataset.id,
      +item.parentElement.dataset.parentid,
      +item.parentElement.dataset.toplevelid
    );
  });

  selectedCheckboxes.forEach((item) =>
    result.push(+item.parentElement.dataset.id)
  );

  console.log('groups: ', result);
}
