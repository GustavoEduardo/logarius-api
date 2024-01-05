
import { Router } from 'express';
// import multer from 'multer';
// import {fileFilter, storage} from '../helpers/upload'
// let uploadConfig = {fileFilter, storage}
// const upload: any = multer(uploadConfig);
import {Config} from '../config/config'

const routes = Router();

// routes.post('/upload', upload.single('file'), (req, res) => {
//     const originalFileName = req.file?req.file.originalname:"semnome";
//     return res.json({
//         location: '/uploads/'+req.query.pasta+'/'+originalFileName,
//         url: Config.url+'/uploads/'+req.query.pasta+'/'+originalFileName,
//         file:originalFileName
//     });
// });

routes.post('/upload', (req, res) => {
    return res.json({
        message: 'Não implementado'
    });
});



export default routes;