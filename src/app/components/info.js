import { TypeAnimation } from "react-type-animation";

export default function Info() {
    return (
        <>
            <div className="ml-2 p-2 flex flex-col w-3/12 border border-green-700 rounded-md">
                <span className="border-b border-green-700 flex">
                    <span className="p-2 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </span>
                    <span className="p-2">Info</span>
                </span>
                <TypeAnimation
                    sequence={[
                        'Welcome to the Machine Unlearning Playground, inspired by the "Deep Regression Unlearning" paper. Begin by loading the dataset using the "Load Data" button.'
                    ]}
                    className="p-5"
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '1em', display: 'inline-block', color: 'lawngreen', background: '#000000' }}
                    repeat={0}
                />
            </div>
        </>
    );
}