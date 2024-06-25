import './component.css'

export default function Loading() {
    return (
        <div id='bgimg'>
            <div className='bg'>
                <div className="loader">
                    <div className="inner one"></div>
                    <div className="inner two"></div>
                    <div className="inner three"></div>
                </div>
            </div>
        </div>
    );
}