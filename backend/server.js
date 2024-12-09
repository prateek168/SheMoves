import http from 'http'
import app from  './src/app.js'
 
const PORT = process.env.PORT ?? 3000 ;

const server = http.createServer(app);

server.listen(PORT , ()=>{
  console.log(`Server is listening at PORT ${PORT}`);
})
