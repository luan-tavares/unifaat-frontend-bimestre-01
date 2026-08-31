import bcrypt from 'bcrypt'

const users = [
    { name: 'Alice Souza', email: 'alice.souza@example.com', password: 'senha123' },
    { name: 'Bruno Lima', email: 'bruno.lima@example.com', password: 'senha123' },
    { name: 'Carla Mendes', email: 'carla.mendes@example.com', password: 'senha123' },
    { name: 'Daniel Alves', email: 'daniel.alves@example.com', password: 'senha123' },
    { name: 'Elisa Rocha', email: 'elisa.rocha@example.com', password: 'senha123' },
    { name: 'Fabio Cardoso', email: 'fabio.cardoso@example.com', password: 'senha123' },
    { name: 'Gabriela Nunes', email: 'gabriela.nunes@example.com', password: 'senha123' },
    { name: 'Henrique Barbosa', email: 'henrique.barbosa@example.com', password: 'senha123' },
    { name: 'Isabela Farias', email: 'isabela.farias@example.com', password: 'senha123' },
    { name: 'Joao Pereira', email: 'joao.pereira@example.com', password: 'senha123' },
    { name: 'Karina Ribeiro', email: 'karina.ribeiro@example.com', password: 'senha123' },
    { name: 'Leonardo Castro', email: 'leonardo.castro@example.com', password: 'senha123' },
    { name: 'Mariana Duarte', email: 'mariana.duarte@example.com', password: 'senha123' },
    { name: 'Nicolas Teixeira', email: 'nicolas.teixeira@example.com', password: 'senha123' },
    { name: 'Olivia Correia', email: 'olivia.correia@example.com', password: 'senha123' },
    { name: 'Pedro Azevedo', email: 'pedro.azevedo@example.com', password: 'senha123' },
    { name: 'Quenia Moraes', email: 'quenia.moraes@example.com', password: 'senha123' },
    { name: 'Rafael Monteiro', email: 'rafael.monteiro@example.com', password: 'senha123' },
    { name: 'Sabrina Freitas', email: 'sabrina.freitas@example.com', password: 'senha123' },
    { name: 'Thiago Pinto', email: 'thiago.pinto@example.com', password: 'senha123' },
    { name: 'Ursula Campos', email: 'ursula.campos@example.com', password: 'senha123' },
    { name: 'Vitor Guimaraes', email: 'vitor.guimaraes@example.com', password: 'senha123' },
    { name: 'Wesley Moreira', email: 'wesley.moreira@example.com', password: 'senha123' },
    { name: 'Ximena Batista', email: 'ximena.batista@example.com', password: 'senha123' },
    { name: 'Yasmin Cavalcante', email: 'yasmin.cavalcante@example.com', password: 'senha123' },
    { name: 'Zeca Andrade', email: 'zeca.andrade@example.com', password: 'senha123' },
    { name: 'Amanda Vasconcelos', email: 'amanda.vasconcelos@example.com', password: 'senha123' },
    { name: 'Bernardo Tavares', email: 'bernardo.tavares@example.com', password: 'senha123' },
    { name: 'Camila Siqueira', email: 'camila.siqueira@example.com', password: 'senha123' },
    { name: 'Diego Fontes', email: 'diego.fontes@example.com', password: 'senha123' },
    { name: 'Eduarda Macedo', email: 'eduarda.macedo@example.com', password: 'senha123' },
    { name: 'Felipe Salgado', email: 'felipe.salgado@example.com', password: 'senha123' },
    { name: 'Giovana Ramalho', email: 'giovana.ramalho@example.com', password: 'senha123' },
    { name: 'Hugo Peixoto', email: 'hugo.peixoto@example.com', password: 'senha123' },
    { name: 'Ines Dantas', email: 'ines.dantas@example.com', password: 'senha123' },
    { name: 'Julio Bezerra', email: 'julio.bezerra@example.com', password: 'senha123' },
    { name: 'Luiza Pimentel', email: 'luiza.pimentel@example.com', password: 'senha123' },
    { name: 'Marcelo Coutinho', email: 'marcelo.coutinho@example.com', password: 'senha123' },
    { name: 'Natalia Vieira', email: 'natalia.vieira@example.com', password: 'senha123' },
    { name: 'Otavio Rezende', email: 'otavio.rezende@example.com', password: 'senha123' }
]

export default async function seed(postgres) {
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10)

        await postgres.query(
            `INSERT INTO users (name, email, password, created_at, updated_at)
             VALUES ($1, $2, $3, NOW(), NOW())
             ON CONFLICT (email) DO NOTHING`,
            [user.name, user.email, hashedPassword]
        )
    }
}
