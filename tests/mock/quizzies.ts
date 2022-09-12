export const quizzies = [
    {
        name: 'Capitais do Norte',
        description: 'Capitais da região Norte do Brasil ',
        category: 'geografia',
        questions: [
            {
                question: 'Qual é o nome da capital de Pará?',
                answer: 'Belém',
                options: ['Belo Horizonte', 'Rio Branco', 'Boa Vista']
            },
            {
                question: 'Qual é o nome da capital de Roraima?',
                answer: 'Boa Vista',
                options: ['Brasília', 'Belém', 'Rio Branco']
            },
            {
                question: 'Qual é o nome da capital do Amapá?',
                answer: 'Macapá',
                options: ['Maceió', 'Boa Vista', 'Manaus']
            },
            {
                question: 'Qual é o nome da capital do Amazonas?',
                answer: 'Manaus',
                options: ['Aracaju', 'Macapá', 'Belém']
            },
            {
                question: 'Qual é o nome da capital de Tocantins?',
                answer: 'Palmas',
                options: ['Porto Alegre', 'Manaus', 'Porto Velho']
            },
            {
                question: 'Qual é o nome da capital de Rondônia?',
                answer: 'Porto Velho',
                options: ['Campo Grande', 'Palmas', 'Rio Branco']
            },
            {
                question: 'Qual é o nome da capital do Acre?',
                answer: 'Rio Branco',
                options: ['Rio de Janeiro', 'Porto Velho', 'Palmas']
            }
        ],
        length: 7
    },
    {
        name: 'Capitais do Nordeste',
        description: 'Capitais da região Nordeste do Brasil ',
        category: 'geografia',
        questions: [
            {
                question: 'Qual é o nome da capital de Maranhão?',
                answer: 'São Luís',
                options: ['Belo Horizonte', 'Maceió', 'Teresina']
            },
            {
                question: 'Qual é o nome da capital do Piauí?',
                answer: 'Teresina',
                options: ['São Luís', 'Belém', 'Rio Branco']
            },
            {
                question: 'Qual é o nome da capital do Ceará?',
                answer: 'Fortaleza',
                options: ['Maceió', 'Boa Vista', 'Manaus']
            },
            {
                question: 'Qual é o nome da capital do Rio Grande do Norte?',
                answer: 'Natal',
                options: ['João Pessoa', 'Natal', 'Belém']
            },
            {
                question: 'Qual é o nome da capital da Paraíba?',
                answer: 'João Pessoa',
                options: ['Recife', 'Aracaju', 'Porto Velho']
            },
            {
                question: 'Qual é o nome da capital de Pernambuco?',
                answer: 'Recife',
                options: ['Campo Grande', 'Maceió', 'Natal']
            },
            {
                question: 'Qual é o nome da capital de Alagoas?',
                answer: 'Maceió',
                options: ['Rio de Janeiro', 'Recife', 'Aracaju']
            },
            {
                question: 'Qual é o nome da capital do Sergipe?',
                answer: 'Aracaju',
                options: ['João Pessoa', 'Natal', 'Palmas']
            },
            {
                question: 'Qual é o nome da capital da Bahia?',
                answer: 'Salvador',
                options: ['Fortaleza', 'Porto Velho', 'Teresina']
            }
        ],
        length: 9
    },
    {
        name: 'Comandos Git',
        description: 'Principais comandos do Git',
        category: 'Versionamento',
        questions: [
            {
                question: 'Para criar um novo projeto',
                answer: 'git init',
                options: ['git config', 'git clone', 'git branch']
            },
            {
                question: 'Para copiar repositório remoto',
                answer: 'git clone',
                options: ['git checkout', 'git copy', 'git remote']
            },
            {
                question: 'Mostra informações atuais do seu repositório',
                answer: 'git status',
                options: ['git info', 'git checkout', 'git stash']
            },
            {
                question: "Adiciona arquivos na área de 'stage'",
                answer: 'git add',
                options: ['git push', 'git commit', 'git branch']
            },
            {
                question: 'Registra alterações no repositório',
                answer: 'git commit',
                options: ['git add', 'git push', 'git pull']
            },
            {
                question:
                    'Vincular o repositório local com um repositório remoto',
                answer: 'git remote',
                options: ['git clone', 'git pull', 'git branch']
            },
            {
                question: 'Obtém atualizações do repositório remoto',
                answer: 'git pull',
                options: ['git push', 'git clone', 'git commit']
            },
            {
                question: 'Envia atualizações para repositório remoto',
                answer: 'git push',
                options: ['git pull', 'git remote', 'git send']
            },
            {
                question: 'Exibe os registros log do commit',
                answer: 'git log',
                options: ['git status', 'git list', 'git config']
            },
            {
                question: 'Obtém ou define as configurações do repositório',
                answer: 'git config',
                options: ['git name', 'git email', 'git set']
            }
        ],
        length: 10
    },
    {
        name: 'quiz example',
        description: 'example',
        category: 'new category',
        length: 2,
        questions: [
            {
                question: 'how to example 1?',
                answer: 'right answer',
                options: [
                    'wrong  answer 1',
                    'wrong  answer 2',
                    'wrong  answer 3'
                ]
            },
            {
                question: 'how to example 2?',
                answer: 'right answer',
                options: [
                    'wrong  answer 1',
                    'wrong  answer 2',
                    'wrong  answer 3'
                ]
            }
        ]
    }
];
