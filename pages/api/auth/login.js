import connectDB from "/utils/connectDB";
import User from "/models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function LoginHandler(req, res) {
    const { method, body } = req

    connectDB();

    switch (method) {
        case "POST":
            try {
                const { email, password } = body;

                if (!email || !password) {
                    return res.status(301).json({ success: false, message: "insert all data" })
                } else {
                    const user = await User.findOne({ email });
                    if (user) {
                        const checkPass = await bcrypt.compare(password, user.password);
                        if (checkPass) {
                            const access_token = jwt.sign(
                                {
                                    email: user.email,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    role: user.role,
                                },
                                secret, { expiresIn: "24h" }
                            );
                            return res.status(200).json({ success: true, access_token });
                        } else {
                            return res.status(401).json({ success: false, message: "username or password invalid" })
                        }
                    } else {
                        return res.status(404).json({ success: false, message: "user no exist" })
                    }
                }
            } catch (error) {
                return res.status(500).json({ success: false, message: "someone error has ocurred", error })
            }

        default:
            return res.status(503).json({ success: false, message: "method undefined" })
    }
}

//TODO: 