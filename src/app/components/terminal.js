export default function Terminal() {
    return (
        <>
            <div className="bg-gray-800 p-1 flex flex-col items-start justify-center h-full w-full border-t border-black">
                <span className="flex pl-2">
                    <span className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </span>
                    <span className="p-2 w-full">Terminal</span>
                </span>
                <div className="p-2 border-t border-black bg-black h-full w-full">
                    <span>Terminal</span>
                </div>
            </div>
        </>
    );
}