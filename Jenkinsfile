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
        stage('Deploy backend') {
        steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'my-ssh-key', keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'SSH_USER')]) {
                        // Vérifiez que le fichier de clé existe
                        sh "echo 'Using SSH key file: \$SSH_KEY_FILE'"
                        sh "ls -l \$SSH_KEY_FILE" // Vérifiez les permissions

                        // Donnez les permissions à la clé
                        sh "chmod 600 \$SSH_KEY_FILE"
                        
                        // Exemple de commande SSH pour déployer votre backend
                        sh "ssh -i \$SSH_KEY_FILE -o StrictHostKeyChecking=no \$SSH_USER@35.180.122.171"
                    }
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'my-ssh-key', keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'SSH_USER')]) {
                        // Exemple de commande SSH pour déployer votre frontend
                        sh "ssh -i \$SSH_KEY_FILE -o StrictHostKeyChecking=no \$SSH_USER@35.180.209.72"
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
