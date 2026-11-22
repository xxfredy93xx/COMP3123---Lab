export default function ErrorMessage({message}){
    return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="font-semibold">
                Something went wrong!
            </p>

            <p className="text-sm">{message}</p>
        </div>
    );
}