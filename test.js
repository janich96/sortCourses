// Список курсов
let courses = [
    { name: "Courses in England", prices: [0, 100] }, 
    { name: "Courses in Germany", prices: [500, null] }, 
    { name: "Courses in Italy", prices: [100, 200] }, 
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

// Функция поиска курсов по фильтрам цен пользователя
// Первый аргумент - массив курсов, второй - диапазон цен (фильтр)
function courseRange(courses, range) {
    
    const min = range[0];
    const max = range[1];
    const result = [];

    for (let course of courses) {
        
        // Если диапазон цен курсов попадает в фильтр, то добавляем в массив
        if (min >= course.prices[0] || max <= course.prices[1]) {
            result.push(course);
        }
    }

    return result;
}

// console.log(courseRange(courses, requiredRange1));
// console.log(courseRange(courses, requiredRange2));
// console.log(courseRange(courses, requiredRange3));


// Функция сортировки курсов по возрастанию/убыванию цены
function sortCourses(courses, value) {

    // Обработчик null
    function nullHandler(item) {
        if (item === null) {
            return 0;
        } else {
            return item;
        }
    }

    // Сортировка по сумме минимальной и максимальной цены курсов
    function sortFunc(courses) {

        // Сортировка по возрастанию
        if (value === 'ascending') {
            return courses.sort ((a, b) => 
                (nullHandler(a.prices[0] + a.prices[1]) - nullHandler(b.prices[0] + b.prices[1])));
        }

        // Сортировка по убыванию
        if (value === 'descending') {
            return courses.sort((a, b) => 
                (nullHandler(b.prices[0] + b.prices[1]) - nullHandler(a.prices[0] + a.prices[1])));
        }
    }

    return sortFunc(courses);
}

// console.log(sortCourses(courses, 'ascending'));
// console.log(sortCourses(courses, 'descending'));


// Ещё вариант - быстрая сортировка, так как webkit использует быструю сортировку для числовых значений 
// и сортировку слиянием для нечисловых значений, но spider monkey в firefox 
// использует только сортировку слиянием

// Функция быстрой сортировки - сортируем суммы минимальной и максимальной цены за курс
function quickSort(array, value, left = 0, right = array.length - 1) {

    // Функция смены значений - меняет между собой левое и правое значение
    function swap(array, left, right) {
        const temp = array[left];
        array[left] = array[right];
        array[right] = temp;
    }

    // Обработчик null - при наличии null возвращает ноль вместо значения 
    function nullHandler(item) {
        if (item === null) {
            return 0;
        } else {
            return item;
        }
    }
    
    // Сортировка по возрастанию
    if (value === 'ascending') {

        // Функция поиска опорного элемента массива и смены элементов, если они не соответсвтуют
        // условиям сортировки
        function findPivot(array, left, right) {
            const pivot = Math.floor((left + right) / 2);
            const pivotValue = nullHandler(array[pivot].prices[0]) + nullHandler(array[pivot].prices[1]);
    
            while(left <= right) {
                // Пока значение элемента левого указателя меньше значения опорного элемента,
                // сдвигаем левый указатель вправо
                while(nullHandler(array[left].prices[0]) + nullHandler(array[left].prices[1]) < pivotValue) {
                    left++;
                }
                // Пока значение элемента правого указателя больше значения опорного элемента,
                // сдвигаем правый указатель влево
                while(nullHandler(array[right].prices[0]) + nullHandler(array[right].prices[1]) > pivotValue) {
                    right--;
                }
                if (left <= right) {
                    // Меняем правый и левый элементы местами
                    swap(array, left, right);
                    left++;
                    right--;
                }
            }
            // Возвращаем новый опорный элемент
            return left;
        }

        // Определяем опорный элемент
        const pivot = findPivot(array, left, right);

        // Вызываем функцию сортировки
        if (left < pivot - 1) {
            quickSort(array, 'ascending', left, pivot - 1);
        }
        if (right > pivot) {
            quickSort(array, 'ascending', pivot, right);
        }
    }

    // Сортировка по убыванию
    if (value === 'descending') {

        // Функция поиска опорного элемента массива и смены элементов, если они не соответсвтуют
        // условиям сортировки
        function findPivot(array, left, right) {
            const pivot = Math.floor((left + right) / 2);
            const pivotValue = nullHandler(array[pivot].prices[0]) + nullHandler(array[pivot].prices[1]);
    
            while(left <= right) {
                // Пока значение элемента левого указателя больше значения опорного элемента,
                // сдвигаем левый указатель вправо
                while(nullHandler(array[left].prices[0]) + nullHandler(array[left].prices[1]) > pivotValue) {
                    left++;
                }
                // Пока значение элемента правого указателя меньше значения опорного элемента,
                // сдвигаем правый указатель влево
                while(nullHandler(array[right].prices[0]) + nullHandler(array[right].prices[1]) < pivotValue) {
                    right--;
                }
                if (left <= right) {
                    // Меняем правый и левый элементы местами
                    swap(array, left, right);
                    left++;
                    right--;
                }
            }
            // Возвращаем новый опорный элемент
            return left;
        }

        // Определяем опорный элемент
        const pivot = findPivot(array, left, right);

        // Вызываем функцию сортировки
        if (left < pivot - 1) {
            quickSort(array, 'descending', left, pivot - 1);
        }
        if (right > pivot) {
            quickSort(array, 'descending', pivot, right);
        }
    }

    // Возвращаем результат - отсортированный массив
    return array;
}

// console.log(quickSort(courses, 'ascending'));
// console.log(quickSort(courses, 'descending'));
