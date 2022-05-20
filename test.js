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