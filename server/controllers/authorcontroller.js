import AuthorService from '../services/author'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config'

let author = AuthorService

class AuthorController {
    static async newAuthor(req, res) {
        try {
            const { name, email, password } = req.body
            if(!name || !email || !password) return res.status(400).json({ success: false })
            const hashpassword = bcrypt.hashSync(password, 10)
            const info = await AuthorService.newAuthor(req.body)
            info.password = hashpassword
            await info.save()
            return res.status(201).json({ success: true })
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async getAuthors(_req, res) {
        try {
            const info = await AuthorService.getAuthors()
            if(info.length > 0) {
                return res.status(200).json({ 
                    success: false,
                    info: info 
                })
            }
            else {
                return res.status(400).json({ 
                    success: false 
                })
            }

        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async getAuthor(req, res) {
        try {
            const { authorId } = req.params
            const info = await AuthorService.getAuthor(authorId)
            if(info) {
                return res.status(200).json({
                    success: true
                })
            }
            else {
                return res.status(400).json({
                    success: false
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async authorLogin(req, res) {
        try {
            const { email, password } = req.body
            const author = await AuthorService.authorEmail(email)
            if(!author) {
                return res.status(400).json({
                    success: false,
                    message: "Wrong email/password"
                })
            }
            else {
                const passwordIsValid = bcrypt.compareSync(password, author.password)
                if(!passwordIsValid) {
                    return res.status(400).json({
                        success: false,
                        message: "Wrong email/password"
                    })
                }
                else {
                    const token = jwt.sign({_id: author._id, email: author.email, name: author.name}, config.USER_SECRET)
                    return res.status(200).json({
                        success: true,
                        token: token
                    })
                }
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async updateAuthor(req, res) {
        try {
            const { authorId } = req.params
            const info = await AuthorService.getAuthor(authorId)
            if(info) {
                const { name, email } = req.body
                info.name = name || info.name
                info.email = email || info.email
                await info.save()
                return res.status(200).json({
                    success: true
                })
            }
            else {
                return res.status(400).json({
                    success: false
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async deleteAuthor(req, res) {
        try {
            const { authorId } = req.params
            const info = await AuthorService.deleteAuthor(authorId)
            if(!info) {
                return res.status(400).json({
                    success: false
                })
            }
            else {
                return res.status(200).json({
                    success: true
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }
}

export default AuthorController;
