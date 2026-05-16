import React from 'react';
import { useNavigation } from '../App';

interface Breadcrumb {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    path: Breadcrumb[];
    className?: string;
    theme?: 'light' | 'dark';
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, className = '', theme = 'dark' }) => {
    const { navigate } = useNavigation();

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        navigate(href);
    };

    const linkColor = theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-brand-orange';
    const textColor = theme === 'dark' ? 'text-white' : 'text-brand-dark';
    const separatorColor = theme === 'dark' ? 'text-white/40' : 'text-gray-400';


    return (
        <nav aria-label="Breadcrumb" className="text-sm">
            <ol className={`flex items-center ${className}`}>
                {path.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && (
                            <svg className={`w-3 h-3 ${separatorColor} mx-2`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                        {item.href ? (
                            <a
                                href={item.href}
                                onClick={(e) => handleNav(e, item.href as string)}
                                className={`${linkColor} transition-colors`}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span className={`font-medium ${textColor} truncate max-w-[200px] md:max-w-md`} aria-current="page">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
