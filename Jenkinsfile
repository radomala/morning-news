pipeline {
    agent any

    stages {

        stage('Frontend') {
            steps {
                echo 'Début du stage Frontend'
                // Ajoutez ici d'autres étapes pour le frontend si nécessaire
                echo 'Fin du stage Frontend'
            }
        }

        /*

        stage('Clone Repository') {
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
    }
    post {
        success {
            githubNotify context: 'jenkins/build-and-test', status: 'SUCCESS'
        }
        failure {
            githubNotify context: 'jenkins/build-and-test', status: 'FAILURE'
        }
    }
}
