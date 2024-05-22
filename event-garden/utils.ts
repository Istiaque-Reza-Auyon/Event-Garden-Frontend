const isoToDateTime = (isoString:string) => {
    const date = new Date(isoString);
    
    // Extract the day, month, year, hours, and minutes from the date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    let hours: String|number = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Convert hours from 24-hour to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    hours = String(hours ? hours : 12).padStart(2, '0'); // Ensure two digits for hours

    // Format the date and time as dd/mm/yyyy hh:mm AM/PM
    return `${day}/${month}/${year}`;
};

const isoToDateTimeAmPm = (isoString:string) => {
    const date = new Date(isoString);
    
    // Extract the day, month, year, hours, and minutes from the date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    let hours: String|number = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Convert hours from 24-hour to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    hours = String(hours ? hours : 12).padStart(2, '0'); // Ensure two digits for hours

    // Format the date and time as dd/mm/yyyy hh:mm AM/PM
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};

export {isoToDateTime, isoToDateTimeAmPm};
