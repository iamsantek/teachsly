import { IconType } from 'react-icons'
import { AiFillCheckCircle } from 'react-icons/ai'

export interface Instruction {
    title: string;
    description: string;
    icon: IconType
}

export const instructions: Instruction[] = [
  {
    title: 'Tiempo total del examen: 2 horas',
    description: 'Solo tendrás 2 horas. Si te excedes del límite, se enviaran tus respuestas hasta el momento.',
    icon: AiFillCheckCircle
  },
  {
    title: 'No puedes volver a la pregunta anterior.',
    description: 'Asegúrate de haber respondido la pregunta actual.',
    icon: AiFillCheckCircle
  },
  {
    title: 'El reloj de tu prueba está ubicado en la parte superior de la ventana.',
    description: '',
    icon: AiFillCheckCircle
  },
  {
    title: 'Contenidos para cada pregunta',
    description: 'Determinadas preguntas tienen archivos de audio o PDFs, deberás darle click al archivo para que se abra en una nueva pestaña de tu navegador.',
    icon: AiFillCheckCircle
  },
  {
    title: 'Las respuestas se mostrarán de a una por vez.',
    description: 'Se muestra el  botón “Continuar” en la parte inferior de la página del test para ir a la siguiente pregunta. No presiones el botón “Continuar” si todavía no has terminado de responder la pregunta.',
    icon: AiFillCheckCircle
  },
  {
    title: 'Audio',
    description: 'Asegurate de tener un correcto sistema de sonido para poder escuchar los ejercicios de Listening.',
    icon: AiFillCheckCircle
  }
]
