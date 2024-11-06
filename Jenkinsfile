pipeline {
    agent any
    /*
    environment {
        // Remplacez 'paire_cle_aws' par l'ID réel de votre clé dans les Credentials Jenkins
        SSH_KEY = credentials('ubuntu')
    }
    */

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'develop', credentialsId: 'token-git-jenkins', url: 'https://github.com/radomala/morning-news.git'
            }
        }

        /*
        stage('Backend Pipeline') {
            steps {
                dir('backend') {
                    script {
                        build job: 'pipeline-preprod-backend'
                    }
                }
            }
        }
        */
        
        stage('Frontend Pipeline') {
            steps {
                dir('frontend') {
                    script { 
                        build job: 'pipeline-preprod-frontend'
                    }
                }
            }
        }
        
        /*
        stage('Deploy backend') {
        steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'my-ssh-key', keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'SSH_USER')]) {
                        sh "echo 'Using SSH key file: \$SSH_KEY_FILE'"
                        sh "ls -l \$SSH_KEY_FILE"
                        sh "chmod 600 \$SSH_KEY_FILE"
                        sh "ssh -i \$SSH_KEY_FILE -o StrictHostKeyChecking=no \$SSH_USER@13.38.70.242 'sudo docker run -d --name backend -p 3000:3000 avengersa/backend:v0'"
                    }
                }
            }
        }
        
        stage('Deploy Frontend') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'my-ssh-key', keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'SSH_USER')]) {
                        // Exemple de commande SSH pour déployer votre frontend
                        sh "ssh -i \$SSH_KEY_FILE -o StrictHostKeyChecking=no \$SSH_USER@51.44.83.42 'sudo docker run -d --name backend -p 3001:3000 avengersa/frontend:v0'"
                    }
                }
            }
        }
        */
    }
    /*
    post {
        always {
            sh 'rm -f temp_key.pem'
        }
    }
    */
}
