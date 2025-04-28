import TipTap from '@/components/rich-text-editor/TipTap';

type Props = {
    content: string;
};

export default function WikiEntry({ content }: Props) {
    const onChange = (content: string) => {
        console.log('onChange: ', content);
    };
    return (
        <TipTap
            content={content}
            onChange={onChange}
        />
    );
}
