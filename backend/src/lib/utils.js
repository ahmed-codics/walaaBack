import jwt from 'jsonwebtoken'

export const generateToken = (userId , res) => {
    const token = jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn: "7d",
    });

res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days (fixed time calculation)
    httpOnly: true, 
    sameSite: "None",  // ✅ Correct spelling + Capitalized "None"
    secure: true,  // ✅ Required for cross-origin cookies
});

    return token ;
}

