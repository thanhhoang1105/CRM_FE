import axiosClient from '../axios-client';

const UploadFileService = {
    // gọi API lấy ra dữ liệu list user
    uploadFile: (params: any) => {
        const url = `opportunities/excel`;
        return axiosClient.post(url, params, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
};

export default UploadFileService;
