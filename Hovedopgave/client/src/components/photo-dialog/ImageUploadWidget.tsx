import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { useDropzone } from 'react-dropzone';
import 'cropperjs/dist/cropper.css';
import { CloudUpload } from 'lucide-react';
import { Button } from '../ui/button';

type Props = {
    uploadPhoto: (file: Blob) => void;
    loading: boolean;
};

// With help from
// https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/

export default function ImageUploadWidget({ uploadPhoto, loading }: Props) {
    const [files, setFiles] = useState<object & { preview: string }[]>([]);
    const cropperRef = useRef<ReactCropperElement>(null);

    // Clears image blobs from memory
    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const onDrop = (acceptedFiles: File[]) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
            ),
        );
    };

    const onCrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        cropper?.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob as Blob));
    }, [uploadPhoto]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div className='grid grid-cols-3 gap-8 text-yellow-500'>
            <div>
                <p className='mb-2 text-xs font-medium uppercase'>
                    Step 1 - Add image
                </p>
                <div
                    {...getRootProps()}
                    className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-md border-3 border-dashed border-yellow-500/70 p-4 text-center ${
                        isDragActive ? 'border-green-500' : 'border-black/80'
                    }`}
                >
                    <input {...getInputProps()} />
                    <CloudUpload
                        size={30}
                        className='opacity-20 sm:size-60'
                    />
                    <p className='mt-2 text-base sm:text-xl'>Drop image here</p>
                </div>
            </div>

            <div>
                {files[0]?.preview && (
                    <>
                        <p className='mb-2 text-xs font-medium uppercase'>
                            Step 2 - Resize image
                        </p>
                        <Cropper
                            src={files[0].preview}
                            style={{ height: 200, width: '100%' }}
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
                        <p className='mb-2 text-xs font-medium uppercase'>
                            Step 3 - Preview & upload
                        </p>
                        <div
                            className='img-preview mb-3'
                            style={{
                                width: '100%',
                                maxWidth: 200,
                                height: 200,
                                overflow: 'hidden',
                            }}
                        />

                        <Button
                            onClick={onCrop}
                            disabled={loading}
                            className='absolute bottom-10 left-10 w-full max-w-[200px] cursor-pointer px-4 py-2 disabled:cursor-not-allowed'
                        >
                            Add photo
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
