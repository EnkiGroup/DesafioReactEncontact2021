import styled from "styled-components";

export const Container = styled.header`
    padding: 0 4rem;
    background-color: var(--white);

    input {
        padding: 1.2rem 1rem;
        margin-bottom: 2rem;
        font-size: 1rem;
        height: 2rem;
        width: 20rem;
        border-radius: 0.25rem;
        color: var(--gray-300);
        border: 0;
        box-shadow: 0 0 2px rgba(0,0,0,0.5);
    }
`

export const Content = styled.div`
    display: flex;
    align-items: center;
    margin: 2rem 0;
    justify-content: space-between;

    h2 {
        color: var(--yellow-500)
    }

    button {
        background-color: var(--gray-300);
        border: 0;
        color: var(--white);
        height: 2rem;
        padding: 0 2rem;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        font-weight: 600;
        transition: filter 200ms;

        svg {
            margin-right: 6px;
        }

        &:hover{
            filter: brightness(0.8);
        }
    }
` 