function timeWord(timeStr) {
    // Define arrays for converting numbers to words
    const hours = 
        ['twelve','one','two','three','four','five','six','seven','eight','nine','ten','eleven'];
    const minutes = 
        ['oh', 'one', 'two', 'three', 'four', 'five','six','seven','eight','nine',
        'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen',
        'eighteen','nineteen']; 
    const tens = ['','','twenty','thirty','forty','fifty'];

    // Split the input time string into hours and minutes and convert them to integers
    let [hour, minute] = timeStr.split(':').map(str => parseInt(str, 10));

    // Determine whether the time is AM or PM
    let amPm = hour >= 12 ? 'pm' : 'am';

    // Special cases for midnight and noon
    if (hour === 0 && minute === 0) return 'Midnight';
    if (hour === 12 && minute === 0) return 'Noon';

    // Convert the hour part to words, using modulo to handle 24-hour times
    let hourWord = hours[hour % 12];

    // Initialize the variable for the minute part in words
    let minuteWord = '';

    // Convert the minute part to words
    if (minute === 0) {
        minuteWord = "o'clock"; // On the hour
    } else if (minute < 10) {
        minuteWord = `oh ${minutes[minute]}`; // Single-digit minutes
    } else if (minute < 20) {
        minuteWord = minutes[minute]; // 'Teen' minutes
    } else {
        // Tens place of minutes
        minuteWord = tens[Math.floor(minute / 10)];
        // Ones place of minutes, if not zero
        if (minute % 10 !== 0) {
            minuteWord += ` ${minutes[minute % 10]}`;
        }
    }

    // Return the time in words with the AM/PM designation
    return `${hourWord} ${minuteWord} ${amPm}`.trim();
}

    