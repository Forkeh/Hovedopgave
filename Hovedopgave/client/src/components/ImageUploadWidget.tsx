import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { useDropzone } from 'react-dropzone';
import 'cropperjs/dist/cropper.css';
import { CloudUpload } from 'lucide-react';

type Props = {
    uploadPhoto: (file: Blob) => void;
    loading: boolean;
};

export default function ImageUploadWidget({ uploadPhoto, loading }: Props) {
    const [files, setFiles] = useState<object & { preview: string }[]>([]);
    const cropperRef = useRef<ReactCropperElement>(null);

    // Clears image blobs from memory
    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file as Blob),
                }),
            ),
        );
    }, []);

    const onCrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        cropper?.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob as Blob));
    }, [uploadPhoto]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <div>
                <p className='mb-2 text-xs font-medium tracking-wider text-purple-600 uppercase'>
                    Step 1 - Add image
                </p>
                <div
                    {...getRootProps()}
                    className={`flex h-[280px] cursor-pointer flex-col items-center justify-center rounded-md border-3 border-dashed p-8 text-center ${
                        isDragActive ? 'border-green-500' : 'border-gray-200'
                    }`}
                >
                    <input {...getInputProps()} />
                    <CloudUpload size={60} />
                    <p className='mt-2 text-xl'>Drop image here</p>
                </div>
            </div>

            <div>
                {files[0]?.preview && (
                    <>
                        <p className='mb-2 text-xs font-medium tracking-wider text-purple-600 uppercase'>
                            Step 2 - Resize image
                        </p>
                        <Cropper
                            src={files[0].preview}
                            style={{ height: 300, width: '90%' }}
                            initialAspectRatio={1}
                            aspectRatio={1}
                            preview='.img-preview'
                            guides={false}
                            viewMode={1}
                            background={false}
                            ref={cropperRef}
                        />
                    </>
                )}
            </div>

            <div>
                {files[0]?.preview && (
                    <>
                        <p className='mb-2 text-xs font-medium tracking-wider text-purple-600 uppercase'>
                            Step 3 - Preview & upload
                        </p>
                        <div
                            className='img-preview mb-3'
                            style={{
                                width: 300,
                                height: 300,
                                overflow: 'hidden',
                            }}
                        />
                        <button
                            onClick={onCrop}
                            disabled={loading}
                            className='w-[300px] rounded-md bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-300'
                        >
                            Upload
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
