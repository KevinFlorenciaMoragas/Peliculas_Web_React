import './LoadingPage.css';
export default function LoadingPage() {

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <div className="spinner-border text-primary" role="status">
            <span class="loader"></span>
            </div>
        </div>

    )

}
