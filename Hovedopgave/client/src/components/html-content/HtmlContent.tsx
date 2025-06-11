import { useNavigate } from 'react-router';
import { useEffect, useRef } from 'react';

interface Props {
    content: string;
    className?: string;
}

export function HtmlContent({ content, className = '' }: Props) {
    const navigate = useNavigate();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            const link = target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            e.preventDefault();
            navigate(href);
        };

        // Add event listener to the container
        const container = contentRef.current;
        container.addEventListener('click', handleLinkClick);

        // Cleanup
        return () => {
            container.removeEventListener('click', handleLinkClick);
        };
    }, [navigate]);

    return (
        <article
            ref={contentRef}
            className={`prose ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
