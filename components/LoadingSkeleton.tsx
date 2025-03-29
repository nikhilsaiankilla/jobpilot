import { Skeleton } from "./ui/skeleton";

export const LoadingSkeletonForDataTable = () => (
    <div className="w-full px-3 sm:px-5 md:px-10 py-5">
        <div className="mb-4">
            <Skeleton className="h-10 w-48 rounded-md" />
        </div>
        <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="w-full flex items-center space-x-2">
                    <div className="w-full grid grid-cols-8 gap-5">
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const LoadingSkeletonForNotes = () => {
    return (<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-6">
        {[...Array(6)].map((_, index) => <Skeleton className="shadow-lg rounded-lg mx-auto rotate-3" />)}
    </div>)
}