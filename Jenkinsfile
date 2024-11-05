pipeline {
    agent any

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
                    def sshKey = '/home/rado/paire_cle_aws.pem'
                    def backendCommand = '''
                    docker run -d --name backend \
                      -p 3000:3000 \
                      --env-file /chemin/vers/backend/.env \
                      avengersa/backend:latest
                    '''
                    // Exécution de la commande Docker sur le serveur distant
                    sh "ssh -i ${sshKey} -o StrictHostKeyChecking=no ${remoteHost} '${backendCommand}'"
                }
            }
        }

        stage('Deploy frontend') {
            steps {
                script {
                    def remoteHost = 'ubuntu@35.180.209.72'
                    def sshKey = '/home/rado/paire_cle_aws.pem'
                    def frontendCommand = '''
                    docker run -d --name frontend \
                      -p 3001:3000 \
                      --env-file /chemin/vers/frontend/.env \
                      -e NEXT_PUBLIC_API_URL="http://15.237.137.195:3000" \
                      --link backend \
                      avengersa/frontend:latest
                    '''
                    // Exécution de la commande Docker sur le serveur distant
                    sh "ssh -i ${sshKey} -o StrictHostKeyChecking=no ${remoteHost} '${frontendCommand}'"
                }
            }
        }
    
    }
}
