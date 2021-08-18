import { createServer, Model } from 'miragejs'

export function mirageDatabase(){

    createServer({

        models: {
            todos: Model
        },

        seeds(server) {
            server.db.loadData(
            {
                "todos": [
                { "id": "flrGI", "title": "Lavar os pratos", "isDone": false },
                { "id": "Tw-I9", "title": "Cortar a grama", "isDone": true },
                { "id": "7f2sf", "title": "Comprar pão", "isDone": false }
                ]
            }
            )
        },

        routes() {
            this.namespace = "api"

            this.get("/todos", () => {
            return this.schema.all('todos')
            })
        },
    
    })

}