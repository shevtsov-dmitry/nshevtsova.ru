package ru.nshevtsova.custom;

import java.util.Random;

/**
 * CustomTestUtils
 */
public final class CustomTestUtils {

    private static final Random random = new Random();
    private static final String[] textWords;
    private static final String[] maleNames = {"Максим", "Михаил", "Александр", "Дмитрий", "Денис", "Илья", "Андрей", "Даниил", "Артём", "Иван", "Алексей", "Никита", "Павел", "Евгений", "Антон", "Лев", "Эльдар", "Григорий", "Владимир", "Руслан", "Василий", "Виталий", "Вячеслав", "Игнат", "Николай", "Олег", "Ренат", "Роман", "Сергей", "Тимур", "Богдан", "Гарик", "Давид", "Камиль", "Кирилл", "Константин", "Леонид", "Матвей", "Степан", "Филипп", "Аркадий", "Вадим", "Виктор", "Георгий", "Егор", "Макар", "Семён", "Станислав", "Тимофей", "Юрий"};
    private static final String[] femaleNames = {"Анна", "Мария", "Юлия", "Алёна", "Анастасия", "Екатерина", "Дарья", "Ксения", "Кристина", "Алиса", "Яна", "Ольга", "Александра", "Светлана", "Елизавета", "Маргарита", "Елена", "Агата", "Юлиана", "Ирина", "Алина", "Арина", "Валерия", "Виктория", "Диана", "Ева", "Карина", "Каролина", "Марина", "Наталья", "Варвара", "Василиса", "Вера", "Любовь", "Марьяна", "Надежда", "Оксана", "Регина", "Софья", "Татьяна", "Ала", "Ангелина", "Вероника", "Евгения", "Жанна", "Лилия", "Милана", "Полина", "Рената", "Эльвира"};
    private static final String[] surnames = {"Яковлев", "Иванов", "Кузнецов", "Соколов", "Попов", "Лебедев", "Козлов", "Новиков", "Морозов", "Петров", "Волков", "Соловьёв", "Васильев", "Зайцев", "Павлов", "Семёнов", "Голубев", "Виноградов", "Богданов", "Воробьёв", "Фёдоров", "Михайлов", "Беляев", "Тарасов", "Белов", "Комаров", "Орлов", "Киселёв", "Макаров", "Андреев", "Ковалёв", "Ильин", "Гусев", "Титов", "Кузьмин", "Кудрявцев", "Баранов", "Куликов", "Алексеев", "Степанов", "Смирнов", "Сорокин", "Сергеев", "Романов", "Захаров", "Борисов", "Королёв", "Герасимов", "Пономарёв", "Григорьев", "Лазарев", "Медведев", "Ершов", "Никитин", "Соболев", "Рябов", "Поляков", "Цветков", "Данилов", "Жуков", "Фролов", "Журавлёв", "Николаев", "Крылов", "Максимов", "Сидоров", "Осипов", "Белоусов", "Федотов", "Дорофеев", "Егоров", "Матвеев", "Бобров", "Дмитриев", "Калинин", "Анисимов", "Петухов", "Антонов", "Тимофеев", "Никифоров", "Веселов", "Филиппов", "Марков", "Большаков", "Суханов", "Миронов", "Ширяев", "Александров", "Коновалов", "Шестаков", "Казаков", "Ефимов", "Денисов", "Громов", "Фомин", "Давыдов", "Мельников", "Щербаков", "Блинов", "Колесников", "Карпов", "Афанасьев", "Власов", "Маслов", "Исаков", "Тихонов", "Аксёнов", "Гаврилов", "Родионов", "Котов", "Горбунов", "Кудряшов", "Быков", "Зуев", "Третьяков", "Савельев", "Панов", "Рыбаков", "Суворов", "Абрамов", "Воронов", "Мухин", "Архипов", "Трофимов", "Мартынов", "Емельянов", "Горшков", "Чернов", "Овчинников", "Селезнёв", "Панфилов", "Копылов", "Михеев", "Галкин", "Назаров", "Лобанов", "Лукин", "Беляков", "Потапов", "Некрасов", "Хохлов", "Жданов", "Наумов", "Шилов", "Воронцов", "Ермаков", "Дроздов", "Игнатьев", "Савин", "Логинов", "Сафонов", "Капустин", "Кириллов", "Моисеев", "Елисеев", "Кошелев", "Костин", "Горбачёв", "Орехов", "Ефремов", "Исаев", "Евдокимов", "Калашников", "Кабанов", "Носков", "Юдин", "Кулагин", "Лапин", "Прохоров", "Нестеров", "Харитонов", "Агафонов", "Муравьёв", "Ларионов", "Федосеев", "Зимин", "Пахомов", "Шубин", "Игнатов", "Филатов", "Крюков", "Рогов", "Кулаков", "Терентьев", "Молчанов", "Владимиров", "Артемьев", "Гурьев", "Зиновьев", "Гришин", "Кононов", "Дементьев", "Ситников", "Симонов", "Мишин", "Фадеев", "Комиссаров", "Мамонтов", "Носов", "Гуляев", "Шаров", "Устинов", "Вишняков", "Евсеев", "Лаврентьев", "Брагин", "Константинов", "Корнилов", "Авдеев", "Зыков", "Бирюков", "Шарапов", "Никонов", "Щукин", "Дьячков", "Одинцов", "Сазонов", "Якушев", "Красильников", "Гордеев", "Самойлов", "Князев", "Беспалов", "Уваров", "Шашков", "Бобылёв", "Доронин", "Белозёров", "Рожков", "Самсонов", "Мясников", "Лихачёв", "Буров", "Сысоев", "Фомичёв", "Русаков", "Стрелков", "Гущин", "Тетерин", "Колобов", "Субботин", "Фокин", "Блохин", "Селиверстов", "Пестов", "Кондратьев", "Силин", "Меркушев", "Лыткин", "Туров"};

    static {
        String text = "Субъектом современного научного познания является именно научный коллектив, состоящий из множества отдельных ученых, которые объединены единым предметом исследования. Более того, в развитии современной науки и научного знания все более проявляются тренды глобализации науки. Дело в том, что в современной мировой науке члены одного и того же дисциплинарного научного сообщества, с одной стороны, существенно распределены в пространстве и часто вообще незнакомы друг с другом. С другой стороны, они являются неким единым целым как представляющим конкретную область исследования. Что же их связывает друг с другом и делает единым коллективным субъектом научного познания? Ответ очевиден: очень густая сеть информационных каналов и когнитивных связей между отдельными учеными и научными организациями, в том числе благодаря современным средствам связи, причем благодаря Интернету часто неформальным и социально анонимным, не регулируемых из какого-то центра. Результатом таких интенсивных коммуникаций внутри коллективного субъекта науки является достижение среди его членов определенного консенсуса в отношении истинности, доказанности, однозначности и эффективности той или иной концепции или гипотезы. В отличие научного консенсуса от научных конвенций как способов достижения согласия в науке? Конвенции являются результатом сознательно-договорного и рационально-контролируемого поведения ученых относительно принятия в качестве истинных определенных высказываний и теорий. В отличие от них научный консенсус является итогом длительных переговоров, дискуссий, включая столкновение различных позиций ученых, во многом этот процесс когнитивных коммуникаций в науке является стихийным, а, следовательно, объективным. Необходимо при этом особо отметить то обстоятельство, что существенную роль в достижении научного консенсуса играет позиция ведущих ученых в соответствующей области научного знания, ее наиболее авторитетных экспертов. Если научная конвенция – дело личной ответственности отдельного ученого, то научный консенсус – коллективное действие дисциплинарного научного сообщества и его коллективная ответственность за признание некоторой теории научной, истинной, или ненаучной и лженаучной. Различие в основаниях и механизме принятия когнитивных решений при конвенционалистской и консенсуалистской познавательной стратегии весьма существенны. При конвенционалистской стратегии механизма принятия и утверждения некоторой единицы знания в качестве истинной при всех оговорках это решение имеет субъективный характер. Тогда как при консенсуалисткой стратегии решения вопроса об истинности научного знания субъективизм такого решения максимально устраняется в силу в силу самой природы консенсуса как коллективного общезначимого решения научного сообщества, пусть и во многом стихийного. Хотя в обоих случаях научная истина признается имеющей условный и относительный характер, но только при консенсуалистском подходе она приобретает еще и такие свойства как объективность, социальность и историчность, что полностью соответствует реальному процессу научного познания. В марксистской философии науки был разработан и предложен в качестве критерия истинности научного знания критерий практики, под которым понималась материальная деятельность людей. В науке материальная деятельность существует в трех формах: физический эксперимент, внедрение результатов научного знания в производственной и технической сфере, использование различного рода научных приборов. Понимание практики в качестве критерия истинности научного знания сталкивается со следующего рода принципиальными трудностям Такими теориями являются все математические теории, начиная с арифметики натуральных и рациональных чисел и эвклидовой геометрии, построенной греческими математиками. Первая физическая трансцендентальная теория была построена только в Новое время. И это была классическая механика Ньютона. Сегодня трансцедентальные научные теории имеются в большинстве естественных и технических наук, а также во многих социально-гуманитарных дисциплинах. Более того, в структуре теоретического знания современной науки имеются трансцендентальные теории разной степени общности: частные теории и более общие фундаментальные теории, а среди них самые общие или парадигмальные теории той или иной области науки или даже науки в целом. Такими теориями в современном естествознании являются, например, частная и общая теория относительности, квантовая механика, квантовая электродинамика, релятивистская космология, теория элементарных частиц, синергетика, генетика и молекулярная биология и др. Критерий истинности трансцендентальных теорий существенно отличается от критериев истинности чувственного и эмпирического знания в науке. Поскольку непосредственный предмет (онтологию) трансцендентальных теорий образует множество идеальных, чисто мысленных (ненаблюдаемых) объектов (материальная точка, инерция, абсолютное пространство, абсолютное время, абсолютно изолированная термодинамическая система, идеальный газ, абсолютно черное тело, пространственно-временной континуум и др.), их свойства и отношения, постольку соответствие опыту не может быть критерием истинности таких теорий, поскольку они ничего не утверждают о нем. Главными требованиями к истинности трансцендентальной теории являются, прежде всего, интуитивная очевидность содержания ее идеальных объектов и аксиом теории. Основными же средствами разворачивания содержания такой теории является постепенное, пошаговое ее построение с помощью логических и внелогических средств, контролируемых интеллектуальной интуицией (Декарт). Необходимо отметить, что любая трансцендентальная теория является самодостаточной по отношению к миру опыта, поскольку имеет свои собственные онтологические основания. Но она не является самодостаточной по отношению к теоретическому знанию науки в целом, будучи одним из его элементов.";
        text = text.toLowerCase();
        textWords = text.split(" ");
        for (int i = 0; i < 10; i++) {
            shuffleArray(textWords);
        }
    }

    public static String generateUserReview() {
        final int reviewWordsAmount = random.nextInt(50, 300);
        var sb = new StringBuilder();
        boolean makeNextWordUpperCase = false;
        for (String word : textWords) {
            if (sb.length() == reviewWordsAmount) {
                return sb.deleteCharAt(sb.length() - 1).toString();
            }

            if (word.equals(textWords[0])) {
                uppercaseFirstLetter(sb, word);
            } else if (word.endsWith(".") || word.endsWith("!") || word.endsWith("?")) {
                makeNextWordUpperCase = true;
                sb.append(word).append(" ");
            } else if (makeNextWordUpperCase) {
                uppercaseFirstLetter(sb, word);
                makeNextWordUpperCase = false;
            } else {
                sb.append(word).append(" ");
            }
        }
        return sb.deleteCharAt(sb.length() - 1).toString();
    }

    private static void uppercaseFirstLetter(StringBuilder sb, String word) {
        String upperChar = String.valueOf(word.charAt(0)).toUpperCase();
        word = word.length() < 2 ? upperChar : upperChar + upperChar + word.substring(1);
        sb.append(word).append(" ");
    }

    private static <T> void shuffleArray(T[] arr) {
        for (int i = arr.length - 1; i > 0; i--) {
            int index = random.nextInt(i + 1);

            T a = arr[index];
            arr[index] = arr[i];
            arr[i] = a;
        }
    }

    public static String[] generateNameSurname() {
        int surnameIndex = random.nextInt(surnames.length);
        if (random.nextBoolean()) {
            int nameIndex = random.nextInt(maleNames.length);
            return new String[]{maleNames[nameIndex], surnames[surnameIndex]};
        } else {
            int nameIndex = random.nextInt(femaleNames.length);
            return new String[]{femaleNames[nameIndex], surnames[surnameIndex] + "а"};
        }
    }

}
