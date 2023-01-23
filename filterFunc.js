const inputValue = "mission nasa again";

const newsArr = [
    {
        id: 1,
        title: "SpaceX may perform a wet dress rehearsal of its Starship launch system today",
        summary: "If at first you dont succeed, cryo, cryo again.",
    },
    {
        id: 2,
        title: "Montana Students to Hear from NASA Astronaut on Space Station",
        summary:
            "Students from the Boys & Girls Club of the Flathead Reservation and Lake County in Ronan, Montana, will have an opportunity this week to hear from a NASA astronaut aboard the International Space Station. The space-to-Earth call will air live at 12 p.m. EST on Wednesday, Jan. 25, on NASA Television, the NASA app, and the agency’s website.",
    },
    {
        id: 3,
        title: "SpaceX Starlink satellite internet tested in the field in Antarctica mission",
        summary:
            "SpaceX’s Starlink internet continues to find success in Antarctica, Earth’s icy southernmost continent and has spread beyond McMurdo Station. The company first",
    },
    {
        id: 4,
        title: "NASA to cooperate on Israeli astrophysics task",
        summary:
            "The United States and Israel mission are finalizing an agreement that would see NASA contribute to an upcoming Israeli astrophysics mission.",
    },
];

const filterFunc = (inputValue, newsArr) => {
    let filteredSortedArr = [];

    let str = inputValue;
    // забираємо коми
    let strWithoutCommas = str.replace(/,/g, "");
    // забираємо пробіли не тільки на початку і в кінці, але й забираємо зайві пробіли всередині між словами (якщо вони є)
    let newStr = strWithoutCommas.replace(/\s+/g, " ").trim();
    // приводимо до нижнього регістру і розділяємо слова по пробілах між ними
    let inputWordsArr = newStr.toLowerCase().split(" ");

    // якщо інпут пустий, показуємо всі новини
    if (str === "") {
        filteredSortedArr = newsArr;
    }

    // масив з id новин, в яких в titles знайдено keywords (для відображення таких новин першими в списку)
    let nums = [];

    inputWordsArr.map(wordInInput => {
        newsArr.map(item => {
            let newTitle = item.title.replace(/[\s+,]/g, " ");
            let lowerCasedTitle = newTitle.toLowerCase().split(" ");

            lowerCasedTitle.map(wordInTitle => {
                // якщо keywords є в title і якщо таку новину ще не було додано в кінцевий масив
                if (wordInTitle === wordInInput && filteredSortedArr.indexOf(item) === -1) {
                    filteredSortedArr.push(item);
                    nums.push(item.id);
                }
            });
        });
    });
    // фільтруємо cписок новин, залишаємо тільки ті новини, в яких в заголовку не було keywords
    let restOfNews = newsArr.filter(item => {
        if (!nums.includes(item.id)) {
            return item;
        }
    });
    // знаходимо keywords у summary, додаємо в кінцевий масив (в кінець масиву після новин, де keywords у title)
    inputWordsArr.map(wordInInput => {
        restOfNews.map(item => {
            let newDesc = item.summary.replace(/[\s+,]/g, " ");
            let lowerCasedDesc = newDesc.toLowerCase().split(" ");
            lowerCasedDesc.map(wordInDesc => {
                if (wordInDesc === wordInInput && filteredSortedArr.indexOf(item) === -1) {
                    filteredSortedArr.push(item);
                }
            });
        });
    });

    return filteredSortedArr;
};

console.log(filterFunc(inputValue, newsArr));
