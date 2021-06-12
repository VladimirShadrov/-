import { data } from './data';

export function getDomItem(selector) {
  const item = document.querySelector(selector);
  return item;
}

// Элементы для динамической отрисовки элементов списка
export function createDropdownItem(data, parentElement) {
  const html = `
  <div class="list__item-wrapper">
    <div class="list__item" data-id="${data.id}" data-name="dropdown">
      <div class="list__selector"></div>
      <p class="list__item-title">${data.name}</p>
    </div>
    <p class="list__item-empty hide">Данные об этой группе отсутвуют</p>
  </div>
  `;

  parentElement.firstElementChild.insertAdjacentHTML('beforeend', html);
  return html;
}

export function createInsideDropdownItem(data, placeToInsert) {
  const html = `
  <div class="list__inside-list-item" data-name="inside-dropdown" data-id="${data.id}">
    <div class="list__inside-selector"></div>
    <p class="list__inside-item-title">${data.name}</p>
  </div>
  `;

  placeToInsert.insertAdjacentHTML('beforeend', html);
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

export function createCheckbox(data, placeToInsert) {
  const html = `
    <div class="list__checkbox-item" data-id="${data.id}" data-name="checkbox">
      <div class="list__checkbox"></div>
      <p class="list__checkbox-title">${data.name}</p>
    </div>
  `;

  placeToInsert.insertAdjacentHTML('beforeend', html);
}

export function createInsideCheckboxItem(data, placeToInsert) {
  let html = '';

  data.forEach((item) => {
    html += `
    <div class="list__inside-checkbox-item" data-id="${item.id}" data-name="inside-checkbox" data-parent-id="${item.parentId}" data-top-level-id="${item.topLevelId}">
      <div class="list__inside-checkbox"></div>
      <p class="list__checkbox-title">${item.name}</p>
    </div>
    `;
  });

  placeToInsert.insertAdjacentHTML('afterbegin', html);
}

// Изменить картинку при клике на чекбокс или спойлер
export function changeListItemImage(targetItem, className) {
  targetItem.firstElementChild.classList.toggle(className);
}

// Открыть спойлер
export function openAndCloseDropdown(targetItem, data, className) {
  const targetData = data.find((item) => item.id === +targetItem.dataset.id);

  if (
    targetData.groups[0] === 'empty' &&
    !targetItem.firstElementChild.classList.contains(className)
  ) {
    targetItem.nextElementSibling.classList.remove('hide');
  } else {
    targetItem.nextElementSibling.classList.add('hide');
  }

  if (
    targetData.groups[0] !== 'empty' &&
    !targetItem.firstElementChild.classList.contains(className)
  ) {
    const div = document.createElement('div');
    targetItem.parentNode.insertAdjacentElement('beforeend', div);
    div.classList.add('template-container');

    let wrapper = getDomItem('.template-container');

    createList(
      targetData.groups,
      wrapper,
      createInsideDropdownItem,
      createCheckbox
    );
  }

  if (
    targetData.groups[0] !== 'empty' &&
    targetItem.firstElementChild.classList.contains(className)
  ) {
    targetItem.nextElementSibling.nextElementSibling.remove();
  }
}

export function createList(data, placeToInsert, createDropdown, createChekbox) {
  data.forEach((dataItem) => {
    if (dataItem.groups.length) {
      createDropdown(dataItem, placeToInsert);
    } else {
      createChekbox(dataItem, placeToInsert);
    }
  });
}

export function openAndCloseNestedDropdown(targetItem, data, className) {
  const objectWidthData = data.filter((item) => {
    if (item.groups.length && item.groups[0] !== 'empty') {
      return item;
    }
  });

  const dataFromObject = objectWidthData[0].groups;
  const currentData = dataFromObject.find(
    (item) => item.id === +targetItem.dataset.id
  );

  const div = document.createElement('div');
  div.classList.add('list__inside-container');

  if (!targetItem.firstElementChild.classList.contains(className)) {
    targetItem.insertAdjacentElement('afterend', div);
    createInsideCheckboxItem(currentData.groups, targetItem.nextElementSibling);
    targetItem.firstElementChild.classList.add(className);
  } else {
    targetItem.firstElementChild.classList.remove(className);
    targetItem.nextElementSibling.remove();
  }
}

// Добавить ID родителя и ID корневой группы вложенным элементам
export function setParentIdNestedElements(data) {
  const topLevelElementsWidthFilledGroups = getElementsWidthFilledGroups(data);

  topLevelElementsWidthFilledGroups.forEach((parent) => {
    const secondLevelElementsWidthFilledGroups = getElementsWidthFilledGroups(
      parent.groups
    );

    secondLevelElementsWidthFilledGroups.forEach((nestedItem) => {
      nestedItem.groups.forEach((checkbox) => {
        checkbox.parentId = nestedItem.id;
        checkbox.topLevelId = parent.id;
      });
    });
  });
}

function getElementsWidthFilledGroups(data) {
  const result = data.filter((item) => {
    if (item.groups.length && item.groups[0] !== 'empty') {
      return item;
    }
  });

  return result;
}
