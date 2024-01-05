// import multer from 'multer';
import path from 'path';
    var pasta = ""
    
    let fileFilter= (req: any, file: any, cb: any) => { 
        pasta = req.query.pasta  
        if (req.query.tipo == "imagem" && (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")) {
            cb(null, true);
        } else if (req.query.tipo == "audio" && (file.mimetype == "audio/mp3" || file.mimetype == "audio/wma" || file.mimetype == "audio/aac")) {
            cb(null, true);
        }else if (req.query.tipo == "video" && (file.mimetype == "video/mp4" || file.mimetype == "video/wmv" || file.mimetype == "video/avi")) {
            cb(null, true);
        }else if (req.query.tipo == "texto" && (file.mimetype == "text/txt" || file.mimetype == "text/docx" || file.mimetype == "text/doc" || file.mimetype == "text/pptx" || file.mimetype == "text/psd" || file.mimetype == "text/csv" || file.mimetype == "text/xls " || file.mimetype == "text/xlsx")) {
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error(`Apenas formatos de ${req.query.tipo} são aceitos`));
        }
    }

    let storage: any= {};
    
    // let storage: any= multer.diskStorage({
    //     destination:path.resolve(__dirname,'..','..',`static/uploads/${pasta}`),
    //     // destination: (req: any, file: any, cb: any) => {
    //     //     cb(null, "static/uploads/"+req.pasta);
    //     // },
    //     filename: (req: any, file: any, cb: any) => {
    //         const ext = path.extname(file.originalname);
    //         const name = path.basename(file.originalname,ext);

    //         if(req.query.nome){
    //             var fileName = `${req.query.nome}${ext}`;
    //         }else{
    //             var fileName = `${Date.now()}${ext}`;
    //         }
            
    //         file.originalname = fileName;

    //         cb(null,fileName)
    //     }
    // })

export {fileFilter, storage}