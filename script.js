document.getElementById('sendPhoneBtn').addEventListener('click', async () => {
  const phone = document.getElementById('phone').value.trim();
  if (!phone) {
    alert('لطفا شماره تلفن را وارد کنید');
    return;
  }

  const res = await fetch('/send-phone', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  const data = await res.json();

  document.getElementById('status').innerText = data.message;
  if (data.success) {
    document.getElementById('phoneSection').style.display = 'none';
    document.getElementById('codeSection').style.display = 'block';
  }
});

document.getElementById('sendCodeBtn').addEventListener('click', async () => {
  const code = document.getElementById('code').value.trim();
  if (!code) {
    alert('لطفا کد تایید را وارد کنید');
    return;
  }

  const res = await fetch('/send-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  const data = await res.json();

  document.getElementById('status').innerText = data.message;
});
