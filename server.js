const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');

const app = express();
const PORT = 3000;

const apiId = 28039994;
const apiHash = '00877cdcd706564a4de6abf7f7d64349';

let stringSession = new StringSession('');

let client;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.post('/send-phone', async (req, res) => {
  try {
    const phoneNumber = req.body.phone;

    client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
      // اینجا میتونی پراکسی اضافه کنی اگه لازم بود
    });

    await client.connect();

    await client.sendCode({
      apiId,
      apiHash,
      phoneNumber,
    });

    res.json({ success: true, message: 'کد تایید ارسال شد' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'خطا در ارسال شماره' });
  }
});

app.post('/send-code', async (req, res) => {
  try {
    const code = req.body.code;

    if (!client) {
      res.json({ success: false, message: 'ابتدا شماره را ارسال کنید' });
      return;
    }

    await client.signIn({
      phoneNumber: client._phoneNumber,
      phoneCode: code,
    });

    stringSession = client.session.save();

    res.json({ success: true, message: 'ورود موفقیت‌آمیز بود' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'کد اشتباه یا خطا در ورود' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
