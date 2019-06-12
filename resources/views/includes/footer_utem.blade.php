<div id="footer" class="footer_re position-absolute w-100">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-md-none d-block d-none d-md-block footer_parte_azul_sup">
      <div class="container contenedor_imagenes_footer d-none d-md-block">
        <div class="col-md-8 col-lg-8 d-none d-md-block padding_left_0">          
            <p class="texto_rs_footer">CONÉCTATE CON NOSOTROS:</p>             
            <img class="roll_over rs_footer_left" onclick="window.open('https://www.facebook.com/utem.cl')" src="{{asset('assets/img/redes_sociales/facebook.png')}}" alt="">
            <img class="roll_over rs_footer_centro" onclick="window.open('https://twitter.com/utem')" src="{{asset('assets/img/redes_sociales/twitter.png')}}" alt="">
            <img class="roll_over rs_footer_centro" onclick="window.open('https://www.youtube.com/channel/UCOD3DHD_bafDGzGPYxTtRRw')" src="{{asset('assets/img/redes_sociales/youtube.png')}}" alt="">  
            <img class="roll_over rs_footer_right" onclick="window.open('https://cl.linkedin.com/edu/universidad-tecnol%C3%B3gica-metropolitana-11004')" src="{{asset('assets/img/redes_sociales/linkedin.png')}}" alt="">  
        </div>
        <div class="col-md-1 col-lg-1 d-none d-md-block">                    
        </div>
        <div class="col-md-3 col-lg-3 d-none d-md-block padding_right_0">  
          <img class="img-responsive logo_ac_footer logo_ac_footer_grande d-none d-md-block" src="{{asset('assets/img/utem/utem_acreditada_2016-2020-cna.png')}}" alt="">
        </div>  
      </div>  
      <img class="img-responsive logo_ac_footer d-md-none d-block" src="{{asset('assets/img/utem/utem_acreditada_2016-2020-cna.png')}}" alt="">
    </div>

    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-md-none d-block d-none d-md-block footer_parte_azul_cent">
      <div class="container contenedor_imagenes_footer d-none d-md-flex">
        <div class="col-md-3 col-lg-3 d-none d-md-block cuadro_footer_1 padding_left_0">
          <p class="titulo_cuadro_footer">NUESTROS SITIOS:</p>
            <a href="http://www.utem.cl/" target="_blank"><p class="texto_cuadro_footer">UTEM</p></a>
            <a href="http://vtte.utem.cl" target="_blank"><p class="texto_cuadro_footer">VTTE</p></a>
            <a href="http://vtte.utem.cl/encuentrogafutem2015/" target="_blank"><p class="texto_cuadro_footer">GAF</p></a>
            <p><br></p>            
        </div>
        <div class="col-md-3 col-lg-3 d-none d-md-block cuadro_footer_1">
          <p class="titulo_cuadro_footer">SERVICIOS:</p>
           <!-- <p class="texto_cuadro_footer fecha_cursor" onclick="trae_contacto();">Contacto Académico</p> -->
            <a href="https://sisav.utem.cl/documentos/bases-postulacion-proyectos-vcm-retroalimentacion-docencia-pregrado-2019.pdf" target="_blank"><p class="texto_cuadro_footer">Bases Proyectos</p></a>

            <a href="https://sisav.utem.cl/documentos/bases-programas-transferencia-tecnologica-innovacion-vcm-2019.pdf" target="_blank"><p class="texto_cuadro_footer">Bases Programas</p></a>

            
            <p class="texto_cuadro_footer fecha_cursor" onclick="trae_consulta();">Consultas</p>
            <a href="https://ret.utem.cl/empleos-y-practicas/"><p class="texto_cuadro_footer">Empleos</p></a>            
             
            <p><br></p>           
        </div>
        <div class="col-md-3 col-lg-3 d-none d-md-block cuadro_footer_1">
          <p class="titulo_cuadro_footer">NUESTRO SITIO:</p>
            <a href="documentos/manual_usuario.pdf" target="_blank"><p class="texto_cuadro_footer">Manual de Usuario</p></a>
            <a href="http://transparencia.utem.cl/politica-de-privacidad/" target="_blank"><p class="texto_cuadro_footer">Políticas de Privacidad</p></a>
            <!-- <a class="fecha_cursor" onclick="trae_reportar_problema()"><p class="texto_cuadro_footer">Reportar Problemas</p></a> -->
            <a href="documentos/preguntas-frecuentes.pdf" target="_blank"><p class="texto_cuadro_footer">Preguntas Frecuentes</p></a>
            <a href="documentos/manual-informe-gestion.pdf" target="_blank"><p class="texto_cuadro_footer">Manual Informe Gestión</p></a>
            <a href="documentos/Manual_Ejecucion_Gasto.pdf" target="_blank"><p class="texto_cuadro_footer">Manual Solicitud de Gasto</p></a>
            <a href="documentos/Manual_DC_admisibilidad.pdf" target="_blank"><p class="texto_cuadro_footer">Manual DC - Admisibilidad </p></a>
        </div>
        <div class="col-md-3 col-lg-3 d-none d-md-block cuadro_footer_2">

            <form name="ac_intra" action="https://www.utem.cl/login.php" method="post">
              <p class="titulo_cuadro_footer">ACCESO INTRANET:</p>
              <div class="control-group">              
                      <div class="controls">                
                        <input class="form-control valida_rut_3" type="text" name="usuario" id="usuario" placeholder="Rut" autocomplete="username" />
                      </div>
              </div>      
              <p class="abajo_input_login texto_corto_destacado"></p>
              <div class="control-group">              
                      <div class="controls">                
                        <input class="form-control" type="password" name="pwd"  id="clave" placeholder="Contraseña" autocomplete="new-password"/>
                      </div>
              </div>
              <p class="abajo_input_login texto_corto_destacado"></p>
              <div class="control-group">              
                      <div class="controls">
              <input class="form-control" type="submit" name="boton" id="entrar" value="Entrar">
               </div>
              </div>  
            </form>
            <?php /*
            <script>
              $("input.valida_rut_3")
                .rut({formatOn: 'keyup', validateOn: 'keyup'})
                .on('rutInvalido', function(){ 
                  $(this).parents(".control-group").addClass("has-error")
                })
                .on('rutValido', function(){ 
                  $(this).parents(".control-group").removeClass("has-error")
                });
            </script> */ ?>
        </div>
      </div>  
    </div>  

    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-md-none d-block d-none d-md-block footer_parte_azul_inf">
      <div  class="row">
        <div  id="menu_footer" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-md-none d-block">          
          <ul class="d-md-none d-block">
            <li><a href="/preguntas-frecuentes.php">PREGUNTAS FRECUENTES</a>&nbsp;|&nbsp;</li>
            <li><a href="http://transparencia.utem.cl/politica-de-privacidad/">POLITICAS DE PRIVACIDAD</a>&nbsp;|&nbsp;</li>
            <li><a href="">MAPA DEL SITIO</a></li>          
          </ul>         
        </div>
      </div> 
      <div class="col-xs-12 col-sm-12 d-md-none d-block p-0">
        <p class="texto_footer">Dieciocho 161 - Santiago, Chile. Metro Moneda- Fono:227877500 <br> 
          Sitio diseñado y desarrollado por la Vicerrectoria de Transferencia Tecnologica y Extensión - UTEM <br> 
          Soporte informático VTTE y SISEI
        </p>
      </div>

      <div class="container d-none d-md-flex">
        <div class="col-md-8 col-lg-8 d-none d-md-block p-0">
          <p class="texto_footer">Dieciocho 161 - Santiago, Chile. Metro Moneda- Fono:227877500 <br> 
            Sitio diseñado y desarrollado por la Vicerrectoria de Transferencia Tecnologica y Extensión - UTEM <br> 
            Soporte informático VTTE y SISEI
          </p>
        </div>
        <div class="col-md-4 col-lg-4 d-none d-md-block p-0">
          <img class="logo_gob_grande" src="{{asset('assets/img/utem/logo_gob_footer_grande.png')}}" alt="">
        </div>  
      </div>
      <div class="col-xs-12 col-sm-12 d-md-none d-block p-0 texto_footer">
        redes sociales
      </div>  
    </div>
</div>