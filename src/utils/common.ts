import dayjs, { Dayjs } from 'dayjs';
import { TIME_FORMAT } from './constants';
import { ReactNode } from 'react';
const today = dayjs();

// Validate work email
export const validateWorkEmail = (value: string) => {
    if (!value) {
        return Promise.reject('Please enter valid value');
    } else if (value.endsWith('@tma.com.vn')) {
        return Promise.resolve();
    } else {
        return Promise.reject('Please enter correct format email. example:"admin@tma.com.vn"');
    }
};

export const handleValidateNumber = (value: string) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(value)) {
        return Promise.reject('The field must be contain only number');
    }
    if (value.length > 10) {
        return Promise.reject('Please enter no more than 10 characters');
    }
    return Promise.resolve();
};

export const handleValidateName = (value: string, name: string) => {
    const regex = /^[A-Za-zÀ-Ỹà-ỹ ]+$/;
    if (!value) {
        return Promise.reject('Please enter the valid value');
    }
    if (value.length > 50) {
        return Promise.reject('Please enter no more than 50 characters');
    }
    if (!regex.test(value)) {
        return Promise.reject(`${name} must contain only alphabet characters`);
    }
    return Promise.resolve();
};

// Handle validate age
export const handleValidateAge = (value: string, age: number = 18) => {
    const eighteenYearsAgo = dayjs().subtract(age, 'years');
    const selectedDate = dayjs(value);

    if (value && !selectedDate.isBefore(eighteenYearsAgo)) {
        return Promise.reject('You must be at least 18 years old.');
    }
    return Promise.resolve();
};

// Validate value
export const validateRequiredValue = (message: string = '') => ({ required: true, message });
export const validateMaxLengthCharacters = (maxLength: number = 500) => ({ max: maxLength, message: validateMaxLengthCharactersMessage(maxLength) });

export const validateMaxLengthCharactersMessage = (maxLength: number = 500) => `Please enter no more than ${maxLength} characters`;
export const validateSelectValidValueMessage = 'Please select valid value';
export const validateEnterValidValueMessage = 'Please enter valid value';

export const validateSelectValidValue = validateRequiredValue(validateSelectValidValueMessage);
export const validateEnterValidValue = validateRequiredValue(validateEnterValidValueMessage);
export const validate500Characters = validateMaxLengthCharacters(500);
export const validate1000Characters = validateMaxLengthCharacters(1000);
export const phoneValidatePattern = /^0\d{3}\s\d{3}\s\d{3}$/;

// Format current number
export const formatCurrencyNumber = (value: string | number) => {
    return value?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

// Format data table
// Add key for row in data table
export const formatDataTable = (data: any[] = []) => {
    return data?.map((item, index: number) => ({ key: index, ...item })) || [];
};

export const numberToCurrency = (number: number) => {
    const currencyText = new Intl.NumberFormat('vi-VN').format(number).replace(/\D/g, ' ');
    return currencyText;
};

// Handle disable future date
export const handleDisableFutureDate = (current: Dayjs) => {
    return current && current.isAfter(today.endOf('day'));
};

// Format Year yyyy
export const formatYear = (date: number) => {
    return dayjs(date).format('YYYY');
};

export const formatTime = (time: any) => {
    if (time) {
        return dayjs(time).format(TIME_FORMAT.ISO);
    }
    return null;
};

// Function to filter null properties
export const filterNullProperties = (obj: any) => {
    const filteredObj: any = {};
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
            filteredObj[key] = obj[key];
        }
    }
    return filteredObj;
};

// Upload file employee
export const handleUploadFile = async (uploadFile: any, changeFileUpload: boolean, dynamicApi: (arg: { file: File }) => Promise<any>) => {
    if (uploadFile.length > 0 && changeFileUpload) {
        const resUploadFile = await dynamicApi({ file: uploadFile[0] });
        return resUploadFile.data || '';
    } else if (uploadFile[0]?.attachment) {
        return uploadFile[0].attachment;
    }
    return '';
};

// Function append form data T
export const appendFormData = <T>(data: T) => {
    const formData = new FormData();
    for (const key in data) {
        if (data[key] !== null && data[key] !== undefined) {
            formData.append(key, data[key] as string | Blob);
        }
    }
    return formData;
};

export const downloadFile = (data: any, fileName: string) => {
    const href = URL.createObjectURL(data);

    // Create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    // Clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
};

export const formatSizeUnits = (bytes: any) => {
    if (bytes >= 1073741824) {
        bytes = (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
        bytes = (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
        bytes = (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes > 1) {
        bytes = bytes + ' bytes';
    } else if (bytes == 1) {
        bytes = bytes + ' byte';
    } else {
        bytes = '0 bytes';
    }
    return bytes;
};

export const remapUnits: any = (units: any = []) => {
    return units.map((unit: any) => ({
        label: unit.unitName,
        value: unit.unitId.toString(),
        children: unit?.children ? remapUnits(unit?.children) : undefined
    }));
};

export const formatMappingKey = (key: string) => {
    if (!key) return '';
    return key.toLowerCase().replace(/\s+/g, '');
};

const greenStatus = { colorText: '#00A811', colorBr: '#00A811', colorBg: '#E6F6E7' };
const redStatus = { colorText: '#EA4343', colorBr: '#EA4343', colorBg: '#FDECEC' };
const yellowStatus = { colorText: '#E66F00', colorBr: '#E66F00', colorBg: '#FDF1E6' };
const blueStatus = { colorText: '#1E6D98', colorBr: '#1E6D98', colorBg: '#EAF5FB' };
const lightBlueStatus = { colorText: '#01BAD3', colorBr: '#01BAD3', colorBg: '#EEFDFF' };

export const statusMapping: { [key: string]: { colorText: string; colorBr: string; colorBg: string } } = {
    proposition: greenStatus,
    lost: redStatus,
    won: yellowStatus,
    new: blueStatus,
    qualified: lightBlueStatus
};

export const renderWithFallback = (data: ReactNode, fallback: string = '-') => (data !== '' && data !== null && data !== undefined ? data : fallback);
