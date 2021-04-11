import 'styled-components';

/* essa tipagem criada como interface fica disponível dentro do styled component funciona 
   como se fosse um overload na orientação a objetos */
declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
  
    colors: {
      primary: string;
      secondary:string;
      tertiary:string;
      
      white: string;
      black: string;
      gray: string;
  
      success: string;
      info: string;
      warning: string;
    },
  };
}