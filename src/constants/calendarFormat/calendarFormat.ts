import { IDatePickerStrings } from 'office-ui-fabric-react';

export const calendarFormat: IDatePickerStrings = {
    months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],

    shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],

    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],

    shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],

    goToToday: 'Сегодня',
    prevMonthAriaLabel: 'Пред. месяц',
    nextMonthAriaLabel: 'След. месяц',
    prevYearAriaLabel: 'Пред. годr',
    nextYearAriaLabel: 'След. год',
    closeButtonAriaLabel: 'Закрыть',
};

export const formatDate = (date?: Date) => {
    let selectedDate = date ? date : new Date();
    return selectedDate.toLocaleDateString("ru-RU");
}