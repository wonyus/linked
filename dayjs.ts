import * as dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/th"; // import locale
import dayOfYear from "dayjs/plugin/dayOfYear";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(isLeapYear); // use plugin
dayjs.extend(timezone);
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(buddhistEra);

dayjs.locale("th"); // use locale
