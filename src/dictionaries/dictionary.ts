export type TranslationsDictionary =
  | keyof typeof LanguageEN
  | keyof typeof LanguageES;

export enum LanguageES {
  CREATE_STUDENT_BUTTON = "Crear estudiante",
  NAME = "Nombre completo",
  CANCEL = "Cancelar",
  PROCESSING = "Procesando...",
  PASSWORD = "Contraseña",
  EMAIL = "Email",
  COURSES = "Cursos",
  STUDENT_CREATED_MESSAGE = "🚀 Genial! El alumno se cargo exitosamente a la plataforma.",
  COURSE_CREATED_MESSAGE = "🚀 Excelente! Se agregó correctamente un nuevo curso a la platforma.",
  COURSE_NAME = "Nombre del curso",
  COURSE_DATES = "Dias del curso",
  COURSE_SCHEDULE = "Horarios del curso",
  CREATE_COURSE_BUTTON = "Crear Curso",
  CREATE_COURSE_MODAL_TITLE = "Creación de Curso",
  MEDIA_UPLOAD_MODAL_TITLE = "Subir contenido",
  TITLE = "Titulo",
  DESCRIPTION = "Descripcion",
  TYPE = "Tipo",
  MEDIA_GROUPS = "Cursos con acceso a este contenido",
  CREATE_MEDIA_BUTTON = "Subir contenido",
  MEDIA_CREATED_MESSAGE = "🚀 Genial! El contenido se cargo exitosamente a la plataforma.",
  MEDIA_CREATED_FAILED_MESSAGE = "No se pudo cargar el contenido correctamente. Por favor, intentar nuevamente.",
  DAYS_OF_THE_WEEK="Lunes,Martes,Miercoles,Jueves,Viernes,Sabado"
}

export enum LanguageEN {
  CREATE_STUDENT_BUTTON = "Create student",
  NAME = "Full name",
  CANCEL = "Cancel",
  PROCESSING = "Working on it",
  PASSWORD = "Password",
  EMAIL = "Email",
  COURSES = "Courses",
  STUDENT_CREATED_MESSAGE = "🚀 Great! The Student has been successfully created.",
  COURSE_CREATED_MESSAGE = "🚀 Fantastic! A new course has been added to the platform.",
  COURSE_NAME = "Course name",
  COURSE_DATES = "Course days",
  COURSE_SCHEDULE = "Timetable",
  CREATE_COURSE_BUTTON = "Create Course",
  CREATE_COURSE_MODAL_TITLE = "Course creation",
  MEDIA_UPLOAD_MODAL_TITLE = "Upload media",
  TITLE = "Title",
  DESCRIPTION = "Description",
  TYPE = "Type",
  MEDIA_GROUPS = "Courses with access to this content",
  CREATE_MEDIA_BUTTON = "Upload content",
  MEDIA_CREATED_MESSAGE = "🚀 Great! The Media has been successfully created.",
  MEDIA_CREATED_FAILED_MESSAGE = "An error has occurred when creation the media. Please try again",
  DAYS_OF_THE_WEEK="Monday,Tuesday,Wednesday,Thursday,Friday,Saturday"
}
