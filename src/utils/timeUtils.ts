import { DateTime } from 'luxon';
import i18n from 'i18next';

export interface TimeDisplayOptions {
    format?: 'short' | 'medium' | 'long' | 'full';
    dateStyle?: 'short' | 'medium' | 'long' | 'full';
    timeStyle?: 'short' | 'medium' | 'long' | 'full';
    timeZone?: string;
    showWeekday?: boolean;
}

/**
 * Maps app languages to appropriate locale strings for Luxon
 */
const getLocaleBasedOnLanguage = (): string => {
    const lang = i18n.language || 'en';
    const map: Record<string, string> = {
        fr: 'fr-FR',
        en: 'en-US',
        ar: 'ar-TN', // or 'ar-EG', 'ar-SA' 
    };
    return map[lang] || 'en-US';
};


export const formatTime = (time: string, sourceTimeZone: string) => {
    const [hour, minute, second] = time.split(":").map(Number);
    const locale = getLocaleBasedOnLanguage(); // dynamically get locale

    const sourceDateTime = DateTime.fromObject(
        { hour, minute, second },
        { zone: sourceTimeZone, locale }
    );

    return sourceDateTime
        .setZone(DateTime.local().zoneName)
        .setLocale(locale)
        .toLocaleString(DateTime.TIME_SIMPLE);
};

/**
 * Converts local time in a specific timezone to a human-readable time in the
 * user's current timezone.
 * @param date - Local date (string like '2024-01-15')
 * @param time - Local time (string like '09:00:00')
 * @param sourceTimezone - The timezone in which the localTime is defined (e.g., 'Europe/Paris')
 * @returns a human-readable time string (e.g., '3:00 PM')
 */
export const localToReadableTime = (
  date: string,
  time: string,
  sourceTimezone: string = "Africa/Tunis"
): string => {
  const isoDateTime = convertLocalToUTC(
    `${date}T${time}`,
    "iso",
    sourceTimezone
  );

  return convertUTCToLocalDisplay(isoDateTime, {
    format: "medium",
  });
};


/**
 * Converts a UTC/GMT timestamp from backend to local time for display
 * @param utcTimestamp - UTC timestamp string from backend (ISO format recommended)
 * @param options - Display formatting options
 * @returns Formatted date string in user's timezone
 */
export const convertUTCToLocalDisplay = (
    utcTimestamp: string | Date,
    options: TimeDisplayOptions = {}
): string => {
    try {
        const {
            format = 'medium',
            dateStyle,
            timeStyle,
        } = options;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const date = new Date(utcTimestamp);

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }

        const formatter = new Intl.DateTimeFormat(getLocaleBasedOnLanguage(), {
            timeZone,
            ...(dateStyle && timeStyle
                ? { dateStyle, timeStyle }
                : {
                    year: 'numeric',
                    month: format === 'short' ? 'numeric' : 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second:
                        format === 'long' || format === 'full' ? '2-digit' : undefined,
                    timeZoneName:
                        format === 'full'
                            ? 'long'
                            : format === 'long'
                                ? 'short'
                                : undefined,
                }),
        });

        return formatter.format(date);
    } catch (error) {
        console.error('Error converting UTC to local display:', error);
        return 'Invalid Date';
    }
};



/**
 * Converts local time in a specific timezone to UTC.
 * @param localTime - Local time (string like '2024-01-15T09:00:00')
 * @param outputFormat - 'iso' | 'timestamp' | 'custom'
 * @param sourceTimezone - The timezone in which the localTime is defined (e.g., 'Europe/Paris')
 * @returns UTC formatted string
 */
export const convertLocalToUTC = (
    localTime: string | Date | number,
    outputFormat: 'iso' | 'timestamp' | 'custom' = 'iso',
    sourceTimezone?: string
): any => {
    try {
        let dt: DateTime;

        if (typeof localTime === 'string' && sourceTimezone) {
            dt = DateTime.fromISO(localTime, { zone: sourceTimezone });
        } else if (typeof localTime === 'string') {
            dt = DateTime.fromISO(localTime);
        } else if (typeof localTime === 'number') {
            dt = DateTime.fromMillis(localTime);
        } else {
            dt = DateTime.fromJSDate(localTime);
        }

        const utc = dt.toUTC();

        switch (outputFormat) {
            case 'iso':
                return utc.toISO();
            case 'timestamp':
                return Math.floor(utc.toSeconds()).toString();
            case 'custom':
                return utc.toFormat('yyyy-MM-dd HH:mm:ss');
            default:
                return utc.toISO();
        }
    } catch (error) {
        console.error('Error converting local to UTC:', error);
        throw new Error('Failed to convert to UTC format');
    }
};

/**
 * Formats a date for HTML datetime-local input
 * @param date - Date object
 * @returns Formatted string for datetime-local input
 */
export const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Formats a date for HTML date input
 * @param date - Date object
 * @returns Formatted string for date input (YYYY-MM-DD)
 */
export const formatDateOnlyForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

/**
 * Formats a time for HTML time input
 * @param date - Date object
 * @returns Formatted string for time input (HH:MM)
 */
export const formatTimeForInput = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
};

/**
 * Get current UTC time in various formats
 * @param format - Output format
 * @returns Current UTC time formatted
 */
export const getCurrentUTC = (format: 'iso' | 'timestamp' | 'custom' = 'iso'): string => {
    return convertLocalToUTC(new Date(), format);
};

/**
 * Check if a date string is valid
 * @param dateString - Date string to validate
 * @returns True if valid date
 */
export const isValidDate = (dateString: string): boolean => {
    return !isNaN(new Date(dateString).getTime());
};

/**
 * Get relative time 
 * @param utcTimestamp - UTC timestamp
 * @param locale - Locale for formatting
 * @returns Relative time string
 */
export const getRelativeTime = (
    utcTimestamp: string | Date,
    locale: string = 'fr-FR'
): string => {
    try {
        const date = new Date(utcTimestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

        if (diffInSeconds < 60) {
            return rtf.format(-diffInSeconds, 'seconds');
        } else if (diffInSeconds < 3600) {
            return rtf.format(-Math.floor(diffInSeconds / 60), 'minutes');
        } else if (diffInSeconds < 86400) {
            return rtf.format(-Math.floor(diffInSeconds / 3600), 'hours');
        } else {
            return rtf.format(-Math.floor(diffInSeconds / 86400), 'days');
        }
    } catch (error) {
        console.error('Error calculating relative time:', error);
        return 'Invalid Date';
    }
};


/**
 * Formats a UTC date string into a localized date-only string.
 * Supports locale, date styles, weekday display, and full/medium/short modes.
 * @param utcTimestamp - ISO UTC string or Date object
 * @param options - Formatting options
 * @returns Localized date string
 */
export const formatDateOnly = (
    utcTimestamp: string | Date,
    options: TimeDisplayOptions = {}
): string => {
    try {
        const {
            format = 'medium',
            dateStyle,
            timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
            showWeekday = false,
        } = options;
        const locale = getLocaleBasedOnLanguage();
        const date = new Date(utcTimestamp);
        if (isNaN(date.getTime())) throw new Error('Invalid date format');

        // Build format options dynamically
        const formatOptions: Intl.DateTimeFormatOptions = {
            timeZone,
            ...(dateStyle
                ? { dateStyle }
                : {
                    year: 'numeric',
                    month:
                        format === 'short'
                            ? 'numeric'
                            : format === 'medium'
                                ? 'short'
                                : 'long',
                    day: 'numeric',
                }),
            ...(showWeekday && { weekday: 'long' }),
        };

        return new Intl.DateTimeFormat(locale, formatOptions).format(date);
    } catch (error) {
        console.error('Error formatting date only:', error);
        return 'Invalid Date';
    }
};
/**
 * Format time only (no date) for display
 * @param utcTimestamp - UTC timestamp
 * @param options - Display options
 * @returns Formatted time string
 */
export const formatTimeOnly = (
    utcTimestamp: string | Date,
    options: Omit<TimeDisplayOptions, 'dateStyle'> = {}
): string => {
    try {
        const {
            format = 'medium',
            timeStyle,
            timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
        } = options;

        const date = new Date(utcTimestamp);

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }

        const formatter = new Intl.DateTimeFormat(getLocaleBasedOnLanguage(), {
            timeZone,
            ...(timeStyle
                ? { timeStyle }
                : {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: format === 'long' || format === 'full' ? '2-digit' : undefined,
                }),
        });

        return formatter.format(date);
    } catch (error) {
        console.error('Error formatting time only:', error);
        return 'Invalid Date';
    }
};

/**
 * Get user's timezone
 * @returns User's timezone string
 */
export const getUserTimezone = (): string => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Add time to a date
 * @param date - Base date
 * @param amount - Amount to add
 * @param unit - Unit of time
 * @returns New date with added time
 */
export const addTime = (
    date: Date,
    amount: number,
    unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'
): Date => {
    const newDate = new Date(date);

    switch (unit) {
        case 'seconds':
            newDate.setSeconds(newDate.getSeconds() + amount);
            break;
        case 'minutes':
            newDate.setMinutes(newDate.getMinutes() + amount);
            break;
        case 'hours':
            newDate.setHours(newDate.getHours() + amount);
            break;
        case 'days':
            newDate.setDate(newDate.getDate() + amount);
            break;
        case 'months':
            newDate.setMonth(newDate.getMonth() + amount);
            break;
        case 'years':
            newDate.setFullYear(newDate.getFullYear() + amount);
            break;
        default:
            throw new Error(`Invalid time unit: ${unit}`);
    }

    return newDate;
};

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

/**
 * Check if a date is yesterday
 * @param date - Date to check
 * @returns True if date is yesterday
 */
export const isYesterday = (date: Date): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    );
};