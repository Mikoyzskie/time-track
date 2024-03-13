import { MdOutlineAccessTime, MdOutlineCalendarToday } from "react-icons/md";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";


const currentDate = new Date();

// Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const currentDayOfWeek = currentDate.getDay();

// Calculate the number of days to add to reach the next Monday
let daysToAdd;
if (currentDayOfWeek >= 5) { // Friday, Saturday, or Sunday
    daysToAdd = 8 - currentDayOfWeek; // 8 - 5 = 3 (for Friday), 8 - 6 = 2 (for Saturday), 8 - 0 = 1 (for Sunday)
} else {
    daysToAdd = 1; // Add 1 day to reach the next day
}

// Create a new date object with the date set to the next Monday or the next day
const nextDate = new Date(currentDate);
nextDate.setDate(currentDate.getDate() + daysToAdd);

function time(data: Date | undefined) {
    if (data) {
        let hours = data.getHours();
        const minutes = data.getMinutes();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = hours.toString().padStart(2, '0') + ':' +
            minutes.toString().padStart(2, '0') + ':' +
            amOrPm;
        return formattedTime
    }
    return "--:-- --"
}

// Format the next date as desired (optional)
const formattedNextDate = nextDate.toDateString();
const formattedCurrentDate = currentDate.toDateString();


export function User() {
    return (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-8">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-[#f5f5f5] rounded-full -start-3 ring-8 ring-white">
                    <svg
                        className="w-2.5 h-2.5 text-[#296366]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-white">
                    {"Today's Shift "}
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                        Latest
                    </span>
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-white">
                    {formattedCurrentDate}
                </time>
                <div className="text-base font-normal text-white flex flex-col gap-2" >
                    <div className="flex gap-2 items-center">
                        <MdOutlineAccessTime /> <span>06:00 to 03:00, UTC+8</span>
                    </div>
                    <div className="text-sm flex items-center gap-1"><IoIosLogIn /> Time In: </div>
                    <div className="text-sm flex items-center gap-1"><IoIosLogOut /> Time Out: </div>
                </div>

            </li>
            <li className="mb-10 ms-8">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-[#f5f5f5] rounded-full -start-3 ring-8 ring-white">
                    <svg
                        className="w-2.5 h-2.5 text-[#296366]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-white">
                    Recent Activity
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    Released on December 7th, 2021
                </time>
                <div className="text-base font-normal text-white flex flex-col gap-2" >

                    <div className="text-sm flex items-center gap-1"><IoIosLogIn /> Time In: </div>
                    <div className="text-sm flex items-center gap-1"><IoIosLogOut /> Time Out: </div>
                </div>
            </li>
            <li className="ms-8">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-[#f5f5f5] rounded-full -start-3 ring-8 ring-white">
                    <svg
                        className="w-2.5 h-2.5 text-[#296366]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-white">
                    Next Shift
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-white">
                    {formattedNextDate}
                </time>
                <p className="text-base font-normal text-white flex gap-2 items-center" >
                    <MdOutlineAccessTime /> <span>06:00 to 03:00, UTC+8</span>
                </p>
            </li>
        </ol>


    )
}