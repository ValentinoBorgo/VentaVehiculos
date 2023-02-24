
function correoEnviado() {
  const name = document.getElementById('nmC').value;
  const email = document.getElementById('eC').value;
  const asunto = document.getElementById('aC').value;
  const mensaje = document.getElementById('mC').value;
  
  fetch('https://formsubmit.co/', {
    method: 'POST',
    body: JSON.stringify({ name: name, email: email, asunto : asunto, mensaje : mensaje }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response)
  .then(data => {
    console.log(data);
    swal({
      title : 'Correo enviado efectivamente!',
      text : 'Puede seguir navegando',
      icon: 'success',
    })
  })
  .catch(error => {
    console.error(error);
    alert('An error occurred while submitting the form.');
  });
}