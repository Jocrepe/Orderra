import * as MenuService from '../services/menu.service.js'

export const fetchMenu = async (req, res, next) => {
    try {
        const result = await MenuService.fetchMenu()
        res.status(200).json({
            message: 'FETCH MENU',
            data: result
        })
    } catch (error) {
        next(error)
    }
}