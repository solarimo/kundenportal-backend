import { app } from './app';



const start = () => {
  app.listen(8080, () => {
    console.log('listening...8080 ');
    
  });
}

start();



