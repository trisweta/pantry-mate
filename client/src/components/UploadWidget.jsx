import { useEffect, useRef } from 'react';
import { Tag } from 'antd';

const UploadWidget = ({ onImageUpload }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        if (!window.cloudinary) {
            const script = document.createElement('script');
            script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
            script.type = 'text/javascript';
            script.async = true;
            script.onload = () => {
                cloudinaryRef.current = window.cloudinary;
                initializeWidget();
            };
            script.onerror = (error) => {
                console.error('Error loading Cloudinary script:', error);
            };
            document.body.appendChild(script);
        } else {
            cloudinaryRef.current = window.cloudinary;
            initializeWidget();
        }
    }, [onImageUpload]);

    const initializeWidget = () => {
        if (cloudinaryRef.current) {
            widgetRef.current = cloudinaryRef.current.createUploadWidget({
                cloudName: 'trisweta',
                uploadPreset: 'w8zjentr',
            }, (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                } else if (result && result.event === 'success') {
                    onImageUpload(result.info.secure_url);
                } else {
                    console.log('Upload result:', result);
                }
            });
        } else {
            console.error('Cloudinary widget not initialized');
        }
    };

    const handleOpenWidget = () => {
        if (widgetRef.current) {
            widgetRef.current.open();
        } else {
            console.error('Cloudinary widget reference is not set');
        }
    };

    return (
        <>
            <Tag style={{ marginTop: '10px', cursor: 'pointer' }} onClick={handleOpenWidget}>
                Upload Recipe Image
            </Tag>
        </>
    );
};

export default UploadWidget;
