import ImageUploadWidget from '@/components/ImageUploadWidget';
import CreateCampaignForm from './CreateCampaignForm';

export default function CreateCampaignPage() {
    const handleImageUpload = (file: Blob) => {
        console.log(file);
    };

    return (
        <section className='flex h-screen flex-col items-center justify-center gap-10'>
            <CreateCampaignForm />
            <ImageUploadWidget
                uploadPhoto={handleImageUpload}
                loading={false}
            />
        </section>
    );
}
