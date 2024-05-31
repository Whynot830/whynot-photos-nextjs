const parseCookie = (str) => {
    const map = {
        'Max-Age': 'maxAge',
        'Path': 'path',
        'Expires': 'expires',
        'HttpOnly': 'httpOnly',
        'Secure': 'secure',
        'SameSite': 'sameSite',
    };

    return str
        .split('; ')
        .map((v) => v.split('='))
        .reduce((acc, v) => {
            const [key, value] = v
            if (key == 'accessToken' || key === 'refreshToken') {
                acc['name'] = key
                acc['value'] = value
            }
            else if (key === 'HttpOnly' || key === 'Secure')
                acc[map[key]] = true
            else
                acc[map[key]] = value
            return acc
        }, {})
}

export default parseCookie