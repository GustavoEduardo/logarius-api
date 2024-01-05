import { Config } from './config/config';
import app from './app';

const PORT = Config.port;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
