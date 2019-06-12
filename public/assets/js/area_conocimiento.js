/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3 & 4
Version: 4.0.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v4.0/admin/
*/

var handleJstreeCheckable = function() {
    $('#jstree-checkable2').jstree({
        'plugins': ["wholerow", "checkbox", "types"],
        'core': {
            "themes": {
                "responsive": false
            },    
            'data': [{
                "text": "Ciencias Naturales",
                "children": [{
                    "text": "Matematicas",
                    "children": [{
                        "text": "Matemáticas Puras"
                    }, {
                        "text": "Matemáticas Aplicadas"
                    }, {
                        "text": "Estadísticas y Probabilidades"
                    }, {
                        "text": "Otras Especialidades de las Matemáticas"
                    }]

                }, {
                    "text": "Ciencias de la información y computación",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ciencias de la Computación"
                    }, {
                        "text": "Ciencias de la Información y Bioinformática"
                    }, {
                        "text": "Otras Especialidades de las Ciencias de la Información y Computación"
                    }]

                }, {
                    "text": "Ciencias Físicas",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Física Atómica, Molecular y Química"
                    }, {
                        "text": "Física de la Materia Condensada"
                    }, {
                        "text": "Física de Partículas y Campos"
                    }, {
                        "text": "Física Nuclear"
                    }, {
                        "text": "Física de Plasmas y Fluidos"
                    }, {
                        "text": "Óptica"
                    }, {
                        "text": "Acústica"
                    }, {
                        "text": "Astronomía"
                    }, {
                        "text": "Otras Especialidades de la Física"
                    }]

                }, {
                    "text": "Ciencias Químicas",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Química Orgánica"
                    }, {
                        "text": "Química Inorgánica y Nuclear"
                    }, {
                        "text": "Físico-Química"
                    }, {
                        "text": "Polímeros"
                    }, {
                        "text": "Electroquímica"
                    }, {
                        "text": "Química de los Coloides"
                    }, {
                        "text": "Química Analítica"
                    }, {
                        "text": "Otras Especialidades de la Química"
                    }]

                }, {
                    "text": "Ciencias de la Tierra y del Medio Ambiente",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Geociencias"
                    }, {
                        "text": "Mineralogía"
                    }, {
                        "text": "Paleontología"
                    }, {
                        "text": "Geoquímica y Geofísica"
                    }, {
                        "text": "Geografía Física"
                    }, {
                        "text": "Geología"
                    }, {
                        "text": "Vulcanología"
                    }, {
                        "text": "Ciencias del Medio Ambiente"
                    }, {
                        "text": "Meteorología y Ciencias Atmosféricas"
                    }, {
                        "text": "Climatología"
                    }, {
                        "text": "Oceanografía, Hidrología y Recursos del Agua"
                    }, {
                        "text": "Otras Especialidades de Ciencias de la Tierra"
                    }]

                }, {
                    "text": "Ciencias Biológicas",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Biología Celular"
                    }, {
                        "text": "Microbiología"
                    }, {
                        "text": "Virología"
                    }, {
                        "text": "Bioquímica"
                    }, {
                        "text": "Biología Molecular"
                    }, {
                        "text": "Métodos de Investigación en Bioquímica"
                    }, {
                        "text": "Micología"
                    }, {
                        "text": "Biofísica"
                    }, {
                        "text": "Genética y Herencia"
                    }, {
                        "text": "Biología Reproductiva"
                    }, {
                        "text": "Biología del Desarrollo"
                    }, {
                        "text": "Botánica"
                    }, {
                        "text": "Zoología, Ornitología, Entomología, Comportamiento Biológico"
                    }, {
                        "text": "Biología Marina, Limnología"
                    }, {
                        "text": "Ecología"
                    }, {
                        "text": "Conservación de la Biodiversidad"
                    }, {
                        "text": "Biología (Teórica, Matemática, Criobiología, Ritmos Biológicos)"
                    }, {
                        "text": "Biología Evolutiva"
                    }, {
                        "text": "Otras Especialidades de la Biología"
                    }]
                },
            ]},
//-------------------------------------------------------------------
            {
                "text": "Ingenieria y Tecnologia",
                "children": [{
                    "text": "Ingeniería Civil",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ingeniería Civil"
                    }, {
                        "text": "Ingeniería Arquitéctonica"
                    }, {
                        "text": "Ingeniería de la Construcción"
                    }, {
                        "text": "Ingeniería Estructural y Municipal"
                    }, {
                        "text": "Ingeniería de Transporte"
                    }]

                }, {
                    "text": "Ingeniería Eléctrica, Ingeniería Electrónica, Informática",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ingeniería Eléctrica y Electrónica"
                    }, {
                        "text": "Robótica y Sistemas de Control Automático"
                    }, {
                        "text": "Sistemas de Automatización y Control"
                    }, {
                        "text": "Ingeniería de Sistemas y Comunicaciones"
                    }, {
                        "text": "Telecomunicaciones"
                    }, {
                        "text": "Arquitectura y Hardware de Computación"
                    }]
                    
                }, {
                    "text": "Ingeniería Mecánica",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ingeniería Mecánica"
                    }, {
                        "text": "Mecánica Aplicada"
                    }, {
                        "text": "Termodinámica"
                    }, {
                        "text": "Ingeniería Aeroespacial"
                    }, {
                        "text": "Ingeniería Nuclear"
                    }, {
                        "text": "Ingeniería en Sonido"
                    }]

                }, {
                    "text": "Ingeniería Química",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ingeniería Química"
                    }, {
                        "text": "Ingeniería de Procesos Químicos"
                    }]

                }, {
                    "text": "Ingeniería de los Materiales",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ingeniería de los Materiales"
                    }, {
                        "text": "Cerámicos"
                    }, {
                        "text": "Recubrimientos y Películas"
                    }, {
                        "text": "Compuestos (Laminados, plásticos reforzados, fibras sintéticas y naturales)"
                    }, {
                        "text": "Papel y Madera"
                    }, {
                        "text": "Textiles"
                    }]

                }, {
                    "text": "Ingeniería Médica",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ingeniería Médica"
                    }, {
                        "text": "Tecnología Médica"
                    }]

                }, {
                    "text": "Ingeniería Ambiental",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ingeniería Ambiental y Geológica"
                    }, {
                        "text": "Geotecnia"
                    }, {
                        "text": "Ingeniería del Petróleo (combustibles y aceites)"
                    }, {
                        "text": "Sensores Remotos"
                    }, {
                        "text": "Minería y Procesamiento de Minerales"
                    }, {
                        "text": "Ingeniería Marina y Naval"
                    }, {
                        "text": "Ingeniería Oceanográfica"
                    }]

                }, {
                    "text": "Biotecnología Ambiental",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Biotecnología Ambiental"
                    }, {
                        "text": "Biorremediación"
                    }, {
                        "text": "Biotecnología de Diagnóstico (Chips de ADN y dispositivos biosensores) en manejo ambiental"
                    }, {
                        "text": "Ética Relacionada con Biotecnología Ambiental"
                    }]

                }, {
                    "text": "Biotecnología Industrial",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Biotecnología Industrial"
                    }, {
                        "text": "Tecnologías de Bioprocesamiento, Biocatálisis, Fermentación"
                    }, {
                        "text": "Bioproductos (productos que se manufacturan usando biotecnología como materia prima), Biomateriales, Bioplásticos, Biocombustibles, Químicos Brutos y Finos Bioderivados, Materiales Nuevos Bioderivados"
                    }]

                }, {
                    "text": "Nanotecnología",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Nanomateriales (producción y propiedades)"
                    }, {
                        "text": "Nanoprocesos (aplicaciones a nanoescala)"
                    }]

                }, {
                    "text": "Otras Ingenierías y Tecnologías",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Tecnología de los Alimentos"
                    }, {
                        "text": "Otras Ingenierías y Tecnologías"
                    }]
                },
                
            ]},
//-------------------------------------------------------------------
            {
                "text": "Medicina y Ciencias de la Salud",
                "children": [{
                    "text": "Medicina Básica",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Anatomía y Morfología"
                    }, {
                        "text": "Genética Humana"
                    }, {
                        "text": "Inmunología"
                    }, {
                        "text": "Neurociencias"
                    }, {
                        "text": "Farmacología y Farmacia"
                    }, {
                        "text": "Química Médica"
                    }, {
                        "text": "Toxicología"
                    }, {
                        "text": "Fisiología"
                    }, {
                        "text": "Patología"
                    }, {
                        "text": "Otros Temas de Medicina Básica"
                    }]

                }, {
                    "text": "Medicina Clínica",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Andrología"
                    }, {
                        "text": "Obstetricia y Ginecología"
                    }, {
                        "text": "Pediatría"
                    }, {
                        "text": "Sistema Cardiovascular y Cardíaco"
                    }, {
                        "text": "Enfermedades Vasculares Periféricas"
                    }, {
                        "text": "Hematología"
                    }, {
                        "text": "Sistema Respiratorio"
                    }, {
                        "text": "Medicina de Emergencia y de Cuidados Críticos"
                    }, {
                        "text": "Anestesiología"
                    }, {
                        "text": "Ortopedia"
                    }, {
                        "text": "Cirugía"
                    }, {
                        "text": "Radiología, Medicina Nuclear y de Imágenes"
                    }, {
                        "text": "Trasplantes"
                    }, {
                        "text": "Odontología, Cirugía y Medicina Oral"
                    }, {
                        "text": "Dermatología y Enfermedades Venéreas"
                    }, {
                        "text": "Alergias"
                    }, {
                        "text": "Reumatología"
                    }, {
                        "text": "Endocrinología y Metabolismo (incluye diabetes, hormonas)"
                    }, {
                        "text": "Gastroenterología y Hepatología"
                    }, {
                        "text": "Urología y Nefrología"
                    }, {
                        "text": "Oncología"
                    }, {
                        "text": "Oftalmología"
                    }, {
                        "text": "Otorrinolaringología"
                    }, {
                        "text": "Psiquiatría"
                    }, {
                        "text": "Neurología Clínica"
                    }, {
                        "text": "Geriatría y Gerontología"
                    }, {
                        "text": "Medicina General e Interna"
                    }, {
                        "text": "Otros Temas de Medicina Clínica"
                    }, {
                        "text": "Medicina Integrativa y Complementaria (Sistemas de práctica alternativa)"
                    }]
                    
                }, {
                    "text": "Ciencias de la Salud",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Servicios y Cuidados en Ciencias de la Salud (Administración de hospitales, financiamiento de la atención hospitalaria)"
                    }, {
                        "text": "Políticas de Salud y Servicios"
                    }, {
                        "text": "Enfermería"
                    }, {
                        "text": "Nutrición, Dietética"
                    }, {
                        "text": "Salud Pública y Ambiental"
                    }, {
                        "text": "Medicina Tropical"
                    }, {
                        "text": "Parasitología"
                    }, {
                        "text": "Enfermedades Infecciosas"
                    }, {
                        "text": "Epidemiología"
                    }, {
                        "text": "Salud Ocupacional"
                    }, {
                        "text": "Ciencias del Deporte y Acondicionamiento Físico"
                    }, {
                        "text": "Ciencias Sociales Biomédicas (Incluye, planificación familiar, salud sexual, psicología oncológica, efectos políticos y sociales de la investigación biomédica)"
                    }, {
                        "text": "Ética Médica"
                    }, {
                        "text": "Abuso de Substancias"
                    }]

                }, {
                    "text": "Biotecnología Médica",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Biotecnología Relacionada con la Salud"
                    }, {
                        "text": "Tecnologías que involucran la manipulación de células, tejidos, órganos o el organismo completo (reproducción asistida)"
                    }, {
                        "text": "Tecnología para la Identificación y Funcionamiento del ADN, proteínas y encimas ycomo influyen en la aparición de enfermedades y la mantención del bienestar(Diagnóstico e intervenciones terapéuticas basados en genes (Farmacogenómica,terapias basadas en genes)"
                    }, {
                        "text": "Biomateriales (Relacionados con implantes médicos, dispositivos y sensores)"
                    }, {
                        "text": "Biotecnología Médica Relacionada con la Ética"
                    }]

                }, {
                    "text": "Otras Ciencias Médicas",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ciencia Forense"
                    }, {
                        "text": "Otras Ciencias Médicas"
                    }]
                },
                
            ]},
//-------------------------------------------------------------------
            {
                "text": "Ciencias Agricolas",
                "children": [{
                    "text": "Agricultura, Silvicultura, Pesca",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Agricultura"
                    }, {
                        "text": "Silvicultura"
                    }, {
                        "text": "Pesca"
                    }, {
                        "text": "Ciencias del Suelo"
                    }, {
                        "text": "Horticultura"
                    }, {
                        "text": "Viticultura"
                    }, {
                        "text": "Agronomía"
                    }, {
                        "text": "Fitomejoramiento y Protección Vegetal"
                    }]

                }, {
                    "text": "Ciencia Animal y Lechería",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ciencia Animal y Lechería"
                    }, {
                        "text": "Ganadería"
                    }, {
                        "text": "Animales Domésticos"
                    }]
                    
                }, {
                    "text": "Ciencias Veterinarias - Biotecnología Agrícola",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Biotecnología Agrícola"
                    }, {
                        "text": "Biotecnología Agrícola y Biotecnología Alimentaria"
                    }, {
                        "text": "Tecnología de Modificación Genética"
                    }, {
                        "text": "Biotecnología Agrícola relacionada con la Ética"
                    }]
                },
                
            ]},
//-------------------------------------------------------------------
            {
                "text": "Ciencias Sociales",
                "children": [{
                    "text": "Psicología",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Psicología (Incluyendo la relación hombre-máquina)"
                    }, {
                        "text": "Psicología, Especial (Incluye terapias de aprendizaje, lenguaje, audición, visión y otras discapacidades físicas y mentales)"
                    }, {
                        "text": "Otras Especialidades de la Psicología"
                    }]

                }, {
                    "text": "Economía y Negocios",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Economía"
                    }, {
                        "text": "Econometría"
                    }, {
                        "text": "Relaciones Industriales"
                    }, {
                        "text": "Administración y Negocios"
                    }, {
                        "text": "Otras Especialidades de la Economía"
                    }]
                    
                }, {
                    "text": "Ciencias de la Educación",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Educación General"
                    }, {
                        "text": "Educación Especial"
                    }, {
                        "text": "Otras Especialidades de la Educación"
                    }]

                }, {
                    "text": "Sociología",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Sociología"
                    }, {
                        "text": "Demografía"
                    }, {
                        "text": "Etnología"
                    }, {
                        "text": "Otras especialidades de la Sociología"
                    }]

                }, {
                    "text": "Antropología",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Antropología"
                    }, {
                        "text": "Otras especialidades de la Antropología"
                    }]

                }, {
                    "text": "Derecho",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Derecho"
                    }, {
                        "text": "Derecho Penal"
                    }, {
                        "text": "Criminología"
                    }, {
                        "text": "Otras Especialidades del Derecho"
                    }]

                }, {
                    "text": "Ciencias Políticas",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ciencias Políticas"
                    }, {
                        "text": "Administración Pública"
                    }, {
                        "text": "Teoría Organizacional"
                    }, {
                        "text": "Otras Especialidades de las Ciencias Políticas"
                    }]

                }, {
                    "text": "Geografía Económica y Social",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ciencias Ambientales (aspectos sociales)"
                    }, {
                        "text": "Geografía Cultural y Económica"
                    }, {
                        "text": "Urbanismo"
                    }, {
                        "text": "Planificación del Transporte y Aspectos Sociales del Transporte"
                    }, {
                        "text": "Otras Especialidades de la Geografía Económica y Social"
                    }]

                }, {
                    "text": "Comunicación y Medios",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Periodismo"
                    }, {
                        "text": "Ciencias de la Información (aspectos sociales)"
                    }, {
                        "text": "Bibliotecología"
                    }, {
                        "text": "Medios de Comunicación Socio-Cultural"
                    }, {
                        "text": "Otras Especialidades de Comunicación y Medios"
                    }]

                }, {
                    "text": "Otras Ciencias Sociales",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Ciencias Sociales, interdisciplinaria"
                    }, {
                        "text": "Otras Ciencias Sociales"
                    }]
                },
                
            ]},
//-------------------------------------------------------------------
            {
                "text": "Humanidades",
                "children": [{
                    "text": "Historia y Arqueología",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Historia"
                    }, {
                        "text": "Arqueología"
                    }, {
                        "text": "Historia de Chile"
                    }, {
                        "text": "Otras Especialidades de la Historia y la Arqueología"
                    }]

                }, {
                    "text": "Lenguage y Literatura",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Estudios Generales del Lenguaje"
                    }, {
                        "text": "Lenguajes específicos"
                    }, {
                        "text": "Estudios Generales de la Literatura"
                    }, {
                        "text": "Teoría Literaria"
                    }, {
                        "text": "Literatura específica"
                    }, {
                        "text": "Lingüística"
                    }, {
                        "text": "Otras Especialidades del Lenguaje y la Literatura"
                    }]
                    
                }, {
                    "text": "Filosofía, Etica y Religión",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Filosofía"
                    }, {
                        "text": "Ética"
                    }, {
                        "text": "Teología"
                    }, {
                        "text": "Estudios Religiosos"
                    }, {
                        "text": "Otras Especialidades de la Filosofía, Ética y Religión"
                    }]

                }, {
                    "text": "Arte (Artes, Historia del Arte, Artes Escénicas, Música)",
                    "icon": "fa fa-folder fa-lg",
                    "children": [{
                        "text": "Arte"
                    }, {
                        "text": "Historia del Arte"
                    }, {
                        "text": "Diseño Arquitectónico"
                    }, {
                        "text": "Artes de la Representación (musicología, teatro, dramaturgía)"
                    }, {
                        "text": "Estudios del Folclore"
                    }, {
                        "text": "Estudios de Cine, Radio y Televisión"
                    }, {
                        "text": "Otras Especialidades del Arte"
                    }]

                }
                
            ]},
        ]},
        "types": {
            "default": {
                "icon": "fa fa-folder text-primary fa-lg"
            },
            "file": {
                "icon": "fa fa-file text-success fa-lg"
            }
        }
    });
};



var TreeView = function () {
	"use strict";
    return {
        //main function
        init: function () {
            handleJstreeCheckable();
        }
    };
}();