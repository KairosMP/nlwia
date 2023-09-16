import cors from 'cors';
import express, { request, response } from 'express';

import { convert } from './convert.js';
import { download } from './download.js';
import { transcribe } from './transcribe.js';

import { summarize } from './summarize.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/summary/:id', async (request, response) => {
  try {
    await download(request.params.id);

    const audioConverted = await convert();
    console.log(audioConverted);

    const result = await transcribe(audioConverted);

    return response.json({ result });
  } catch (error) {
    console.log(error);
    return response.json({ error });
  }
});

app.post('/summary', async (request, response) => {
  try {
    const result = await summarize(request.body.text);

    return response.json({ result });
  } catch (error) {
    console.log(error);
    return response.json({ error });
  }
});

const port = 3333;

app.listen(port, () => {
  console.log(`Server is running on ⚡ port http://localhost:${port}/ `);
});
