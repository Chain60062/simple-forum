import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Quicksand', sans-serif;
    }
    body{
        background-color: #0b1121;
    }
    .showing {
        display: block;
    }
    .hidden {
        display: none;
    }
`
