import nextConnect from 'next-connect'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const ExcelJS = require('exceljs')
const fs = require('fs').promises

const upload = multer({
    storage: multer.diskStorage({
    
      destination: './public/uploads',
      
      filename: (req, file, cb) => cb(null, file.originalname + '-' + Date.now()),
      
    }),
    fileFilter: function (req, file, cb) {
        if(file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          return cb(new Error('Only xlsx format is allowed'), false);
        }
        cb(null, true);
        },
  });



  const apiRoute = nextConnect({
   
    onError(error, req, res) {
        res.status(501).json({ error: ` ${error.message}` });
      },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });

  const uploadMiddleware = upload.array('filestoupload');
 
  apiRoute.use(uploadMiddleware);
  
  
  apiRoute.post(async(req, res) => {
    
    let rows = []
    
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(`${req.files[0].path}`);
        
        let worksheets = []
        workbook.eachSheet(function(worksheet, sheetId) {
            worksheets.push(worksheet)
            
        })

        //each index represents the values of a column
        worksheets.forEach(worksheet => {
            const ws = workbook.getWorksheet(worksheet.name);
            ws.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                rows.push({rowValues: row.values, id: uuidv4()})
              
              });
        })

        

    } catch(err) {
        console.log('err catch during xlsx reading', err)
      
    }
    
    try {
      console.log('rows: ', rows)
        // await fs.unlink(req.files[0].path)
        res.status(200).json({ rows: rows });
    } catch(err) {
        console.log('err catch during unlink file: ', err)
    }

  })

  

export default apiRoute


export const config = {
    api: {
      bodyParser: false
    },
  }
  