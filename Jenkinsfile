pipeline {
    agent any

    environment {
        // Remplacez 'paire_cle_aws' par l'ID réel de votre clé dans les Credentials Jenkins
        SSH_KEY = credentials('ubuntu')
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
        stage('Deploy Backend') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'ubuntu', keyFileVariable: 'temp_key.pem', usernameVariable: 'SSH_USER')]) {
                        // Créer un fichier temporaire pour la clé SSH
                        sh 'echo "${temp_key.pem}" > temp_key.pem'
                        sh 'chmod 600 temp_key.pem' // Assurez-vous que les permissions sont correctes
                        sh "ssh -i temp_key.pem -o StrictHostKeyChecking=no ${SSH_USER}@35.180.122.171 'your_command_here'"
                    }
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'ubuntu', keyFileVariable: 'temp_key.pem', usernameVariable: 'SSH_USER')]) {
                        sh 'echo "${temp_key.pem}" > temp_key.pem'
                        sh 'chmod 600 temp_key.pem' // Assurez-vous que les permissions sont correctes
                        sh "ssh -i temp_key.pem -o StrictHostKeyChecking=no ${SSH_USER}@35.180.122.171 'your_frontend_command_here'"
                    }
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
