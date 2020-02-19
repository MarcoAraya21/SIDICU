<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>

<div>
    Buenas Tardes {{ $name }},
    <br>
    Te enviamos este correo para informarte que haz registrado con exito tu cuenta en sidecu.utem.cl!
    <br>
    Estos son los datos de su cuenta:
    <br>
    Rut: {{$rut}}
    <br>
    Password: {{$password}}
    <br>
    Por favor haz click en el link de abajo o copialo en tu navegador para confirmar tu correo:
    <br>

    <a href="{{ url('verificacion', $verification_code)}}">Confirmar mi correo</a>

    <br/>
</div>

</body>
</html>