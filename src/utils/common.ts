import { ReactNode } from 'react';

// Format data table
// Add key for row in data table
export const formatDataTable = (data: any[] = []) => {
    return data?.map((item, index: number) => ({ key: index, ...item })) || [];
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
    qualified: lightBlueStatus,
    role_user: greenStatus,
    role_admin: blueStatus
};

export const mappingPriority: { [key: string]: number } = {
    VERY_HIGH: 3,
    HIGH: 2,
    MEDIUM: 1
};

export const renderWithFallback = (data: ReactNode, fallback: string = '-') => (data !== '' && data !== null && data !== undefined ? data : fallback);
