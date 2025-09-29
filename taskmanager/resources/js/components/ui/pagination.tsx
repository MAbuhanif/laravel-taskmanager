import { Link } from '@inertiajs/react';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
    total: number;
}

export function Pagination({ links, currentPage, lastPage, from, to, total }: PaginationProps) {
    if (lastPage <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 flex justify-between sm:hidden">
                {/* Mobile pagination */}
                {links[0]?.url && (
                    <Link href={links[0].url!} className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Previous
                    </Link>
                )}
                {links[links.length - 1]?.url && (
                    <Link href={links[links.length - 1].url!} className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Next
                    </Link>
                )}
            </div>
            
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {/* Previous button */}
                        {currentPage > 1 ? (
                            <Link
                                href={links.find(link => link.label === '&laquo; Previous')?.url || '#'}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeft className="h-5 w-5" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-300 cursor-not-allowed">
                                <ChevronLeft className="h-5 w-5" />
                            </span>
                        )}

                        {/* Page numbers */}
                        {links.filter(link => !link.label.includes('Previous') && !link.label.includes('Next')).map((link, index) => (
                            <div key={index}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        className={cn(
                                            "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                                            link.active
                                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                        )}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )}
                            </div>
                        ))}

                        {/* Next button */}
                        {currentPage < lastPage ? (
                            <Link
                                href={links.find(link => link.label === 'Next &raquo;')?.url || '#'}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-300 cursor-not-allowed">
                                <ChevronRight className="h-5 w-5" />
                            </span>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}