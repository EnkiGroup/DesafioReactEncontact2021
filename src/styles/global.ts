import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Uchen&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=STIX+Two+Math&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: ${(props: any) => props.theme.body};
        color: ${(props) => props.theme.text};    
        font-size: 15px;   
        font-family: sans-serif; 
    }

    /* body{
        background: #fbfbfb;
        font-size: 15px;
        color: #333;
        font-family: sans-serif;
    } */

    ul {
        list-style-type: none;
    }
`;
