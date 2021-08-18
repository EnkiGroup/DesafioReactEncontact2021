import styled from 'styled-components'

export const Container = styled.div`
    width: 65%;
    margin: 0 auto;
`

export const Content = styled.div`
    ul{
        list-style: none;
        
        li {
            color: var(--gray-900);
            font-size: 1rem;
            display: flex;
            align-items: center;

            input {
                margin-right: 1rem;
                width: 40px;
                height: 1.1rem;
            }
            
            &.line{
                text-decoration: line-through;
                color: var(--gray-300);
            }

            border: 1px solid var(--gray-300);
            padding: 0.5rem;
            border-radius: 0.25rem;
            
            & + li {
                margin-top: 10px;
            }

            .delete {
                margin-left: auto;
                display: none;
                width: 40px;
                height: 18px;

                &:hover{ 
                    color: var(--red-400);
                }
            }

            &:hover .delete {
                display: block;
            }
        }
    }

    .buttons{ 

        text-align: right;   
        margin-top: 2rem;

        button {
            padding: 0 .5rem;
            height: 2rem;
            background-color: var(--yellow-500);
            border-radius: 0.25rem;
            border: 0;
            color: var(--gray-900);
            transition: filter 200ms;

            & + button {
                margin-left: .5rem;
            }

            &:hover{
                filter: brightness(0.9);
            }
        }
    }
        
`
