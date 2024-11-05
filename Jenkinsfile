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
                    // Utiliser les identifiants pour SSH
                    withCredentials([sshUserPrivateKey(credentialsId: 'ubentu', keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'USERNAME')]) {
                        // Changer les permissions de la clé
                        sh "chmod 600 ${SSH_KEY_FILE}"
                        
                        // Commande pour déployer le backend
                        sh """
                        ssh -i ${SSH_KEY_FILE} -o StrictHostKeyChecking=no ubuntu@35.180.122.171 '
                        docker run -d --name backend -p 3000:3000 --env-file /chemin/vers/backend/.env avengersa/backend:latest
                        '"""
                    }
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                script {
                    // Utiliser les identifiants pour SSH
                    withCredentials([sshUserPrivateKey(credentialsId: 'ubentu', keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'USERNAME')]) {
                        // Changer les permissions de la clé
                        sh "chmod 600 ${SSH_KEY_FILE}"
                        
                        // Commande pour déployer le frontend
                        sh """
                        ssh -i ${SSH_KEY_FILE} -o StrictHostKeyChecking=no ubuntu@35.180.122.171 '
                        docker run -d --name frontend -p 80:80 avengersa/frontend:latest
                        '"""
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
