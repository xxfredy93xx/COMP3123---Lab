export default function Loading(){
    return(
        <div className="flex min-h-40 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border"></div>

            <span className="ml-3 text-gray-600">
                Loading...
            </span>
            

        </div>
    );
}