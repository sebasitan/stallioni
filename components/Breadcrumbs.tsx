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

    const linkColor = theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-brand-dark';
    const textColor = theme === 'dark' ? 'text-white' : 'text-brand-dark';
    const separatorColor = 'text-slate-400';


    return (
        <nav aria-label="Breadcrumb" className={`text-sm`}>
            <ol className={`flex items-center space-x-2 ${className}`}>
                {path.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && (
                            <svg className={`w-4 h-4 ${separatorColor} mx-2`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                        {item.href ? (
                            <a
                                href={item.href}
                                onClick={(e) => handleNav(e, item.href as string)}
                                className={`${linkColor} hover:underline transition-colors`}
                            >
                                {item.label}
                            </a>
                        ) : (
                             <span className={`font-semibold ${textColor} truncate max-w-[200px] md:max-w-md`} aria-current="page">
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
