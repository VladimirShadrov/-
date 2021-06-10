export function getDomItem(selector) {
  const item = document.querySelector(selector);
  return item;
}

export function createDropdownItem(data, parentElement) {
  const html = `
  <div class="list__item-wrapper">
    <div class="list__item" data-id="${data.id}" data-name="dropdown">
      <!-- Для разворачивания списка добавить класс list__selector-active -->
      <div class="list__selector"></div>
      <p class="list__item-title">${data.name}</p>
    </div>
    <p class="list__item-empty hide">Данные об этой группе отсутвуют</p>
  </div>
  `;

  parentElement.firstElementChild.insertAdjacentHTML('beforeend', html);

  return html;
}

export function createCheckboxItemSingle(data, parentElement) {
  const html = `
  <div class="list__item-wrapper">
    <div class="list__checkbox-item-single" data-id="${data.id}" data-name="checkbox">
      <div class="list__checkbox"></div>
      <p class="list__checkbox-title">${data.name}</p>
    </div>
  </div>
  `;

  parentElement.firstElementChild.insertAdjacentHTML('beforeend', html);
}

export function changeListItemImage(targetItem, className) {
  targetItem.firstElementChild.classList.toggle(className);
}

export function openDropdown(targetItem, data, className) {
  const targetData = data.find((item) => item.id === +targetItem.dataset.id);

  if (
    targetData.groups[0] === 'empty' &&
    !targetItem.firstElementChild.classList.contains(className)
  ) {
    targetItem.nextElementSibling.classList.remove('hide');
  } else {
    targetItem.nextElementSibling.classList.add('hide');
  }

  // if (
  //   targetData.groups[0] === 'empty' &&
  //   targetItem.firstElementChild.classList.contains(className)
  // ) {
  //   targetItem.nextElementSibling.classList.add('hide');
  //   console.log(targetItem);
  // }
}
