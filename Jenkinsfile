pipeline {
    agent any

    environment {
        // Remplacez 'paire_cle_aws' par l'ID réel de votre clé dans les Credentials Jenkins
        SSH_KEY = credentials('paire_cle_aws')
    }

    stages {

  /*      stage('Clone Repository') {
            steps {
                git branch: 'develop', credentialsId: 'token-git-jenkins', url: 'https://github.com/radomala/morning-news.git'
            }
        }

        stage('Backend Pipeline') {
            steps {
                dir('backend') {
                    script {
                        build job: 'pipeline-preprod-backend'
                    }
                }
            }
        }
        
        stage('Frontend Pipeline') {
            steps {
                dir('frontend') {
                    script { 
                        build job: 'pipeline-preprod-frontend'
                    }
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                        sh 'docker compose down' 
                        sh 'docker compose up -d' 
                }
            }
        }

        */

        stage('Deploy backend') {
            steps {
                script {
                    def remoteHost = 'ubuntu@35.180.122.171'

                    // Créer un fichier temporaire pour stocker la clé privée
                    writeFile file: 'temp_key.pem', text: SSH_KEY
                    sh 'chmod 600 temp_key.pem'
                    
                    // Utiliser le fichier temporaire pour se connecter via SSH et déployer le backend
                    sh """
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ${remoteHost} \\
                        'docker run -d --name backend -p 3000:3000 --env-file /chemin/vers/backend/.env avengersa/backend:latest'
                    """
                    
                    // Supprimer la clé temporaire après usage pour la sécurité
                    sh 'rm temp_key.pem'
                }
            }
        }

        stage('Deploy frontend') {
            steps {
                script {
                    def remoteHost = 'ubuntu@35.180.209.72'

                    // Utiliser la même clé pour se connecter au serveur frontend
                    sh """
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ${remoteHost} \\
                        'docker run -d --name frontend -p 3001:3000 --env-file /chemin/vers/frontend/.env -e NEXT_PUBLIC_API_URL=http://15.237.137.195:3000 avengersa/frontend:latest'
                    """
                }
            }
        }
    }

    post {
        always {
            // Assurez-vous que le fichier temporaire est supprimé après l'exécution
            sh 'rm -f temp_key.pem'
        }
    }
}
