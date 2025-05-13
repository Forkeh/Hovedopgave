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

        // Handle all link clicks within the rendered HTML content
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (!link) return;

            // Get the href attribute
            const href = link.getAttribute('href');
            if (!href) return;

            // Check if this is an external link (starts with http://, https://, or www.)
            const isExternal = /^(https?:\/\/|www\.)/.test(href);

            if (isExternal) {
                // Let the browser handle external links normally
                // You can optionally add target="_blank" handling here if needed
                return;
            } else {
                // For internal links, use React Router
                e.preventDefault();
                navigate(href);
            }
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
        <div
            ref={contentRef}
            className={`prose ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
