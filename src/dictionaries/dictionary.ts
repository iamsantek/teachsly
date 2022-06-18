/* eslint-disable no-unused-vars */
export type TranslationsDictionary =
  | keyof typeof LanguageEN
  | keyof typeof LanguageES;

export enum LanguageES {
  DISABLED_ACCOUNT_ALERT_TITLE = 'Tu cuenta ha sido desactivada.',
  DISABLED_ACCOUNT_ALERT_DESCRIPTION = 'Por favor, comunicate con nosotros para más información.',
  DEACTIVATED_USER = 'Usuario deshabilitado',
  DEACTIVATED_USER_BUTTON = 'Desactivar usuario',
  DEACTIVATED_USER_DESCRIPTION = 'El usuario dejará de tener acceso a la plataforma y a todos sus contenidos.',
  ACTIVE_USER_BUTTON = 'Activar usuario',
  ACTIVE_USER_DESCRIPTION = 'El usuario volverá a tener acceso a la plataforma y a todos sus contenidos.',
  USER_UPDATE_SUCCESS = 'El usuario ha sido actualizado correctamente.',
  USER_UPDATE_ERROR = 'Hubo un problema al editar el usuario. Por favor, intentar de nuevo.',
  SUCCESS = '🚀 Genial!',
  ERROR = '🤦 Oops!',
  INFO = '',
  CREATE_STUDENT_BUTTON = 'Crear estudiante',
  CREATE_TEACHER_BUTTON = 'Crear profesor',
  NAME = 'Nombre completo',
  CANCEL = 'Cancelar',
  PHONE_NUMBER = 'Número de telefono',
  PROCESSING = 'Procesando...',
  PASSWORD = 'Contraseña',
  EMAIL = 'Email',
  COURSES = 'Cursos',
  STUDENT_CREATED_MESSAGE = 'Nuevo alumno cargado exitosamente,',
  USER_CREATED_ERROR = 'Hubo un problema al cargar el usuario. Por favor, intentar de nuevo',
  TEACHER_CREATED_MESSAGE = 'Nuevo profesor cargado exitosamente.',
  COURSE_CREATED_MESSAGE = 'Se agregó correctamente un nuevo curso a la platforma.',
  COURSE_UPDATED_SUCCESS = 'El curso se actualizó correctamente.',
  COURSE_NAME = 'Nombre del curso',
  COURSE_DATES = 'Dias del curso',
  COURSE_SCHEDULE = 'Horario de inicio',
  COURSE_END_SCHEDULE = 'Horario de finalización',
  CREATE_COURSE_BUTTON = 'Crear Curso',
  CREATE_COURSE_MODAL_TITLE = 'Creación de Curso',
  MEDIA_UPLOAD_MODAL_TITLE = 'Subir contenido',
  TITLE = 'Titulo',
  DESCRIPTION = 'Descripcion',
  TYPE = 'Tipo de contenido',
  MEDIA_GROUPS = 'Cursos con acceso a este contenido',
  CREATE_MEDIA_BUTTON = 'Subir contenido',
  UPDATE_MEDIA_BUTTON = 'Editar contenido',
  EDIT_TEACHER_BUTTON = 'Editar profesor',
  EDIT_STUDENT_BUTTON = 'Editar estudiante',
  UPDATE_COURSE_BUTTON = 'Editar curso',
  MEDIA_CREATED_MESSAGE = 'El contenido se cargo exitosamente a la plataforma.',
  MEDIA_CREATED_FAILED_MESSAGE = 'No se pudo cargar el contenido correctamente. Por favor, intentar nuevamente.',
  MEDIA_UPDATED_MESSAGE = 'El contenido ha sido actualizado correctamente.',
  MEDIA_UPDATED_ERROR_MESSAGE = 'Ocurrió un error al actualizar el contenido. Por favor, intentar nuevamente.',
  DAYS_OF_THE_WEEK = 'Lunes,Martes,Miercoles,Jueves,Viernes,Sabado',
  GROUP_MULTI_SELECT_TITLE = 'Cursos/Grupos que tendrán acceso a este contenido',
  ATTACH_FILE = 'Adjuntar archivo',
  REVIEW_PERMISSIONS = 'Revisa los permisos del contenido antes de continuar',
  ALLOW_ACCESS_MEDIA = 'tendrán acceso a este contenido.',
  MEDIA_DELETED = 'El contenido ha sido eliminado correctamente.',
  SEE_CONTENT = 'Ver contenido',
  DELETE_MEDIA_TITLE = 'Eliminar contenido',
  DELETE_MEDIA_CONFIRMATION_MESSAGE = 'Desea eliminar este contenido?',
  DOWNLOAD = 'Descargar',
  EDIT = 'Editar',
  DELETE = 'Eliminar',
  LOAD_MORE = 'Cargar mas',
  CLOSE = 'Cerrar',
  CONTENT = 'Contenido',
  EDITING = 'Editando',
  VIRTUAL_COURSE = 'Curso virtual',
  ADD_COURSE_BUTTON = 'Nuevo curso',
  COURSE_LINK_HELPER = 'Ingresar link del accesso al curso solo si es virtual',
  COURSE_LINK = 'Link de acceso',
  COMMENTARIES = 'Comentarios',
  MEDIA_LINK_DESCRIPTION = 'Link del contenido',
  CREATE_STUDENT_MODAL_TITLE = 'Nuevo estudiante',
  CREATE_TEACHER_MODAL_TITLE = 'Nuevo profesor',
  SIGN_OUT = 'Cerrar sesión',
  MENU_HOME = 'Inicio',
  MENU_CONTENTS = 'Contenidos',
  MENU_COURSES = 'Cursos',
  MENU_TEACHERS = 'Profesores',
  MENU_STUDENTS = 'Estudiantes',
  MENU_PAYMENTS = 'Pagos',
  NO_CONTENT_TILE = 'Sin resultados',
  NO_CONTENT_DESCRIPTION = 'No hay resultados para esta busqueda.',
  UPLOADED_BY = 'Subido por',
  PHONE_NUMBER_HELPER_TEXT = 'Código de país + código de área + número de teléfono. Sin + ni espacios.',
  ON_SITE_CLASS = 'Presencial',
  COURSE_YEAR = 'Año de cursada',
  GO_TO_VIRTUAL_CLASS = 'Ir a la clase virtual',
  GO_TO_STUDENTS_LIST = 'Ver lista de estudiantes',
  LOADING='Cargando...',
  VIEW_STUDENTS='Ver estudiantes',
  VIEW_MEDIAS='Ver contenidos',
  CREATE_FOLDER='Crear carpeta',
  DRAG_AND_DROP_HELPER_TEXT='Arrastra y suelta los archivos aquí',
  DRAG_AND_DROP_HELPER_TEXT_2='o clickea para seleccionar los archivos',
  MEDIA_SIGNED_URL_ERROR='Hubo un error al generar el link del contenido. Por favor, intentar nuevamente.',
  REVIEW_FILES='Revisar archivos',
  DRAWER_NAME_INFORMATION_ALERT='Verificar que los archivos tengan el nombre correcto y sea descriptivo para que los alumnos lo puedan encontrar facilmente.',
  PASSWORD_RESET_SUCCESS='La contraseña se ha reseteado exitosamente.',
  PASSWORD_RESET_ERROR='Hubo un error al resetear la contraseña. Por favor, intentar nuevamente.',
  RESET_PASSWORD_BUTTON='Resetear contraseña',
  FOLDER='Carpeta',
  UPLOAD_FOLDER='Subir carpeta',
  UPDATE_FOLDER='Actualizar carpeta',
  UPDATE_MEDIA_FOLDER_SUCCESS='La carpeta se actualizó correctamente.',
  UPDATE_MEDIA_FOLDER_FAILURE='Hubo un error al actualizar la carpeta. Por favor, intentar nuevamente.',
  EDIT_FOLDER='Editar carpeta',
  CREATE_MEDIA_FOLDER_SUCCESS='La carpeta se creó correctamente.',
  CREATE_MEDIA_FOLDER_FAILURE='Hubo un error al crear la carpeta. Por favor, intentar nuevamente.',
  FOLDER_GROUPS_HELPER_TEXT='Los permisos de este contenido serán los mismos que los de la carpeta que lo contiene. Para modificarlos, se debe modificar los permisos de la carpeta.',
  NO_FOLDER_EDIT_PERMISSION_TITLE_MESSAGE='Solo puedes editar la información de las carpetas que hayas creado.',
  DELETE_FOLDER='Eliminar carpeta',
  DELETE_FOLDER_DESCRIPTION='Eliminar la carpeta y todos sus contenidos.',
  DELETE_ONLY_FOLDER_DESCRIPTION='Eliminar la carpeta pero no sus contenidos.',
  DELETE_ONLY_FOLDER_HELPER_TEXT='Si seleccionas esta opción, los contenidos de la carpeta seguirán disponibles en la plataforma.',
  DELETE_FOLDER_PLACEHOLDER='Escribe el nombre de la carpeta para confirmar su eliminación:',
  FOLDER_DELETED='La carpeta se eliminó correctamente.',
  FOLDER_DELETE_FAILED='Hubo un error al eliminar la carpeta. Por favor, intentar nuevamente.',
  NOT_RECOMMENDED_MEDIA_TYPES_WORDING='Para facilitar el uso y la descarga de contenidos los archivos deberán subirse en los siguientes formatos',
  FILES_WITH_INFORMATION_TITLE='Archivos con información (documentos de Word, diapositivas, hojas de cálculo, etc.)',
  FILES_WITH_INFORMATION_FORMAT='.PDF',
  AUDIOS_TITLE='Audios de todo tipo',
  AUDIOS_FORMAT='.MP3; .WAV; ó .OGG',
  VIDEOS_TITLE='Videos de todo tipo',
  VIDEOS_FORMAT='.MP4 ó .MOV',
  NOT_RECOMMENDED_MEDIA_TYPES_FINAL_WORDING='No se deberán subir archivos comprimidos .RAR o .ZIP ya que dificultan la descarga para los estudiantes. En caso de que desee subir varios archivos, se recomienda crear una nueva carpeta.',
  NOT_RECOMMENDED_MEDIA_TYPES_TABLE_TITLE_1 = 'Contenido',
  NOT_RECOMMENDED_MEDIA_TYPES_TABLE_TITLE_2 = 'Formato recomendado',
  EXAMS = 'Exámenes',
  QUESTION='Pregunta',
  OPTION='Opción',
  ADD_OPTION_BUTTON='Agregar opción a la pregunta #',
  ADD_QUESTION_BUTTON='Agregar nueva pregunta',
  ADD_QUESTION_POOL='Agregar pool de preguntas',
  DELETE_QUESTIONS_POOL_TITLE='Eliminar pool de preguntas',
  DELETE_QUESTIONS_POOL_DESCRIPTION='Confirmar la eliminación del pool de preguntas.',
  DELETE_LAST_QUESTIONS_POOL_ERROR='No puedes eliminar el último pool de preguntas.',
  CREATE_EXAM='Crear examen',
}

export enum LanguageEN {
  DISABLED_ACCOUNT_ALERT_TITLE = 'Your account has been disabled.',
  DISABLED_ACCOUNT_ALERT_DESCRIPTION = 'Please, contact us for further information.',
  DEACTIVATED_USER = 'Deactivated user',
  DEACTIVATED_USER_BUTTON = 'Deactivate user',
  ACTIVE_USER_BUTTON = 'Activate user',
  ACTIVE_USER_DESCRIPTION = 'The user will have access to the platform and its contents',
  DEACTIVATED_USER_DESCRIPTION = 'The user will not have access to the platform and its contents.',
  USER_UPDATE_SUCCESS = 'The Student has been successfully edited.',
  USER_UPDATE_ERROR = 'An error has occurred when updating the user. Please try again',
  SUCCESS = '🚀 Great!',
  ERROR = '🤦 Oops!',
  INFO = '',
  CREATE_STUDENT_BUTTON = 'Create student',
  CREATE_TEACHER_BUTTON = 'Create teacher',
  NAME = 'Full name',
  PHONE_NUMBER = 'Phone number',
  CANCEL = 'Cancel',
  PROCESSING = 'Working on it',
  PASSWORD = 'Password',
  EMAIL = 'Email',
  COURSES = 'Courses',
  STUDENT_CREATED_MESSAGE = 'The Student has been successfully created.',
  TEACHER_CREATED_MESSAGE = 'New Teacher has been successfully created',
  COURSE_CREATED_MESSAGE = 'A new course has been added to the platform.',
  COURSE_NAME = 'Course name',
  COURSE_DATES = 'Course days',
  COURSE_SCHEDULE = 'Start time',
  COURSE_END_SCHEDULE = 'End time',
  COURSE_UPDATED_SUCCESS = 'The Course has been successfully updated',
  CREATE_COURSE_BUTTON = 'Create Course',
  CREATE_COURSE_MODAL_TITLE = 'Course creation',
  MEDIA_UPLOAD_MODAL_TITLE = 'Upload media',
  TITLE = 'Title',
  DESCRIPTION = 'Description',
  TYPE = 'Content type',
  MEDIA_GROUPS = 'Courses with access to this content',
  CREATE_MEDIA_BUTTON = 'Upload content',
  UPDATE_MEDIA_BUTTON = 'Update content',
  UPDATE_COURSE_BUTTON = 'Update course',
  MEDIA_CREATED_MESSAGE = '🚀 Great! The Media has been successfully created.',
  MEDIA_CREATED_FAILED_MESSAGE = 'An error has occurred when creation the media. Please try again',
  USER_CREATED_ERROR = 'An error has occurred when creation the user. Please try again',
  MEDIA_UPDATED_MESSAGE = 'Media has been successfully updated.',
  MEDIA_UPDATED_ERROR_MESSAGE = 'An error has occurred when updating the media. Please try again',
  DAYS_OF_THE_WEEK = 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
  GROUP_MULTI_SELECT_TITLE = 'Courses/groups who will have access to this content',
  ATTACH_FILE = 'Attach file',
  REVIEW_PERMISSIONS = 'Review the media permissions before continue',
  ALLOW_ACCESS_MEDIA = 'will have access to this content.',
  MEDIA_DELETED = 'The content has been successfully deleted.',
  DELETE_MEDIA_TITLE = 'Delete content',
  DELETE_MEDIA_CONFIRMATION_MESSAGE = 'Are you sure do you want to delete this media?',
  SEE_CONTENT = 'View content',
  DOWNLOAD = 'Download',
  EDIT = 'Edit',
  DELETE = 'Delete',
  LOAD_MORE = 'Load more',
  CLOSE = 'Close',
  CONTENT = 'Content',
  EDITING = 'Editing',
  VIRTUAL_COURSE = 'Virtual course',
  ADD_COURSE_BUTTON = 'New course',
  COURSE_LINK_HELPER = 'Provide link only if its a virtual course',
  COURSE_LINK = 'Access link',
  COMMENTARIES = 'Commentaries',
  MEDIA_LINK_DESCRIPTION = 'Media link',
  CREATE_STUDENT_MODAL_TITLE = 'New student',
  CREATE_TEACHER_MODAL_TITLE = 'New teacher',
  EDIT_TEACHER_BUTTON = 'Edit teacher',
  EDIT_STUDENT_BUTTON = 'Edit student',
  SIGN_OUT = 'Sign out',
  MENU_HOME = 'Home',
  MENU_CONTENTS = 'Contents',
  MENU_COURSES = 'Courses',
  MENU_TEACHERS = 'Teachers',
  MENU_STUDENTS = 'Students',
  MENU_PAYMENTS = 'Payments',
  NO_CONTENT_TILE = 'No results',
  NO_CONTENT_DESCRIPTION = 'There are no results for this search.',
  UPLOADED_BY = 'Uploaded by',
  PHONE_NUMBER_HELPER_TEXT = 'Country code + Area code + Phone number. Without + and spaces.',
  ON_SITE_CLASS = 'On site course',
  COURSE_YEAR = 'Course year',
  GO_TO_VIRTUAL_CLASS = 'Go to virtual class',
  GO_TO_STUDENTS_LIST = 'See students list',
  LOADING='Loading...',
  VIEW_STUDENTS='Students list',
  VIEW_MEDIAS='Medias list',
  CREATE_FOLDER='Create Folder',
  DRAG_AND_DROP_HELPER_TEXT='Drag and drop files here',
  DRAG_AND_DROP_HELPER_TEXT_2='or click to select files',
  MEDIA_SIGNED_URL_ERROR='An error has occurred when generating the link of the content. Please try again.',
  REVIEW_FILES='Review files',
  DRAWER_NAME_INFORMATION_ALERT='Verify that files are named correctly so that students can easily find them.',
  PASSWORD_RESET_SUCCESS='The password has been reset successfully.',
  PASSWORD_RESET_ERROR='An error has occurred when resetting the password. Please try again.',
  RESET_PASSWORD_BUTTON='Reset password',
  FOLDER='Folder',
  UPLOAD_FOLDER='Upload folder',
  UPDATE_FOLDER='Update folder',
  UPDATE_MEDIA_FOLDER_SUCCESS='The folder has been successfully updated.',
  UPDATE_MEDIA_FOLDER_FAILURE='An error has occurred when updating the folder. Please try again.',
  EDIT_FOLDER='Edit folder',
  CREATE_MEDIA_FOLDER_SUCCESS='The folder has been successfully created.',
  CREATE_MEDIA_FOLDER_FAILURE='An error has occurred when creating the folder. Please try again.',
  FOLDER_GROUPS_HELPER_TEXT='The permissions of this content will be the same as those of the folder that contains it. If you want to modify them, you will have to modify the permissions of the folder.',
  NO_FOLDER_EDIT_PERMISSION_TITLE_MESSAGE='You can only edit folders that you created.',
  DELETE_FOLDER='Delete folder',
  DELETE_FOLDER_DESCRIPTION='Delete folder and all its contents',
  DELETE_ONLY_FOLDER_DESCRIPTION='Delete folder but not its contents.',
  DELETE_ONLY_FOLDER_HELPER_TEXT='If you choose this option, the folder will be deleted but its contents will be still available on the platform.',
  DELETE_FOLDER_PLACEHOLDER='Please type the name of the folder to confirm its deletion.',
  FOLDER_DELETED='The folder has been successfully deleted.',
  FOLDER_DELETE_FAILED='An error has occurred when deleting the folder. Please try again.',
  NOT_RECOMMENDED_MEDIA_TYPES_WORDING='To facilitate the use and download of files, we suggest that you upload the contents in the following formats',
  FILES_WITH_INFORMATION_TITLE='Files with information (Word documents, slides, spreadsheets, etc.)',
  FILES_WITH_INFORMATION_FORMAT='.PDF',
  AUDIOS_TITLE='All types of audio ',
  AUDIOS_FORMAT='.MP3; .WAV or.OGG',
  VIDEOS_TITLE='All types of video',
  VIDEOS_FORMAT='.MP4; .AVI or .MOV',
  NOT_RECOMMENDED_MEDIA_TYPES_FINAL_WORDING='We do not recommend the upload of .RAR or .ZIP compressed files for they complicate the download process for our students. In the case of uploading multiple files, please, create a new folder.',
  NOT_RECOMMENDED_MEDIA_TYPES_TABLE_TITLE_1 = 'Content',
  NOT_RECOMMENDED_MEDIA_TYPES_TABLE_TITLE_2 = 'Recommended media format',
  EXAMS = 'Exams',
  QUESTION='Question',
  OPTION='Option',
  ADD_OPTION_BUTTON='Add option to question #',
  ADD_QUESTION_BUTTON='Add new question',
  ADD_QUESTION_POOL='Add question pool',
  DELETE_QUESTIONS_POOL_TITLE='Delete Question Pool',
  DELETE_QUESTIONS_POOL_DESCRIPTION='Delete question pool and all its contents',
  DELETE_LAST_QUESTIONS_POOL_ERROR='You can not delete the last question pool.',
  CREATE_EXAM='Create exam',
}
