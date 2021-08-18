import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root{
        --yellow-500: #FDC435;
        --gray-100: #F9FAFF;
        --gray-300: #9A9FA8;
        --gray-500: #828282;
        --gray-900: #25282B;
        --white: #FFFFFF;
        --green-400: #48BB78;
        --red-400: #F56565;
    }

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body{
        background-color: var(--gray-100);
    }

    body, input, textarea, button{
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    h1, h1, h3, h4, h5, h6, strong{
        font-weight: 600;
    }

    button{
        cursor: pointer
    }

    [disabled]{
        opacity: 0.6;
        cursor: not-allowed;
    }
`