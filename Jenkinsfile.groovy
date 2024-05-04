pipeline {
    agent none

    environment {
        DOCKER_IMAGE_NAME = 'wonyus/linked'
        DOCKER_REGISTRY_CREDENTIALS = 'docker-credential'
    }

    stages {
        stage('Checkout') {
            agent any
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            agent {
                docker {
                    image 'node:18-alpine'
                }
            }
            steps {
                script {
                    app = docker.build("${DOCKER_IMAGE_NAME}")
                }
            }
        }

        stage('Push Docker Image') {
            agent any
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_REGISTRY_CREDENTIALS}") {
                        app.push("${env.BUILD_NUMBER}")
                        app.push('latest')
                    }
                }
            }
        }

        stage('Deploy') {
            agent any
            steps {
                // Add your deployment steps here
                // For example:
                sh 'pwd'
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
