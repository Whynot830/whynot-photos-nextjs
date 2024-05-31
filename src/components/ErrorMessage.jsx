const ErrorMessage = ({ response }) => {
    return (
        <>
            {response && <p className={response.message?.includes('success') ? 'text-green-600' : 'text-destructive'}>{response.message}</p>}
            {response && (
                <ul>
                    {response.errors?.map((err, idx) => (
                        <li key={idx} className='text-destructive'>{err.msg}</li>
                    ))}
                </ul>
            )}
        </>
    )
}
export default ErrorMessage