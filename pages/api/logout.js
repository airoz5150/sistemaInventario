const cookie = require("cookie");


export default function logoutHandle(req, res) {
    res.setHeader('Set-Cookie', cookie.serialize('token', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0, // Esto elimina la cookie
        path: '/',
        sameSite: 'strict',
    }));

    return res.status(200).json({ success: true });
}
