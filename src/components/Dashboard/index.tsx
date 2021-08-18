import { Header } from '../Header'
import { TodosList } from '../TodosList'
import { Container } from './styles'

export function Dashboard(){
    return (
        <Container>
            <Header />
            <TodosList />
        </Container>
    )
}